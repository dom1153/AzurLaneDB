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
} from "@chakra-ui/react";

import { MetaDump } from "@components/shipresume/Other/MetaDump";
import { StatGallery } from "@components/shipresume/Stat/StatGallery";
import { SkinGallery } from "@components/shipresume/Skin/SkinGallery";
import { ArtworkGallery } from "@components/shipresume/Artwork/ArtworkGallery";
import { SkillGallery } from "@components/shipresume/Skill/SkillGallery";
import { StatCard } from "@components/shipresume/Stat/StatCard";

export function InfoTabs({ ship }) {
  return (
    <Stack>
      <Card p={"8px"}>
        <Box position={"absolute"} right="0" top="0">
          <Text>{ship.nationality} (icon)</Text>
        </Box>
        <Heading>{ship.names.en}</Heading>
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
            <Tab>Gallery</Tab>
            <Tab>Skins</Tab>
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
