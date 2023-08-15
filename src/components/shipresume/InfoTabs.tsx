import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  HStack,
  Heading,
  Text,
  Box,
  Card,
  Link,
} from "@chakra-ui/react";

import { MetaDump } from "@components/shipresume/Other/MetaDump";
import { StatGallery } from "@components/shipresume/Stat/StatGallery";
import { SkinGallery } from "@components/shipresume/Skin/SkinGallery";
import { ArtworkGallery } from "@components/shipresume/Artwork/ArtworkGallery";
import { SkillGallery } from "@components/shipresume/Skill/SkillGallery";
import { StatCard } from "@components/shipresume/Stat/StatCard";
import { Ship } from "@azurapi/azurapi/build/types/ship";

type InfoTabProps = {
  ship: Ship;
};

export function InfoTabs({ ship }: InfoTabProps) {
  if (!ship) return <Text>This is empty</Text>;
  return (
    <Stack maxW={"container.sm"} overflowY={"auto"}>
      <Card p={"8px"}>
        <Box position={"absolute"} right="0" top="0">
          <Text>{ship.nationality} (icon)</Text>
        </Box>
        <Link href={ship.wikiUrl} isExternal>
          <Heading>{ship.names.en}</Heading>
        </Link>

        <Stack>
          <StatCard header="Rarity" body={ship.rarity} />
          <HStack>
            <StatCard header="Class" body={ship.class} />
            <StatCard header="Faction" body={ship.nationality} />
            <StatCard header="Hull" body={ship.hullType} />
          </HStack>
        </Stack>
      </Card>

      <Card>
        <Tabs>
          <TabList>
            <Tab>Stats</Tab>
            <Tab>Skills</Tab>
            <Tab>Gallery {`(${ship.gallery.length})`}</Tab>
            <Tab>Skins {`(${ship.skins.length})`}</Tab>
            <Tab>More Info</Tab>
            <Tab>Meta (debug)</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack>
                <StatGallery ship={ship} />
              </Stack>
            </TabPanel>
            <TabPanel>
              <SkillGallery ship={ship} />
            </TabPanel>
            <TabPanel>
              <ArtworkGallery ship={ship} />
            </TabPanel>
            <TabPanel>
              <SkinGallery ship={ship} />
            </TabPanel>
            <TabPanel>
              <MoreInfo ship={ship} />
            </TabPanel>
            <TabPanel>
              <MetaDump ship={ship} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Stack>
  );
}

function MoreInfo({ ship }) {
  if (!ship) return <></>;
  let artists = <></>;
  let voice = <></>;
  if (ship.hasOwnProperty("misc")) {
    if (ship.misc.hasOwnProperty("artist"))
      artists = (
        <StatCard
          header={"Artist"}
          body={
            <HStack>
              <Text>{ship.misc.artist.name}</Text>
              {Object.entries(ship.misc.artist.urls).map((kv) => (
                <Link href={kv[1] as string}>{kv[0]}</Link>
              ))}
            </HStack>
          }
        />
      );
    if (ship.misc.hasOwnProperty("voice"))
      voice = (
        <StatCard
          header={"Voice Actor"}
          body={
            <HStack>
              <Link href={ship.misc.voice.url}>{ship.misc.voice.name}</Link>
            </HStack>
          }
        />
      );
  }

  return (
    <>
      <Stack>
        {artists}
        {voice}
      </Stack>
    </>
  );
}
