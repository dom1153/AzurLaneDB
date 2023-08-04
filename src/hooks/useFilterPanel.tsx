import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useAtomValue } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import { fullShipListAtom } from "@/hooks/useGlobals";
import { isDev, isLocalhost, useNyi } from "./useDevTools";
import filterData from "@/data/FilterData.json";
import { cookieStorageManager } from "@chakra-ui/react";

export interface ShipCardMeta {
  ship: Ship;
  show: boolean;
  moreInfoFilter?: string;
  moreInfoSort?: string;
}

const RarityMap = {
  Normal: 0,
  Common: 0,
  Rare: 1,
  Elite: 2,
  Epic: 2,
  "Super Rare": 3,
  Priority: 3,
  "Ultra Rare": 4,
  Decisive: 4,
};

let debugMap = {};

export const filterAtom = atom({});
export const sortModeAtom = atom("id");
export const sortDirAtom = atom(1); // 1 or -1
const searchTermAtom = atom(""); // hardcoded for now
// id: visible
export const visibleShipCardsAtom = atom([] as ShipCardMeta[]);
export const searchWaitingAtom = atom(false);

let searchDelayTimeout;
// VVV dev mode is SLOW so set bigger timeout
let searchDelay = isDev() ? 500 : 100;

export default function useFilterPanel() {
  const ships = useAtomValue(fullShipListAtom);
  const [filters, setFilters] = useAtom(filterAtom);
  const [sortMode, setSortMode] = useAtom(sortModeAtom);
  const [sortDir, setSorDir] = useAtom(sortDirAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [shipListMeta, setShipListMeta] = useAtom(visibleShipCardsAtom);
  const [searchWaiting, setSearchWaiting] = useAtom(searchWaitingAtom);
  const nyiToast = useNyi();
  useEffect(() => {
    setShipListMeta(getFullVisibleShipCardList());
  }, [ships]);

  useEffect(() => {
    setSearchWaiting(true);
    if (searchDelayTimeout) {
      clearTimeout(searchDelayTimeout);
    }
    searchDelayTimeout = setTimeout(doStuff, searchDelay);

    function doStuff() {
      setSearchWaiting(false);
      searchSortFilterShips(searchTerm, sortMode, filters);
    }
    // console.log(filters);
  }, [filters, sortMode, sortDir]);

  function getFullVisibleShipCardList() {
    return ships.map((s) => ({ ship: s, show: true } as ShipCardMeta));
  }

  function getInVisibleShipCardList() {
    return ships.map((s) => ({ ship: s, show: false } as ShipCardMeta));
  }

  // TODO: cache and read whatever user last input
  function textSearchHandler(inputStr) {
    setSearchWaiting(true);
    if (searchDelayTimeout) {
      clearTimeout(searchDelayTimeout);
    }
    searchDelayTimeout = setTimeout(doStuff, searchDelay);

    function doStuff() {
      setSearchWaiting(false);
      // set minor 100s delay?
      setSearchTerm(inputStr);
      searchSortFilterShips(inputStr, sortMode, filters);
    }
  }

  // type value ; setup timeout

  function searchSortFilterShips(
    inputStr: string,
    sortMode: string,
    filters: {}
  ) {
    // === NYI check
    if (!sortFn[sortMode] || !moreInfoFn[sortMode]) {
      nyiToast(sortMode);
      setSortMode("id");
    }

    Object.entries(filters).forEach((kv) => {
      const [k, v] = kv;
      if (v && (!filterFn[k] || !moreInfoFn[k])) {
        nyiToast(k);
        setFilters({ ...filters, [k]: false });
      }
    });

    // === begin

    let hasFilters = Object.values(filters).includes(true);
    let lst = hasFilters
      ? getInVisibleShipCardList()
      : getFullVisibleShipCardList(); // reset list

    Object.entries(filters).forEach((kv) => {
      const [k, v] = kv;
      if (v) lst = filterByOther(k, lst);
    });

    lst = filterByShipName(inputStr, lst);
    lst = sortShipList(sortMode, lst);

    setShipListMeta(lst);
  }

  // input: search param, list
  // return: new local filtered list
  // is this unnecessarily terse?
  function filterByShipName(name, localList: ShipCardMeta[]): ShipCardMeta[] {
    return name.trim().length === 0
      ? localList
      : // hide card if name mismatches. otherwise return card as-is
        localList.map((m: ShipCardMeta) =>
          !m.show || filterFn.shipName(m, name) ? m : hideCard(m)
        );
  }

  // assume list is empty, show if true
  function filterByOther(filter, localList: ShipCardMeta[]): ShipCardMeta[] {
    localList = localList.map((meta) => ({
      ...meta,
      moreInfoFilter: moreInfoFn[filter](meta.ship),
    }));
    return localList.map((m: ShipCardMeta) =>
      m.show || filterFn[filter](m) ? showCard(m) : m
    );
  }

  function sortShipList(sortMode: string, localList): ShipCardMeta[] {
    localList = localList.map((meta) => ({
      ...meta,
      moreInfoSort: moreInfoFn[sortMode](meta.ship),
    }));
    return localList.toSorted(
      (a, b) => sortFn[sortMode](a.ship, b.ship) * sortDir
    ); //
  }

  const moreInfoFn = {
    id: (a: Ship) => a.id,
    name: (a: Ship) => "", // blank == don't show extra
    rarity: (a: Ship) => a.rarity,
    "total-stats": (a: Ship) => sumStats(a).toString(),
    "construction-time": (a: Ship) => a.construction.constructionTime,
    main: (a: Ship) => a.hullType,
    vanguard: (a: Ship) => a.hullType,
    dd: (a: Ship) => a.hullType,
    cl: (a: Ship) => a.hullType,
    ca: (a: Ship) => a.hullType,
    bb: (a: Ship) => a.hullType,
    cv: (a: Ship) => a.hullType,
    ar: (a: Ship) => a.hullType,
    ss: (a: Ship) => a.hullType,
    "misc-hull": (a: Ship) => a.hullType,
    bilibili: (a: Ship) => a.nationality,
    "royal-navy": (a: Ship) => a.nationality,
    "sakura-empire": (a: Ship) => a.nationality,
    "iron-blood": (a: Ship) => a.nationality,
    ssss: (a: Ship) => a.nationality,
    "eagle-union": (a: Ship) => a.nationality,
    "sardegna-empire": (a: Ship) => a.nationality,
    "vichya-dominion": (a: Ship) => a.nationality,
    "the-idolmaster": (a: Ship) => a.nationality,
    "dragon-empery": (a: Ship) => a.nationality,
    "kizuna-ai": (a: Ship) => a.nationality,
    meta: (a: Ship) => a.nationality,
    "northern-parliament": (a: Ship) => a.nationality,
    neptunia: (a: Ship) => a.nationality,
    "iris-libre": (a: Ship) => a.nationality,
    utawarerumono: (a: Ship) => a.nationality,
    "venus-vacation": (a: Ship) => a.nationality,
    "atelier-ryza": (a: Ship) => a.nationality,
    hololive: (a: Ship) => a.nationality,
    universal: (a: Ship) => a.nationality,
    tempesta: (a: Ship) => a.nationality,
    "misc-faction": (a: Ship) => a.nationality,
    elite: (a: Ship) => a.rarity,
    normal: (a: Ship) => a.rarity,
    rare: (a: Ship) => a.rarity,
    "super-rare": (a: Ship) => a.rarity,
    "ultra-rare": (a: Ship) => a.rarity,
    collab: (a: Ship) => a.nationality,
    priority: (a: Ship) => "",
    permanent: (a: Ship) => "",
    "has-skin": (a: Ship) => "",
    "has-oath-skin": (a: Ship) => "",
    "has-retrofit": (a: Ship) => "",
  };

  const filterFn = {
    shipName: (meta: ShipCardMeta, name) =>
      meta.ship.names.en.toLowerCase().includes(name),
    main: (meta: ShipCardMeta) =>
      filterFn.bb(meta) || filterFn.cv(meta) || filterFn.ar(meta),
    vanguard: (meta: ShipCardMeta) =>
      filterFn.dd(meta) || filterFn.cl(meta) || filterFn.ca(meta),
    dd: (meta: ShipCardMeta) => compareString(meta.ship.hullType, "destroyer"),
    cl: (meta: ShipCardMeta) =>
      compareString(meta.ship.hullType, "light cruiser"),
    ca: (meta: ShipCardMeta) =>
      compareString(meta.ship.hullType, "heavy cruiser") ||
      compareString(meta.ship.hullType, "large cruiser"),
    bb: (meta: ShipCardMeta) =>
      compareString(meta.ship.hullType, "battlecruiser") ||
      compareString(meta.ship.hullType, "battleship"),
    cv: (meta: ShipCardMeta) =>
      compareString(meta.ship.hullType, "aircraft carrier") ||
      compareString(meta.ship.hullType, "Light Carrier"),
    ar: (meta: ShipCardMeta) => compareString(meta.ship.hullType, "repair"),
    ss: (meta: ShipCardMeta) =>
      compareString(meta.ship.hullType, "submarine") ||
      compareString(meta.ship.hullType, "submarine carrier"),
    "misc-hull": (meta: ShipCardMeta) =>
      !(filterFn.main(meta) || filterFn.vanguard(meta) || filterFn.ss(meta)),
    // === faction
    bilibili: (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Bilibili"),
    "royal-navy": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Royal Navy"),
    "sakura-empire": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Sakura Empire"),
    "iron-blood": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Iron Blood"),
    ssss: (meta: ShipCardMeta) => compareString(meta.ship.nationality, "SSSS"),
    "eagle-union": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Eagle Union"),
    "sardegna-empire": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Sardegna Empire"),
    "vichya-dominion": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Vichya Dominion"),
    "the-idolmaster": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "The Idolmaster"),
    "dragon-empery": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Dragon Empery"),
    "kizuna-ai": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Kizuna AI"),
    meta: (meta: ShipCardMeta) => compareString(meta.ship.nationality, "META"),
    "northern-parliament": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Northern Parliament"),
    neptunia: (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Neptunia"),
    "iris-libre": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Iris Libre"),
    utawarerumono: (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Utawarerumono"),
    "venus-vacation": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Venus Vacation"),
    "atelier-ryza": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Atelier Ryza"),
    hololive: (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Hololive"),
    universal: (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Universal"),
    tempesta: (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "Tempesta"),
    "misc-faction": (meta: ShipCardMeta) =>
      compareString(meta.ship.nationality, "universal") ||
      compareString(meta.ship.nationality, "tempesta"),
    elite: (meta: ShipCardMeta) => compareString(meta.ship.rarity, "Elite"),
    normal: (meta: ShipCardMeta) => compareString(meta.ship.rarity, "Normal"),
    rare: (meta: ShipCardMeta) => compareString(meta.ship.rarity, "Rare"),
    "super-rare": (meta: ShipCardMeta) =>
      compareString(meta.ship.rarity, "Super Rare") ||
      compareString(meta.ship.rarity, "Priority"),
    "ultra-rare": (meta: ShipCardMeta) =>
      compareString(meta.ship.rarity, "Ultra Rare") ||
      compareString(meta.ship.rarity, "Decisive"),
    collab: (meta: ShipCardMeta) => isCollab(meta),
    priority: (meta: ShipCardMeta) =>
      compareString(meta.ship.construction.constructionTime, "research"),
    permanent: (meta: ShipCardMeta) =>
      !(
        filterFn.collab(meta) ||
        filterFn.priority(meta) ||
        filterFn.meta(meta)
      ),
    "has-skin": (meta: ShipCardMeta) => meta.ship.skins.length > 1,
    "has-oath-skin": (meta: ShipCardMeta) =>
      meta.ship.skins.some((skin) => compareString(skin.name, "wedding")),
    "has-retrofit": (meta: ShipCardMeta) => meta.ship.retrofit,
  };

  function compareString(a, b) {
    return a.toLowerCase() === b.toLowerCase();
  }

  function isCollab(m: ShipCardMeta) {
    return (
      filterFn.bilibili(m) ||
      filterFn.ssss(m) ||
      filterFn["the-idolmaster"](m) ||
      filterFn["kizuna-ai"](m) ||
      filterFn.neptunia(m) ||
      filterFn.utawarerumono(m) ||
      filterFn["venus-vacation"](m) ||
      filterFn["atelier-ryza"](m) ||
      filterFn.hololive(m)
    );
  }

  // map to "value" of sort "option" from filterData.json
  const sortFn = {
    id: (a: Ship, b: Ship) => a.id.localeCompare(b.id),
    name: (a: Ship, b: Ship) => a.names.en.localeCompare(b.names.en),
    rarity: (a: Ship, b: Ship) => RarityMap[a.rarity] - RarityMap[b.rarity],
    "total-stats": (a: Ship, b: Ship) => sumStats(a) - sumStats(b),
    "construction-time": (a: Ship, b: Ship) =>
      parseConstructionTime(a) - parseConstructionTime(b),
  };

  // this calculation is probably wrong compared to to ingame value
  function sumStats(ship: Ship) {
    return Object.values(ship.stats.level120).reduce(
      (accum: any, current: any) =>
        isNaN(current) ? accum : parseInt(accum) + parseInt(current)
    );
  }

  function parseConstructionTime(ship: Ship) {
    let time = ship.construction.constructionTime;
    let timeNoColon = time;
    timeNoColon.replaceAll(":", "");
    let num = parseInt(timeNoColon);
    if (Number.isNaN(num)) {
      switch (time.toLowerCase()) {
        case "Cannot Be Construced".toLowerCase():
          return 999999;
        case "Cannot be constructed".toLowerCase():
          return 999999 + 1;
        case "Drop Only".toLowerCase():
          return 999999 + 2;
        case "Research".toLowerCase():
          return 999999 + 3;
        case "":
          return 999999 + 4;
        default:
          return 999999 + 5;
      }
    }

    return num;
  }

  function hideCard(meta: ShipCardMeta): ShipCardMeta {
    return { ...meta, ship: meta.ship, show: false };
  }

  function showCard(meta: ShipCardMeta): ShipCardMeta {
    return { ...meta, ship: meta.ship, show: true };
  }

  return { textSearchHandler, shipListMeta, ships };
}
