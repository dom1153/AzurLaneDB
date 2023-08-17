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
  Checkbox,
} from "@chakra-ui/react";

import { MetaDump } from "@components/shipresume/Other/MetaDump";
import { StatGallery } from "@components/shipresume/Stat/StatGallery";
import { SkinGallery } from "@components/shipresume/Skin/SkinGallery";
import { ArtworkGallery } from "@components/shipresume/Artwork/ArtworkGallery";
import { SkillGallery } from "@components/shipresume/Skill/SkillGallery";
import { StatCard } from "@components/shipresume/Stat/StatCard";
import { Ship } from "@azurapi/azurapi/build/types/ship";
import Dev from "@/hooks/useDevTools";
import { useState } from "react";

type InfoTabProps = {
  ship: Ship;
  useSecretaryBg: boolean;
  setSecretaryBg: (boolean) => void;
  useSkinBg: boolean;
  setSkinBg: (boolean) => void;
};

export function InfoTabs({
  ship,
  useSecretaryBg,
  setSecretaryBg,
  useSkinBg,
  setSkinBg,
}: InfoTabProps) {
  if (!ship) return <Text>This is empty</Text>;

  return (
    <Stack maxW={"container.sm"} overflowY={"auto"}>
      <Card p={"8px"}>
        {Dev.isDev() && (
          <Box position={"absolute"} right="0" top="0">
            <Text>{ship.nationality} (icon)</Text>
          </Box>
        )}
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
            <Tab>Artwork {`(${ship.gallery.length})`}</Tab>
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
              <Stack>
                <Checkbox
                  isChecked={useSecretaryBg}
                  onChange={(e) => setSecretaryBg(e.target.checked)}
                >
                  Use Secretary Background
                </Checkbox>
                <Checkbox
                  isChecked={useSkinBg}
                  onChange={(e) => setSkinBg(e.target.checked)}
                >
                  Use Skin Background (if applicable)
                </Checkbox>
                <SkinGallery ship={ship} />
              </Stack>
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
                <Link key={kv[1] as string} href={kv[1] as string}>
                  {kv[0]}
                </Link>
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
