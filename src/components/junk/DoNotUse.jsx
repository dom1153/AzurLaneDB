// garbage old code, do not use

import {
  Wrap,
  Textarea,
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Grid,
  GridItem,
  Stack,
  HStack,
  VStack,
  Link,
  Heading,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
} from "@chakra-ui/react";

<CenterDiv></CenterDiv>;

//// ===========
//// Details.jsx
//// ===========
let ship = null;
ship = ships.filter((ship) => ship.names.en == NAME)[IDX];

const NAME = "Essex";
const IDX = 0; // for when you hit multiple results e.g. enterprise

console.log(ship.gallery[0]);

function Child({ ship }) {
  return (
    <>
      <Image
        boxSize={"100px"}
        src={ship.thumbnail}
        objectFit={"cover"}
        objectPosition={"top"}
        alt=""
      />
      <Image maxW="100px" src={ship.thumbnail} alt="" />
      <Link color="blue" href="{ship.wikiUrl}">
        &lt;Wiki Link&gt;
      </Link>
      <Text>{ship.names.en}</Text>
      <Text>Class: {ship.class}</Text>
      <Text>Nationality: {ship.nationality}</Text>
      <Text>Hull Type: {ship.hullType}</Text>
      <Text>Rarity: {ship.rarity}</Text>
      <Text>Stars: {ship.stars}</Text>
      <Text>Stats Level 120:</Text>
      <Card bgColor={"gray.100"}>
        <Text>HP {ship.stats.level120.health}</Text>
        <Text>FP: {ship.stats.level120.firepower}</Text>
        <Text>TP: {ship.stats.level120.torpedo}</Text>
        <Text>AV: {ship.stats.level120.aviation}</Text>
        <Text>AA: {ship.stats.level120.antiair}</Text>
        <Text>RL: {ship.stats.level120.reload}</Text>
        <Text>EV: {ship.stats.level120.evasion}</Text>
        <Text>Armor: {ship.stats.level120.armor}</Text>
        <Text>Spd: {ship.stats.level120.speed}</Text>
        <Text>Acc: {ship.stats.level120.accuracy}</Text>
        <Text>AntiSub: {ship.stats.level120.antisubmarineWarfare}</Text>
        <Text>OilCost: {ship.stats.level120.oilConsumption}</Text>
      </Card>
      <Text>Skills:</Text>
      {ship.skills.map((skill, i) => Skill(ship, skill, i))}
      <Text>Construction time: {ship.construction.constructionTime}</Text>
      <Text>Obtained from: (Shows maps etc)</Text>
      <Text>
        Artist:{" "}
        {ship.misc.artist
          ? `${ship.misc.artist.name} (links available too)`
          : Unlisted}{" "}
      </Text>
      <Text>
        CV:{" "}
        {ship.misc.voice
          ? `${ship.misc.voice.name} (links available too)`
          : Unlisted}
      </Text>
      <Image src={ship.skins[0].image}></Image>
      <Stack>{ship.gallery.map((g, i) => Gallery(ship, g, i))}</Stack>
      <Stack>{ship.skins.map((g, i) => Skin(ship, g, i))}</Stack>
    </>
  );
}

function DummyJSX() {
  return (
    <>
      {ship && <Child ship={ship} />}

      <Text>{img.name}</Text>
      <Image
        boxSize={"200px"}
        src={img.image}
        objectFit={"cover"}
        objectPosition={"top"}
        alt=""
      />
      <Text>cost: {img.info.cost} gems</Text>
      <Text>obt: {img.info.obtainedFrom}</Text>
      <Image src={img.chibi} objectFit={"cover"}></Image>

      <InfoCard header="Spd" body={stats.speed} />
      <InfoCard header="Acc" body={stats.accuracy} />

      <Textarea value={str} readOnly={true}></Textarea>
    </>
  );
}

// repeat( auto-fit, minmax(250px, 1fr) );
// templateColumns="repeat(6, 1fr)"

// https://github.com/vitejs/vite/discussions/12191
const attrIcons = Object(
  import.meta.glob("@assets/attricon/*.{png,jpg,jpeg,PNG,JPEG}", {
    eager: true,
    as: "url",
  })
);

export {
  IconAA,
  attr_aa,
  attr_armor,
  attr_asw,
  attr_av,
  attr_cost,
  attr_eva,
  attr_fp,
  attr_luck,
  attr_rld,
  attr_trp,
};

if (false) {
} else if (Icon) {
  return (
    <>
      <Flex fontSize={"sm"}>
        <Box bg={"black"} p={"2"}>
          <Icon boxSize={"20px"} />
        </Box>
        <Text bg={"gray"} textColor={"white"} p={"2"}>
          {body}
        </Text>
      </Flex>
    </>
  );
}

const IconAA = (props) => <Image {...props} src={attr_aa} />;

// VVV useless
// tedious but worth it imo
// export default {
//   attr_aa: attr_aa,
//   attr_armor: attr_armor,
//   attr_asw: attr_asw,
//   attr_av: attr_av,
//   attr_cost: attr_cost,
//   attr_eva: attr_eva,
//   attr_fp: attr_fp,
//   attr_hp: attr_hp,
//   attr_luck: attr_luck,
//   attr_rid: attr_rld,
//   attr_trp: attr_trp,
// };

<Box
  bgImage={`url('${skinP}')`}
  bgPosition="left"
  bgRepeat="no-repeat"
  bgClip={"unset"}
  height={"container.lg"}
  backgroundAttachment={"fixed"}
  overflow={"unset"}
/>;

function checkHasDuplicatesn() {
  let seen = [];
  ships.map((s) => {
    let id = s.id;
    console.log(`seen ${id}`);
    if (id in seen) {
      console.log(`dupe ship id ${id} => ${s.names.en} ; ${seen[id]}!!!`);
    }
    seen[id] = s;
  });
  console.log("checked for duplicates");
}

// 614 ships total

if (inputStr.trim().length === 0) {
  setVisibleShipGirls(
    ships.map((s) => s.names.en.toLowerCase().includes(inputStr))
  );
} else {
  setAllShipCardsVisible();
}

{
  ships &&
    ships.map((ship, i) => (
      <ShipCard
        key={ship.id}
        ship={ship}
        displayMode={visibleShipList[ship.id] ? CARD_DISPLAY : "none"}
      />
    ));
}

// function getShipByMeta(meta: shipCardMeta) {
//   return ships[meta.hash];
// }

function SortButtons() {
  return (
    <>
      <HStack>
        <Text w="75px">Sort</Text>
        <Box>
          <Button>Name</Button>
          <Button>Id</Button>
          <Button>Rarity</Button>
          <Button>Total Stats</Button>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Stats
            </MenuButton>
            <MenuList minWidth="100px">
              <MenuOptionGroup type="radio">
                <MenuItemOption value="HP">HP</MenuItemOption>
                <MenuItemOption>AVI</MenuItemOption>
                <MenuItemOption>EVA</MenuItemOption>
                <MenuItemOption>AA</MenuItemOption>
                <MenuItemOption>TRP</MenuItemOption>
                <MenuItemOption>RLD</MenuItemOption>
                <MenuItemOption>ASW</MenuItemOption>
                <MenuItemOption>SPD</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </>
  );
}
function HullButtons() {
  return (
    <>
      <HStack>
        <Text w="75px">Index</Text>
        <Box>
          <Button>All (Reset)</Button>
        </Box>
      </HStack>
      <HStack>
        <Text w="75px">Index (Main)</Text>
        <Box>
          <Button>All</Button>
          <Button>CV</Button>
          <Button>AR</Button>
          <Button>BB</Button>
          <Button>None</Button>
        </Box>
      </HStack>
      <HStack>
        <Text w="75px" fontSize={"sm"}>
          Index (Vanguard)
        </Text>
        <Box>
          <Button>All</Button>
          <Button>DD</Button>
          <Button>CL</Button>
          <Button>CA</Button>
          <Button>None</Button>
        </Box>
      </HStack>
      <HStack>
        <Text w="75px">Index (SS)</Text>
        <Box>
          <Button>All</Button>
          <Button>None</Button>
        </Box>
      </HStack>
    </>
  );
}

function FactionButtons() {
  return (
    <>
      <HStack>
        <Text w="75px">Faction</Text>
        <Box>
          <Button>Eaglue Union</Button>
          <Button>Royal Navy</Button>
          <Button>Sakura Empire</Button>
          <Button>Iron Blood</Button>
          <Button>Dragon Empry</Button>
          <Button>Sardegna Empire</Button>
          <Button>Northern Parliament</Button>
          <Button>Iris Libre</Button>
          <Button>Vichya Dominion</Button>
          <Button>Bulin</Button>
          <Button>Tempesta</Button>
        </Box>
      </HStack>
      <HStack>
        <Text w="75px">Acquire Source</Text>
        <Box>
          <Button>Common</Button>
          <Button>Collab</Button>
          <Button>Priority Ships</Button>
          <Button>Meta</Button>
        </Box>
      </HStack>
    </>
  );
}
function RarityButtons() {
  return (
    <>
      <HStack>
        <Text w="75px">Rarity</Text>
        <Box>
          <Button>All</Button>
          <Button>Common</Button>
          <Button>Rare</Button>
          <Button>Elite</Button>
          <Button>Super Rare</Button>
          <Button>Ultra</Button>
        </Box>
      </HStack>
    </>
  );
}
function OtherButtons() {
  return (
    <>
      <HStack>
        <Text w="75px">Other</Text>
        <Box>
          <Button>Has Skin</Button>
          <Button>Only Has Default Skin</Button>
          <Button>Special</Button>
          <Button>Has Retrofit</Button>
          <Button>Unique Module</Button>
          <Button>Wearing Skin</Button>
          <Button>Oath Skin</Button>
        </Box>
      </HStack>
      <HStack>
        <Text w="75px">Options</Text>
        <Box>
          <Button>Show retrofit if available</Button>
          <Button>Show last selected skin</Button>
          <Button>Show random skin during 'wearing skin' if applicable</Button>
        </Box>
      </HStack>
    </>
  );
}

function checkHasDuplicates() {
  let seen = [];
  ships.map((s) => {
    let id = s.id;
    console.log(`seen ${id}`);
    if (id in seen) {
      console.log(`dupe ship id ${id} => ${s.names.en} ; ${seen[id]}!!!`);
    }
    seen[id] = s;
  });
  console.log("checked for duplicates");
}

// { ...visbileShipIdMap, [s.id]: true }

// VVV these aren't exported, so they aren't taking extra memory when this file is imported
function fetchShipJson() {
  fetch(
    "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
  )
    .then((result) => {
      console.log("A: ", result);
      return result.json();
    })
    .then(
      (result) => {
        console.log("B: ", result);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
}

// {/* <Text fontSize={"3xs"}>Universal Bulin</Text> */}
// {/* <Link fontSize={"3xs"} href={ship.wikiUrl}> */}
// {false && (
//   <marquee behavior="" direction="" scrolldelay="">
//     {ship.names.en}
//   </marquee>
// )}

// can refactor the name later
// interface resumeShipType {
//   ship: Ship;
//   skinId: number;
// }
// init values
// const resumeShip: resumeShipType = {
//   ship: null,
//   skinId: 0,
// };

// export function useShipUtils() {
//   // const setResumeShipAtom = useSetAtom(resumeShipAtom);
//   const setTabName = useSetAtom(mainTabIndexAtom);
//   // const getResumeShipValue = () => useAtomValue(resumeShipAtom);
//   // const getResumeShipDBInfo = () => useAtomValue(resumeShipAtom).ship;
//   // const changeResumeShip = (ship) =>
//   //   setResumeShipAtom({ ship: ship, skinId: 0 });
//   const changeMainTab = (index: MAIN_TAB_NAMES) => setTabName(index);

//   return {
//     // getResumeShipValue,
//     // getResumeShipDBInfo,
//     // changeResumeShip,
//     changeMainTab,
//   };
// }
