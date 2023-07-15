import {
  Wrap,
  Container,
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
import { useEffect, useState } from "react";

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

function Skin(ship, img, setSkin, id) {
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
      <Flex direction="" bgColor={"blue.100"}>
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

function InfoCard({ header, body }) {
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
  if (skin == "") {
    skinP = ship.skins[0].image;
    chibi = ship.skins[0].chibi;
  } else {
    skinP = skin.image;
    chibi = skin.chibi;
  }

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
        {/* <Box
          bgImage={`url('${skinP}')`}
          bgPosition="left"
          bgRepeat="no-repeat"
          bgClip={"unset"}
          height={"container.lg"}
          backgroundAttachment={"fixed"}
          overflow={"unset"}
        /> */}
        <Image
          src={skinP}
          objectFit={"none"}
          overflow={"unset"}
          // overflow={"cover"}
          zIndex={"-1000"}
          align={"center"}
          loading="eager"
        />
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
        {ship.skins.map((g, i) => Skin(ship, g, setSkin, i))}
      </Grid>
    </>
  );
}

function StatDump({ ship }) {
  if (!ship) return <></>;
  // VVV may need to become state....
  const stats = ship.stats.level120;
  function InfoCardGrid({ header, body }) {
    return <GridItem></GridItem>;
  }
  return (
    <>
      <Heading>Level 120</Heading>
      <Grid templateColumns={"repeat(3, 1fr)"} gap="6">
        <InfoCard header="HP" body={stats.health} />
        <InfoCard header="ARMOR" body={stats.armor} />
        <InfoCard header="RL" body={stats.reload} />
        <InfoCard header="FP" body={stats.firepower} />
        <InfoCard header="TP" body={stats.torpedo} />
        <InfoCard header="EV" body={stats.evasion} />
        <InfoCard header="AA" body={stats.antiair} />
        <InfoCard header="AV" body={stats.aviation} />
        <InfoCard header="COST" body={stats.oilConsumption} />
        <InfoCard header="ASW" body={stats.antisubmarineWarfare} />
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

export default function Details({ ship = null, children }) {
  const [skin, setSkin] = useState("");

  useEffect(() => {
    console.log("Details [ships] useEffect");
    if (ship) {
      setSkin(ship.skins[0]);
    }
  }, [ship]);

  if (!ship) {
    return <Text>No ship found</Text>;
  }

  return (
    <Box>
      <Box
        bgImage={`url('${skin.background}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgClip={"unset"}
        bgSize={"cover"}
        height={"container.lg"}
        backgroundAttachment={"fixed"}
        overflow={"unset"}
      >
        <Grid templateColumns={"repeat( 2, 1fr)"}>
          <Portrait ship={ship} skin={skin} />
          <InfoDump ship={ship} setSkin={setSkin} />
        </Grid>
      </Box>
    </Box>
  );
}
