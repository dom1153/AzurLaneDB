import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useAtomValue } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import { fullShipListAtom } from "@/hooks/useGlobals";
import { isLocalhost } from "./useDevTools";
import filterData from "@/components/shiparchive/filter/FilterData.json";

interface ShipCardMeta {
  ship: Ship;
  show: boolean;
  moreInfo?: string;
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

// export const filterAtom = atom([]);
// export const sortModeAtom = atom(filterData.sortGroup.default);
const searchTermAtom = atom("");
// id: visible
const visibleShipCardsAtom = atom([] as ShipCardMeta[]);

export const useShipArchive = () => {
  const ships = useAtomValue(fullShipListAtom);
  // const [filters, setFilters] = useAtom(filterAtom);
  // const [sortMode, setSortMode] = useAtom(sortModeAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [shipListMeta, setShipListMeta] = useAtom(visibleShipCardsAtom);
  enum FilterMode {
    Text,
    Type,
  }

  // VVV at least useful for module debugging
  useEffect(() => {
    setShipListMeta(getFullVisibleShipCardList());
  }, []);

  useEffect(() => {
    setShipListMeta(getFullVisibleShipCardList());
    // console.log("useEffect ShipArchive: ", ships.length);
  }, [ships]);

  // TODO: extract later

  function getFullVisibleShipCardList() {
    return ships.map((s) => ({ ship: s, show: true } as ShipCardMeta));
  }

  // TODO: cache and read whatever user last input
  function textSearchHandler(inputStr) {
    // set minor 100s delay?
    setSearchTerm(inputStr);
    // searchSortFilterShips(FilterMode.Text, inputStr, sortMode, filters);
  }

  function filterButtonHandler(filterProps) {
    // setFilters(filterProps.filters);
    // setSortMode(filterProps.sortMode);
    searchSortFilterShips(
      FilterMode.Type,
      searchTerm,
      filterProps.sortMode,
      filterProps.filter
    );
  }

  function searchSortFilterShips(
    mode: FilterMode,
    inputStr: string,
    sortMode,
    filters
  ) {
    // TODO: 'FilterMode' may become moot
    let lst = getFullVisibleShipCardList(); // reset list
    console.log("sort by:", sortMode);
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
        localList.map((m) =>
          !m.show || filterFn.shipName(m, name) ? m : hideCard(m)
        );
  }

  type filterMode = "hull";

  function filterOther(filterMode: filterMode, localList) {}

  function sortShipList(sortMode: string, localList): ShipCardMeta[] {
    localList = localList.map((meta) => ({
      ...meta,
      moreInfo: moreInfoFn[sortMode](meta.ship),
    }));
    return localList.toSorted((a, b) => sortFn[sortMode](a.ship, b.ship)); //
  }

  const moreInfoFn = {
    id: (a: Ship) => a.id,
    name: (a: Ship) => "", // blank == don't show extra
    rarity: (a: Ship) => a.rarity,
    "total-stats": (a: Ship) => sumStats(a).toString(),
  };

  const filterFn = {
    shipName: (meta, name) => meta.ship.names.en.toLowerCase().includes(name),
  };

  // map to "value" of sort "option" from filterData.json
  const sortFn = {
    id: (a: Ship, b: Ship) => a.id.localeCompare(b.id),
    name: (a: Ship, b: Ship) => a.names.en.localeCompare(b.names.en),
    rarity: (a: Ship, b: Ship) => RarityMap[a.rarity] - RarityMap[b.rarity],
    "total-stats": (a: Ship, b: Ship) => sumStats(a) - sumStats(b),
  };

  // this calculation is probably wrong compared to to ingame value
  function sumStats(ship: Ship) {
    return Object.values(ship.stats.level120).reduce(
      (accum: any, current: any) =>
        isNaN(current) ? accum : parseInt(accum) + parseInt(current)
    );
  }

  function hideCard(meta: ShipCardMeta): ShipCardMeta {
    return { ship: meta.ship, show: false };
  }

  return { textSearchHandler, shipListMeta, ships, filterButtonHandler };
};
