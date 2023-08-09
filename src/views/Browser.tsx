import Dev from "@/hooks/useDevTools";
import Globals from "@/hooks/useGlobals";
import { Ship } from "@azurapi/azurapi/build/types/ship";
import {
  Box,
  Card,
  Checkbox,
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
          bgColor={"blue.100"}
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
        <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
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
        <Image src={ship.thumbnail} />
        <Text
          noOfLines={1}
          // fontSize={ship.names.en.length > 8 ? "xs" : "md"}
        >
          <Highlight
            query={doH ? searchTerm : ""}
            styles={{ bg: "orange.100" }}
          >
            {ship.names.en}
          </Highlight>
        </Text>
      </Card>
    </Tooltip>
  );
});

function filterShips_global(ships: Ship[], searchTerm) {
  return ships.filter((item: Ship) => {
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

export default Browser;
