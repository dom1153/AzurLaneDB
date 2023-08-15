import Dev from "@/hooks/useDevTools";
import Globals from "@/hooks/useGlobals";
import { Ship } from "@azurapi/azurapi/build/types/ship";
import {
  Badge,
  Box,
  Card,
  Center,
  Checkbox,
  Flex,
  Grid,
  HStack,
  Heading,
  Highlight,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  Tag,
  TagLabel,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  FC,
  Suspense,
  memo,
  useDeferredValue,
  useEffect,
  useState,
} from "react";

import filterData from "@/data/FilterData.json";
import AzurApiUtils from "@/utils/azurApiUtils";

const HAtom = atom(true);
const ENABLE_SEARCH_TAGS = true;
const ENABLE_FILTER_TAGS = true;
const searchParam = [
  "rarity",
  "class",
  "nationality",
  "hullType",
  // "skills",
  "names",
];

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

const Browser = memo(function Browser() {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [searchTags, setSearchTags] = useState({});
  const [filterParam, setFilterParam] = useState(initFilterParam());
  // maybe slow...
  const deferredFilterParam = useDeferredValue(filterParam);
  const [defaultFilterParam] = useState(initDefaultFilterParam());
  const ships = useAtomValue(Globals.fullShipListAtom);

  function searchCallBack(searchText) {
    setSearchTerm(searchText); // first priority... (maybe move to end)
  }

  useEffect(() => {
    // Dev.log("Browser: ", filterParam);
  }, []);

  return (
    <>
      <Box h="100%">
        <Grid
          templateColumns={"repeat(2, minmax(10px, 1fr))"}
          gap={"2"}
          p="2"
          w={"container.xl"}
          maxW={"container.xl"}
          minW={"container.xl"}
          bgColor={"gray.400"}
          h="100%"
          maxH="inherit"
        >
          <SearchPanel
            searchTerm={searchTerm}
            slowSearchTerm={deferredSearchTerm}
            setSearchTerm={searchCallBack}
            searchTags={searchTags}
            filterParam={filterParam}
            setFilterParam={setFilterParam}
            defaultFilterParam={defaultFilterParam}
            ships={ships}
          />
          <CardGallery searchTerm={deferredSearchTerm} ships={ships} />
        </Grid>
      </Box>
    </>
  );
});

function SearchPanel({
  searchTerm,
  slowSearchTerm,
  setSearchTerm,
  searchTags,
  filterParam,
  setFilterParam,
  defaultFilterParam,
  ships,
}) {
  const [doH, setH] = useAtom(HAtom);
  const [dummy, setDummy] = useState(false);

  return (
    <>
      <Stack>
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Input placeholder="Dummy search box" bg={"gray.100"} />

        <Card bg={"white"} p="1">
          <Checkbox isChecked={doH} onChange={(e) => setH(e.target.checked)}>
            Highlight search term
          </Checkbox>
        </Card>

        {/* VVV Performance testing */}
        {ENABLE_SEARCH_TAGS && (
          <SearchGeneratedTags
            searchTags={searchTags}
            searchTerm={slowSearchTerm}
            doH={doH}
            ships={ships}
          />
        )}

        {ENABLE_FILTER_TAGS && (
          <FilterTags
            filterParam={filterParam}
            setFilterParam={setFilterParam}
            defaultFilterParam={defaultFilterParam}
          />
        )}

        <Box>
          <Tag
            as="button"
            colorScheme={dummy ? "purple" : "pink"}
            onClick={() => setDummy(!dummy)}
          >
            Test
          </Tag>
        </Box>
      </Stack>
    </>
  );
}

function SearchBox({ searchTerm, setSearchTerm }) {
  return (
    <InputGroup>
      <Input
        placeholder="Type ship name or tag"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        bg={"white"}
      />
      <InputRightElement>
        <Spinner display={false ? "auto" : "none"} />
      </InputRightElement>
    </InputGroup>
  );
}

function SearchGeneratedTags({ searchTags, doH, searchTerm, ships }) {
  let tags = genSearchTags_global(ships, searchTerm);

  return (
    <HStack flexWrap={"wrap"}>
      {Object.entries(tags).map((kv: [string, Set<string>]) =>
        [...kv[1]].map((value) => (
          <SearchGenTag
            title={kv[0]}
            doH={doH}
            searchTerm={searchTerm}
            value={value}
          />
        ))
      )}
    </HStack>
  );
}

interface SearchGenTagProps {
  doH: boolean;
  searchTerm: string;
  value: string;
  title: string;
}

const SearchGenTag: FC<SearchGenTagProps> = memo(function SearchGenTag({
  doH,
  searchTerm,
  value,
  title,
}) {
  return (
    <>
      <Tag>
        <Text whiteSpace={"pre"}>{`${captilize(title)}${
          value.length > 1 ? ": " : ""
        }`}</Text>
        <Highlight query={doH ? searchTerm : ""} styles={{ bg: "orange.100" }}>
          {value}
        </Highlight>
      </Tag>
    </>
  );
});

function FilterTags({ filterParam, setFilterParam, defaultFilterParam }) {
  return (
    <>
      <Stack>
        {Object.values(filterData).map((section) => (
          <HeaderTagCombo
            key={`section_${section.label}`}
            data={section}
            filterParam={filterParam}
            setFilterParam={setFilterParam}
            defaultFilterParam={defaultFilterParam}
          />
        ))}
      </Stack>
    </>
  );
}

function HeaderTagCombo({
  data,
  filterParam,
  setFilterParam,
  defaultFilterParam,
}) {
  return (
    <>
      <Stack>
        <Heading textAlign={"left"} size={"md"}>
          {data.label}
        </Heading>
        <HStack flexWrap={"wrap"}>
          {data.options.map((option) => (
            // <Text key={option.value}>{option.label}</Text>
            <SingleTag
              key={option.value}
              option={option}
              defaultValue={defaultFilterParam[option.value]}
              onChange={(e) =>
                setFilterParam({
                  ...filterParam,
                  [option.value]: e,
                })
              }
            />
          ))}
        </HStack>
      </Stack>
    </>
  );
}

interface SingleTagProps {
  option: { label: string };
  defaultValue: "true" | "" | null | boolean;
  onChange: (e) => void;
}
const SingleTag: FC<SingleTagProps> = memo(function SingleTag({
  option,
  defaultValue,
  onChange,
}) {
  const [check, setCheck] = useState(defaultValue);
  // console.log(option);
  return (
    <>
      <Tag
        as="button"
        colorScheme={check ? "green" : "red"}
        onClick={() => {
          setCheck(!check);
          onChange(!check);
          // onChange(!checked);
        }}
      >
        {option.label}
      </Tag>
    </>
  );
});

// given a word "brest" ; find it, return b<b>rest</b>t
interface CardGalleryProps {
  searchTerm: string;
  ships: Ship[];
}

const CardGallery: FC<CardGalleryProps> = function CardGallery({
  searchTerm,
  ships,
}) {
  // can be extracted, but not in parent function...
  let items = filterShips_global(ships, searchTerm);

  return (
    <>
      <Box overflowY={"auto"} h="100%" sx={Globals.scrollbarCss} px="2">
        <Grid templateColumns={"repeat(5, 1fr)"} gap={6}>
          {/* {filterShips().map((ship: Ship) => (
            <ShipCard ship={ship} searchTerm={searchTerm} />
          ))} */}
          {items.map((ship: Ship) => (
            <ShipCard key={ship.id} ship={ship} searchTerm={searchTerm} />
          ))}
          {/* {ships
              .filter((item: Ship) => {
                return includesString(item.names.en, searchTerm);
              })
              .map((ship: Ship) => (
                <ShipCard ship={ship} />
              ))} */}
        </Grid>
      </Box>
    </>
  );
};

interface ShipCardProps {
  ship: Ship;
  searchTerm: string;
}

const ShipCard: FC<ShipCardProps> = memo(function ShipCard({
  ship,
  searchTerm,
}) {
  const doH = useAtomValue(HAtom);
  const setShip = useSetAtom(Globals.resumeShipAtom);
  const setTab = useSetAtom(Globals.mainTabIndexAtom);

  return (
    // // Note: tooltip has poor performance ; probably due to ref issues
    <Tooltip label={ship.names.en} hasArrow key={ship.id}>
      <Card
        onClick={() => {
          setShip(ship);
          setTab(Dev.MAIN_TAB_NAMES.RESUME);
        }}
      >
        <Box
          position={"relative"}
          bgColor={AzurApiUtils.cardColorByRarity(ship).replace("1", "2")}
          borderWidth={"5px 0px 5px 0px"}
          borderColor={"blue blue red blue"}
          borderTopColor={AzurApiUtils.cardColorByRarity(ship)}
          borderBottomColor={AzurApiUtils.cardColorByRarity(ship)}
          borderLeftColor={"black"}
          borderRightColor={"black"}
          borderRadius={"lg"}
        >
          <Flex
            bgColor={"blackAlpha.700"}
            w={"100%"}
            position={"absolute"}
            top={"0"}
            left={"0"}
            justifyContent={"space-between"}
          >
            <Badge colorScheme="blue">
              {AzurApiUtils.hullTypeToShortName(ship)}
            </Badge>
            <Badge colorScheme="whiteAlpha">
              {AzurApiUtils.factionToShortName(ship)}
            </Badge>
          </Flex>
          <Image src={ship.thumbnail} />
          <Flex
            bgColor={"blackAlpha.700"}
            w={"100%"}
            position={"absolute"}
            bottom={"10px"}
            left={"0"}
            justifyItems={"center"}
            alignItems={"center"}
          >
            <Text
              flex={"1"}
              as="b"
              color={"white"}
              noOfLines={1}
              fontSize={"sm"}
            >
              <Highlight
                query={doH ? searchTerm : ""}
                styles={{ bg: "orange.100" }}
              >
                {ship.names.en}
              </Highlight>
            </Text>
          </Flex>
        </Box>

        {/* <Text
          noOfLines={1}
          // fontSize={ship.names.en.length > 8 ? "xs" : "md"}
        >
          <Highlight
            query={doH ? searchTerm : ""}
            styles={{ bg: "orange.100" }}
          >
            {ship.names.en}
          </Highlight>
        </Text> */}
      </Card>
    </Tooltip>
  );
});

function filterShips_global(ships: Ship[], searchTerm) {
  // determinte what to do based on filters
  // hasHull, hasFaction, hasCollab, hasRarity, hasAvailability, hasSpecial
  return ships.filter((item: Ship) => {
    // highg priority (and filtering)
    // low priority (or filtering)
    // todo add filtering
    return searchParam.some((param) => {
      switch (param) {
        case "names":
          return includesString(item.names.en, searchTerm);
        case "skills":
        // return item.skills.some((skill) =>
        //   includesString(skill.names.en, searchTerm)
        // );
        default:
          return includesString(item[param].toString(), searchTerm);
      }
    });
    return includesString(item.names.en, searchTerm);
  });
}

function genSearchTags_global(ships, searchText) {
  // TODO: if we want to keep this functionality, make a single search cache (nX loops) for performance on ships[]

  // VVV disabled for performance testing
  // for sure gotta defer this at some point
  let tags = {};
  //
  if (!ENABLE_SEARCH_TAGS || searchText.length < 1) {
    searchParam.forEach((tag) => {
      tags[tag] = new Set([" "]);
    });
    // setSearchTags(tags);
    return tags;
  }
  searchParam.forEach((tag) => {
    tags[tag] = new Set();
  });
  ships.forEach((item: Ship) => {
    searchParam.forEach((param) => {
      switch (param) {
        case "names":
          break;
        case "skills":
          // item.skills.forEach((skill) => {
          //   if (includesString(skill.names.en, searchText)) {
          //     tags[param].add(skill.names.en);
          //   }
          // });
          break;
        default:
          if (includesString(item[param].toString(), searchText)) {
            tags[param].add(item[param].toString());
          }
          break;
      }
    });
  });
  // Dev.log("Tag: ", tags);
  return tags;
  // setSearchTags(tags);
}

function captilize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function equalString(a: string, b: string) {
  return a.toLowerCase() === b.toLowerCase();
}

function includesString(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase());
}

function initFilterParam() {
  let options = {};
  Object.values(filterData).forEach((section) =>
    section.options.forEach((option) => {
      options[option.value] = false;
    })
  );
  return options;
}

function initDefaultFilterParam() {
  let options = {};
  Object.values(filterData).forEach((section) =>
    section.options.forEach((option) => {
      options[option.value] = option.checked
        ? equalString(option.checked, "true")
        : false;
    })
  );
  return options;
}

// === BEGIN IMPORT CODE

const filterFn = {
  shipName: (ship: Ship, name) => ship.names.en.toLowerCase().includes(name),
  main: (ship: Ship) =>
    filterFn.bb(ship) || filterFn.cv(ship) || filterFn.ar(ship),
  vanguard: (ship: Ship) =>
    filterFn.dd(ship) || filterFn.cl(ship) || filterFn.ca(ship),
  dd: (ship: Ship) => compareString(ship.hullType, "destroyer"),
  cl: (ship: Ship) => compareString(ship.hullType, "light cruiser"),
  ca: (ship: Ship) =>
    compareString(ship.hullType, "heavy cruiser") ||
    compareString(ship.hullType, "large cruiser"),
  bb: (ship: Ship) =>
    compareString(ship.hullType, "battlecruiser") ||
    compareString(ship.hullType, "battleship"),
  cv: (ship: Ship) =>
    compareString(ship.hullType, "aircraft carrier") ||
    compareString(ship.hullType, "Light Carrier"),
  ar: (ship: Ship) => compareString(ship.hullType, "repair"),
  ss: (ship: Ship) =>
    compareString(ship.hullType, "submarine") ||
    compareString(ship.hullType, "submarine carrier"),
  "misc-hull": (ship: Ship) =>
    !(filterFn.main(ship) || filterFn.vanguard(ship) || filterFn.ss(ship)),
  // === faction
  bilibili: (ship: Ship) => compareString(ship.nationality, "Bilibili"),
  "royal-navy": (ship: Ship) => compareString(ship.nationality, "Royal Navy"),
  "sakura-empire": (ship: Ship) =>
    compareString(ship.nationality, "Sakura Empire"),
  "iron-blood": (ship: Ship) => compareString(ship.nationality, "Iron Blood"),
  ssss: (ship: Ship) => compareString(ship.nationality, "SSSS"),
  "eagle-union": (ship: Ship) => compareString(ship.nationality, "Eagle Union"),
  "sardegna-empire": (ship: Ship) =>
    compareString(ship.nationality, "Sardegna Empire"),
  "vichya-dominion": (ship: Ship) =>
    compareString(ship.nationality, "Vichya Dominion"),
  "the-idolmaster": (ship: Ship) =>
    compareString(ship.nationality, "The Idolmaster"),
  "dragon-empery": (ship: Ship) =>
    compareString(ship.nationality, "Dragon Empery"),
  "kizuna-ai": (ship: Ship) => compareString(ship.nationality, "Kizuna AI"),
  meta: (ship: Ship) => compareString(ship.nationality, "META"),
  "northern-parliament": (ship: Ship) =>
    compareString(ship.nationality, "Northern Parliament"),
  neptunia: (ship: Ship) => compareString(ship.nationality, "Neptunia"),
  "iris-libre": (ship: Ship) => compareString(ship.nationality, "Iris Libre"),
  utawarerumono: (ship: Ship) =>
    compareString(ship.nationality, "Utawarerumono"),
  "venus-vacation": (ship: Ship) =>
    compareString(ship.nationality, "Venus Vacation"),
  "atelier-ryza": (ship: Ship) =>
    compareString(ship.nationality, "Atelier Ryza"),
  hololive: (ship: Ship) => compareString(ship.nationality, "Hololive"),
  universal: (ship: Ship) => compareString(ship.nationality, "Universal"),
  tempesta: (ship: Ship) => compareString(ship.nationality, "Tempesta"),
  "misc-faction": (ship: Ship) =>
    compareString(ship.nationality, "universal") ||
    compareString(ship.nationality, "tempesta"),
  elite: (ship: Ship) => compareString(ship.rarity, "Elite"),
  normal: (ship: Ship) => compareString(ship.rarity, "Normal"),
  rare: (ship: Ship) => compareString(ship.rarity, "Rare"),
  "super-rare": (ship: Ship) =>
    compareString(ship.rarity, "Super Rare") ||
    compareString(ship.rarity, "Priority"),
  "ultra-rare": (ship: Ship) =>
    compareString(ship.rarity, "Ultra Rare") ||
    compareString(ship.rarity, "Decisive"),
  collab: (ship: Ship) => isCollab(ship),
  priority: (ship: Ship) =>
    compareString(ship.construction.constructionTime, "research"),
  permanent: (ship: Ship) =>
    !(filterFn.collab(ship) || filterFn.priority(ship) || filterFn.meta(ship)),
  "has-skin": (ship: Ship) => ship.skins.length > 1,
  "has-oath-skin": (ship: Ship) =>
    ship.skins.some((skin) => compareString(skin.name, "wedding")),
  "has-retrofit": (ship: Ship) => ship.retrofit,
};

function compareString(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

function isCollab(m: Ship) {
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
  return Object.values(ship.stats.level120).reduce((accum: any, current: any) =>
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

// === END IMPORT CODE

export default Browser;
