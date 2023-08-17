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
  TagRightIcon,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { FC, memo, useDeferredValue, useEffect, useState } from "react";

import filterData from "@/data/FilterData.json";
import AzurApiUtils from "@/utils/azurApiUtils";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import Assets from "@assets/asset_index";

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
  const [recentFilter, setRecentFilter] = useState("");
  const deferredRecentFilter = useDeferredValue(recentFilter);
  const [searchHighlight, setSearchHighlight] = useState(false);
  const deferredSearchHighlight = useDeferredValue(searchHighlight);
  const [cardDetails, setCardDetails] = useState(false);
  const deferredCardDetails = useDeferredValue(cardDetails);
  const [DoH, setDoH] = useState(true);
  const deferredDoH = useDeferredValue(DoH);

  // const [defaultFilterParam] = useState(initDefaultFilterParam());
  const ships = useAtomValue(Globals.fullShipListAtom);
  // const { colorMode } = useColorMode();

  function searchCallBack(searchText) {
    setSearchTerm(searchText); // first priority... (maybe move to end)
  }

  useEffect(() => {
    // Dev.log("Browser: ", filterParam);
  }, []);

  return (
    <>
      <Box
        h="100%"
        bgImage={Assets.technology_bg}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize={"cover"}
        bgColor={"gray.700"}
        p="2"
      >
        <Grid
          templateColumns={"repeat(2, minmax(10px, 1fr))"}
          gap={"2"}
          p="2"
          w={"container.xl"}
          maxW={"container.xl"}
          minW={"container.xl"}
          bgColor={Dev.isDev() ? "gray.400" : ""}
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
            setRecentFilter={setRecentFilter}
            ships={ships}
            setEnableSearchTags={setSearchHighlight}
            enableSearchTags={deferredSearchHighlight}
            cardDetails={deferredCardDetails}
            setCardDetails={setCardDetails}
            DoH={deferredDoH}
            setDoH={setDoH}
          />
          <CardGallery
            searchTerm={deferredSearchTerm}
            ships={ships}
            filterParam={deferredFilterParam}
            recentFilter={deferredRecentFilter}
            allowSearchTag={deferredSearchHighlight}
            allowShipDetail={deferredCardDetails}
            doH={deferredDoH}
          />
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
  setRecentFilter,
  ships,
  setEnableSearchTags,
  enableSearchTags,
  cardDetails,
  setCardDetails,
  setDoH,
  DoH,
}) {
  const [dummy, setDummy] = useState(false);

  return (
    <>
      <Card p="2" bg={useColorModeValue("gray.300", "gray.900")}>
        <Stack>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Input
            placeholder="Dummy search box"
            bg={useColorModeValue("gray.100", "gray.900")}
          />
          <Card bg={useColorModeValue("white", "")} p="1">
            <Checkbox
              isChecked={DoH}
              onChange={(e) => setDoH(e.target.checked)}
            >
              Highlight search term
            </Checkbox>
            <Checkbox
              isChecked={enableSearchTags}
              onChange={(e) => setEnableSearchTags(e.target.checked)}
            >
              Allow search by tag
            </Checkbox>
            <Checkbox
              isChecked={cardDetails}
              onChange={(e) => setCardDetails(e.target.checked)}
            >
              Show details on ship card
            </Checkbox>
            {Dev.isDev() && <Checkbox>Dummy Checkbox</Checkbox>}
          </Card>
          {/* VVV Performance testing */}
          {ENABLE_SEARCH_TAGS && enableSearchTags && (
            <SearchGeneratedTags
              searchTags={searchTags}
              searchTerm={slowSearchTerm}
              doH={DoH}
              ships={ships}
            />
          )}
          {ENABLE_FILTER_TAGS && (
            <FilterTags
              filterParam={filterParam}
              setFilterParam={setFilterParam}
              setRecentFilter={setRecentFilter}
              // defaultFilterParam={defaultFilterParam}
            />
          )}
          {Dev.isDev() && (
            <Box>
              <Tag
                as="button"
                colorScheme={dummy ? "purple" : "pink"}
                onClick={() => setDummy(!dummy)}
              >
                Test
              </Tag>
            </Box>
          )}
        </Stack>
      </Card>
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
        bg={useColorModeValue("white", "")}
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

function FilterTags({ filterParam, setFilterParam, setRecentFilter }) {
  return (
    <>
      <Stack>
        {Object.entries(filterData).map((kv) => {
          let [k, v] = kv;
          return (
            <HeaderTagCombo
              key={`section_${v.label}`}
              data={kv}
              filterParam={filterParam}
              setFilterParam={setFilterParam}
              setRecentFilter={setRecentFilter}
            />
          );
        })}
      </Stack>
    </>
  );
}

function HeaderTagCombo({
  data,
  filterParam,
  setFilterParam,
  setRecentFilter,
}) {
  let [skey, svalue] = data;

  return (
    <>
      <Stack>
        <Heading textAlign={"left"} size={"md"}>
          {svalue.label}
        </Heading>
        <HStack flexWrap={"wrap"}>
          {svalue.options.map((option) =>
            skey === "sort" ? (
              <SortTag
                key={option.value}
                option={option}
                value={filterParam[skey]}
                sortDir={filterParam["sortDir"]}
                onChange={(e, dir) => {
                  setFilterParam({
                    ...filterParam,
                    [skey]: e,
                    ["sortDir"]: dir,
                  });
                  setRecentFilter(option.value);
                }}
              />
            ) : (
              // <Text key={option.value}>{option.label}</Text>
              <SingleTag
                key={option.value}
                option={option}
                defaultValue={filterParam[skey][option.value]}
                onChange={(e) => {
                  setFilterParam({
                    ...filterParam,
                    [skey]: { ...filterParam[skey], [option.value]: e },
                  });
                  setRecentFilter(option.value);
                }}
              />
            )
          )}
        </HStack>
      </Stack>
    </>
  );
}

interface SingleTagProps {
  option: { label: string; value: string; type: string };
  defaultValue: "true" | "" | null | boolean;
  onChange: (e) => void;
}

interface SortTagProps {
  option: { label: string; value: string; type: string };
  value: string;
  onChange: (e, dir) => void;
  sortDir: number;
}

const SortTag: FC<SortTagProps> = memo(
  ({ option, value, onChange, sortDir }) => {
    let nyiToast = Dev.useNyi();
    const check = value === option.value;
    return (
      <>
        <Tag
          as="button"
          colorScheme={value === option.value ? "blue" : "gray"}
          onClick={() => {
            if (!sortFn[option.value]) {
              nyiToast(option.label);
              return;
            }
            onChange(option.value, check ? sortDir * -1 : 1);
          }}
        >
          {option.label}
          {check && (
            <TagRightIcon
              as={sortDir < 0 ? TriangleUpIcon : TriangleDownIcon}
            />
          )}
        </Tag>
      </>
    );
  }
);

const SingleTag: FC<SingleTagProps> = memo(function SingleTag({
  option,
  defaultValue,
  onChange,
}) {
  let nyiToast = Dev.useNyi();
  const [check, setCheck] = useState(defaultValue);
  return (
    <>
      <Tag
        as="button"
        colorScheme={check ? "blue" : "gray"}
        onClick={() => {
          if (!filterFn[option.value]) {
            nyiToast(option.label);
            return;
          }
          setCheck(!check);
          onChange(!check);
        }}
      >
        {option.label}
      </Tag>
    </>
  );
});

interface CardGalleryProps {
  searchTerm: string;
  ships: Ship[];
  filterParam: {};
  recentFilter: string;
  allowSearchTag: boolean;
  allowShipDetail: boolean;
  doH: boolean;
}

const CardGallery: FC<CardGalleryProps> = function CardGallery({
  searchTerm,
  ships,
  filterParam,
  recentFilter,
  allowSearchTag,
  allowShipDetail,
  doH,
}) {
  // can be extracted, but not in parent function...

  let items = filterShips_global(
    ships,
    searchTerm,
    allowSearchTag,
    filterParam
  );

  return (
    <>
      <Box overflowY={"auto"} h="100%" sx={Globals.scrollbarCss} px="2">
        <Grid templateColumns={"repeat(5, 1fr)"} gap={6}>
          {items.map((ship: Ship) => (
            <ShipCard
              key={ship.id}
              ship={ship}
              searchTerm={searchTerm}
              extraText={
                allowShipDetail && moreInfoFn[recentFilter]
                  ? moreInfoFn[recentFilter](ship)
                  : ""
              }
              doH={doH}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};

interface ShipCardProps {
  ship: Ship;
  searchTerm?: string;
  extraText?: string;
  doH?: boolean;
}

const EmptyShipCard = memo(() => {
  return (
    <Card
      position={"relative"}
      bgColor={Dev.isDev() ? "gray.100" : ""}
      borderWidth={"5px 0px 5px 0px"}
      borderColor={"gray.100"}
      borderRadius={"lg"}
    >
      <Image src="https://placehold.co/102x135" />
    </Card>
  );
});

const ShipCard: FC<ShipCardProps> = memo(
  ({ ship, searchTerm, extraText = "", doH = false }) => {
    const setShip = useSetAtom(Globals.resumeShipAtom);
    const setTab = useSetAtom(Globals.mainTabIndexAtom);

    return (
      // // Note: tooltip has poor performance ; probably due to ref issues
      // <Tooltip label={ship.names.en} hasArrow key={ship.id}>
      <Card
        onClick={() => {
          setShip(ship);
          setTab(Dev.MAIN_TAB_NAMES.RESUME);
        }}
        position={"relative"}
        // bgColor={AzurApiUtils.cardColorByRarity(ship).replace("1", "2")}
        bgColor={"gray.500"}
        borderWidth={"5px 1px 5px 1px"}
        bgImage={AzurApiUtils.cardBgByRarity(ship)}
        bgSize={"cover"}
        borderTopColor={AzurApiUtils.cardColorByRarity(ship)}
        borderBottomColor={AzurApiUtils.cardColorByRarity(ship)}
        borderLeftColor={"gray.500"}
        borderRightColor={"gray.500"}
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
        <Image
          src={ship.thumbnail}
          opacity={100}
          loading="lazy"
          fallbackSrc="fallbackSrc='https://via.placeholder.com/102x133'"
        />
        {
          <Flex
            bgColor={"blackAlpha.700"}
            w={"100%"}
            position={"absolute"}
            bottom={"40%"}
            left={"0"}
            justifyItems={"center"}
            alignItems={"center"}
            h="1.75rem"
            display={extraText !== "" ? "flex" : "none"}
          >
            <Text
              flex={"1"}
              as="b"
              color={"white"}
              noOfLines={isLongName(ship) ? 2 : 1}
              fontSize={isLongName(ship) ? "0.75rem" : ".875rem"}
              lineHeight={"none"}
              overflowWrap={"break-word"}
            >
              {extraText}
            </Text>
          </Flex>
        }
        <Flex
          bgColor={"blackAlpha.700"}
          w={"100%"}
          position={"absolute"}
          bottom={"10px"}
          left={"0"}
          justifyItems={"center"}
          alignItems={"center"}
          h="1.75rem"
        >
          <Text
            flex={"1"}
            as="b"
            color={"white"}
            noOfLines={isLongName(ship) ? 2 : 1}
            fontSize={isLongName(ship) ? "0.75rem" : ".875rem"}
            lineHeight={"none"}
            overflowWrap={"break-word"}
          >
            <Highlight
              query={doH ? searchTerm : ""}
              styles={{ bg: "orange.100" }}
            >
              {ship.names.en}
            </Highlight>
          </Text>
        </Flex>

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
      // </Tooltip>
    );
  }
);

function isLongName(ship: Ship) {
  return ship.names.en.length > 10;
}

function filterShips_global(
  ships: Ship[],
  searchTerm: string,
  allowTags: boolean,
  filterParam: {}
) {
  // build filter list

  let filters = {};
  Object.entries(filterParam).forEach((skv) => {
    let [sk, sv] = skv;
    if (typeof sv === "boolean") {
    } else if (typeof sv === "string") {
    } else {
      filters[sk] = [];
      let allfalse = true,
        alltrue = true;
      // keep it simple for now...
      if (sk === "sort") return; // not a filter
      if (sk === "collab") sk = "faction"; // collab is alias of faction
      Object.entries(sv).forEach((kv) => {
        let [k, v] = kv;
        if (v) {
          if (!filterFn[k]) return;
          filters[sk].push(filterFn[k]);
        }
      });
    }
  });

  let filteredShips = ships.filter((item: Ship) => {
    let show = true;
    Object.keys(filters).forEach((category) => {
      if (!show) return;
      let hasMatch = true;
      if (filters[category].length > 0) {
        hasMatch = filters[category].some((fn) => {
          return fn(item);
        });
      }
      if (!hasMatch) show = false;
    });
    if (!show) return false;

    if (allowTags) {
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
    }

    return includesString(item.names.en, searchTerm);
  });
  filteredShips.sort(
    (a, b) => sortFn[filterParam["sort"]](a, b) * filterParam["sortDir"]
  );
  return filteredShips;
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
  return tags;
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
  let groupedOptions = {};
  Object.entries(filterData).forEach((skv) => {
    let [sk, sv]: [string, any] = skv;

    let options: string | {} = {};
    if (sk === "sort") {
      let defaultSort = "";
      for (let i = 0; i < sv.options.length; i++) {
        if (
          sv.options[i].hasOwnProperty("checked") &&
          sv.options[i].checked === "true"
        ) {
          defaultSort = sv.options[i].value;
          break;
        }
      }
      options = defaultSort;
    } else {
      sv.options.forEach((option) => {
        options[option.value] = option.checked === "true";
      });
    }

    groupedOptions[sk] = options;
    groupedOptions["sortDir"] = 1;
  });
  return groupedOptions;
}

const filterFn = {
  shipName: (ship: Ship, name) =>
    ship.names.en.toLowerCase().normalize("NFC").includes(name),
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

const sortFn = {
  id: (a: Ship, b: Ship) => a.id.localeCompare(b.id),
  name: (a: Ship, b: Ship) => a.names.en.localeCompare(b.names.en),
  rarity: (a: Ship, b: Ship) => RarityMap[a.rarity] - RarityMap[b.rarity],
  "total-stats": (a: Ship, b: Ship) => sumStats(a) - sumStats(b),
  "construction-time": (a: Ship, b: Ship) =>
    parseConstructionTime(a) - parseConstructionTime(b),
};

const moreInfoFn = {
  id: (a: Ship) => a.id,
  name: (a: Ship) => "", // blank == don't show extra
  // rarity: (a: Ship) => a.rarity,
  "total-stats": (a: Ship) => sumStats(a).toString(),
  "construction-time": (a: Ship) => a.construction.constructionTime,
  "has-skin": (a: Ship) => a.skins.length,
  // main: (a: Ship) => a.hullType,
  // vanguard: (a: Ship) => a.hullType,
  // dd: (a: Ship) => a.hullType,
  // cl: (a: Ship) => a.hullType,
  // ca: (a: Ship) => a.hullType,
  // bb: (a: Ship) => a.hullType,
  // cv: (a: Ship) => a.hullType,
  // ar: (a: Ship) => a.hullType,
  // ss: (a: Ship) => a.hullType,
  // "misc-hull": (a: Ship) => a.hullType,
  // bilibili: (a: Ship) => a.nationality,
  // "royal-navy": (a: Ship) => a.nationality,
  // "sakura-empire": (a: Ship) => a.nationality,
  // "iron-blood": (a: Ship) => a.nationality,
  // ssss: (a: Ship) => a.nationality,
  // "eagle-union": (a: Ship) => a.nationality,
  // "sardegna-empire": (a: Ship) => a.nationality,
  // "vichya-dominion": (a: Ship) => a.nationality,
  // "the-idolmaster": (a: Ship) => a.nationality,
  // "dragon-empery": (a: Ship) => a.nationality,
  // "kizuna-ai": (a: Ship) => a.nationality,
  // meta: (a: Ship) => a.nationality,
  // "northern-parliament": (a: Ship) => a.nationality,
  // neptunia: (a: Ship) => a.nationality,
  // "iris-libre": (a: Ship) => a.nationality,
  // utawarerumono: (a: Ship) => a.nationality,
  // "venus-vacation": (a: Ship) => a.nationality,
  // "atelier-ryza": (a: Ship) => a.nationality,
  // hololive: (a: Ship) => a.nationality,
  // universal: (a: Ship) => a.nationality,
  // tempesta: (a: Ship) => a.nationality,
  // "misc-faction": (a: Ship) => a.nationality,
  // elite: (a: Ship) => a.rarity,
  // normal: (a: Ship) => a.rarity,
  // rare: (a: Ship) => a.rarity,
  // "super-rare": (a: Ship) => a.rarity,
  // "ultra-rare": (a: Ship) => a.rarity,
  // collab: (a: Ship) => a.nationality,
  // priority: (a: Ship) => "",
  // permanent: (a: Ship) => "",
  // "has-skin": (a: Ship) => "",
  // "has-oath-skin": (a: Ship) => "",
  // "has-retrofit": (a: Ship) => "",
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

export default Browser;
