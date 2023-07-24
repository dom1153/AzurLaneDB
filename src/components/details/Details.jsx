import {
  Tooltip,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Grid,
  Stack,
  HStack,
  Link,
  Heading,
  Text,
  Box,
  Image,
  Card,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as AttrIcons from "../../assets/asset_index.js";
// import { Ship } from "@azurapi/azurapi/build/types/ship.ts";

function Gallery(ship, img, id) {
  return (
    <Link
      key={`${ship.names.en}_gal_${id}`}
      href={img.url}
      target="_blank"
      maxW=""
    >
      <Tooltip label={img.description}>
        <Image src={img.url} objectFit={"cover"} loading="lazy" />
      </Tooltip>
    </Link>
  );
}

function SkinItem(ship, img, setSkin, id) {
  function onClickHandler(s) {
    setSkin(s);
  }
  return (
    <Box
      key={`${ship.names.en}_skin_${id}`}
      maxW="sm"
      onClick={() => onClickHandler(img)}
    >
      <Tooltip label={`${img.name}`}>
        <Image src={img.image} objectFit={"cover"} loading="lazy" />
      </Tooltip>
    </Box>
  );
}

function Skill(ship, skill, id) {
  return (
    <div key={`${ship.names.en}_skill_${id}`}>
      <Flex bgColor={"blue.100"}>
        <Box boxSize="">
          <Image src={skill.icon} loading="lazy" />
        </Box>
        <Stack>
          <Heading size="md">{skill.names.en}</Heading>
          <Text>{skill.description}</Text>
        </Stack>
      </Flex>
    </div>
  );
}

function InfoCard({ header, body, icon = null }) {
  if (icon) {
    return (
      <>
        <Flex fontSize={"sm"} bg={"red.100"}>
          <Box bg={"black"} p={"2"}>
            <Image src={icon} boxSize={"20px"} />
          </Box>
          <Flex
            justifyContent={"space-between"}
            bg={"gray"}
            textColor={"white"}
            p={"2"}
            flex={"1"}
          >
            <Text as="b">{header}</Text>
            <Text>{body}</Text>
          </Flex>
        </Flex>
      </>
    );
  } else
    return (
      <Flex fontSize={"sm"}>
        <Text bg={"black"} textColor={"white"} as="b" p={"2"}>
          {header}
        </Text>
        <Text bg={"gray"} textColor={"white"} p={"2"}>
          {body}
        </Text>
      </Flex>
    );
}

function Portrait({ ship, skin }) {
  if (!ship) return <Text>Empty</Text>;
  let skinP, chibi;
  let bg = null;
  if (skin == "" || skin == null) {
    skinP = ship.skins[0].image;
    chibi = ship.skins[0].chibi;
  } else {
    // console.log(
    //   "bg:",
    //   skin.bg,
    //   "\nnobg:",
    //   skin.nobg,
    //   "\nbackground",
    //   skin.background
    // );
    skinP = skin.bg ? skin.bg : skin.image;
    chibi = skin.chibi;
  }
  const experiment = false;

  return (
    <>
      <Box position={"relative"}>
        <Image
          src={chibi}
          position={"absolute"}
          right="0"
          top="0"
          loading="eager"
        />
        {experiment ? (
          <Image
            src={skinP}
            objectFit={"none"}
            overflow={"unset"}
            // overflow={"cover"}
            zIndex={"-1000"}
            align={"center"}
            loading="eager"
          />
        ) : (
          <Image src={skinP} loading="eager" bgImage={bg && `url('${bg}')`} />
        )}
      </Box>
    </>
  );
}

function SkillDump({ ship }) {
  if (!ship) return <></>;
  return (
    <>
      <Stack>{ship.skills.map((skill, i) => Skill(ship, skill, i))}</Stack>
    </>
  );
}

function GalleryDump({ ship }) {
  if (!ship) return <></>;
  return (
    <>
      <Grid templateColumns={"repeat(5, 1fr)"} gap="8px">
        {ship.gallery.map((g, i) => Gallery(ship, g, i))}
      </Grid>
    </>
  );
}

function SkinDump({ ship, setSkin }) {
  if (!ship) return <></>;
  return (
    <>
      <Grid templateColumns={"repeat(5, 1fr)"} gap="8px">
        {ship.skins.map((g, i) => SkinItem(ship, g, setSkin, i))}
      </Grid>
    </>
  );
}

function StatDump({ ship }) {
  if (!ship) return <></>;
  // VVV may need to become state....
  const stats = ship.stats.level120;

  return (
    <>
      <Heading>Level 120</Heading>
      <Grid templateColumns={"repeat(3, 1fr)"} gap="6">
        <InfoCard header="HP" body={stats.health} icon={AttrIcons.attr_hp} />
        <InfoCard
          header="Armor"
          body={stats.armor}
          icon={AttrIcons.attr_armor}
        />
        <InfoCard header="RL" body={stats.reload} icon={AttrIcons.attr_rld} />
        <InfoCard header="FP" body={stats.firepower} icon={AttrIcons.attr_fp} />
        <InfoCard header="TP" body={stats.torpedo} icon={AttrIcons.attr_trp} />
        <InfoCard header="EV" body={stats.evasion} icon={AttrIcons.attr_eva} />
        <InfoCard header="AA" body={stats.antiair} icon={AttrIcons.attr_aa} />
        <InfoCard header="AV" body={stats.aviation} icon={AttrIcons.attr_av} />
        <InfoCard
          header="Cost"
          body={stats.oilConsumption}
          icon={AttrIcons.attr_cost}
        />
        <InfoCard
          header="ASW"
          body={stats.antisubmarineWarfare}
          icon={AttrIcons.attr_asw}
        />
      </Grid>
    </>
  );
}

function MetaDump({ ship }) {
  const str = JSON.stringify(ship, null, " ");
  // console.log(str, str.length);
  if (!ship) return <></>;
  return (
    <>
      <Text as="pre">{str}</Text>
    </>
  );
}

function InfoDump({ ship, setSkin }) {
  return (
    <Stack>
      <Card p={"8px"}>
        <Box position={"absolute"} right="0" top="0">
          <Text>{ship.nationality} (icon)</Text>
        </Box>
        <Heading>{ship.names.en}</Heading>
        <Stack>
          <InfoCard header="Rarity" body={ship.rarity} />
          <HStack>
            <InfoCard header="Class" body={ship.class} />
            <InfoCard header="Faction" body={ship.nationality} />
            <InfoCard header="Hull" body={ship.hullType} />
          </HStack>
        </Stack>
      </Card>

      <Card>
        <Tabs>
          <TabList>
            <Tab>Stats</Tab>
            <Tab>Skills</Tab>
            <Tab>Gallery</Tab>
            <Tab>Skins</Tab>
            <Tab>More Info</Tab>
            <Tab>Meta (debug)</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack>
                <StatDump ship={ship} />
              </Stack>
            </TabPanel>
            <TabPanel>
              <SkillDump ship={ship} />
            </TabPanel>
            <TabPanel>
              <GalleryDump ship={ship} />
            </TabPanel>
            <TabPanel>
              <SkinDump ship={ship} setSkin={setSkin} />
            </TabPanel>
            <TabPanel>Put stuff about the skin and credits here</TabPanel>
            <TabPanel>
              <MetaDump ship={ship} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Stack>
  );
}

function parseShipDetails(ship) {
  let level_background = AttrIcons.detail_bg_gray;
  let rarity = ship.rarity.toLowerCase();
  switch (rarity) {
    case "common":
      level_background = AttrIcons.detail_bg_gray;
      break;
    case "rare":
      level_background = AttrIcons.detail_bg_blue;
      break;
    case "elite":
      level_background = AttrIcons.detail_bg_purp;
      break;
    case "super rare":
      level_background = AttrIcons.detail_bg_gold;
      break;
    case "priority":
      level_background = AttrIcons.detail_bg_gold_pr;
      break;
    case "ultra rare":
      level_background = AttrIcons.detail_bg_gay;
      break;
    case "decisive":
      level_background = AttrIcons.detail_bg_gay_pr;
      break;
    default:
      console.log("DEBUG: ship rarity not matched -> ", ship.rarity);
      break;
  }

  return { level_background };
}

export default function Details({ ship = null }) {
  const [skin, setSkin] = useState(null);
  const [levelBg, setLevelBg] = useState(AttrIcons.detail_bg_gray);

  useEffect(() => {
    if (ship) {
      setSkin(ship.skins[0]);
      let { level_background } = parseShipDetails(ship);
      setLevelBg(level_background);
    }
  }, [ship]);

  if (!ship) {
    return <Text>No ship found</Text>;
  }

  return (
    <>
      <Box
        bgImage={`url('${levelBg}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgClip={"unset"}
        bgSize={"cover"}
        height={"container.lg"}
        backgroundAttachment={"fixed"}
        overflow={"unset"}
        p={"2"}
      >
        <Grid templateColumns={"repeat( 2, 1fr)"}>
          <Portrait ship={ship} skin={skin} />
          <InfoDump ship={ship} setSkin={setSkin} />
        </Grid>
      </Box>
    </>
  );
}
