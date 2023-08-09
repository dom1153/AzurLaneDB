// import ships from "../../db/ships.json";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useAtom } from "jotai";

import Dev from "@/hooks/useDevTools";
import Globals from "@/hooks/useGlobals";
import ShipArchive from "@/views/ShipArchive";
import ShipResume from "@/views/ShipResume";
import Foo from "@/views/Foo";
import SettingsPanel from "@/views/SettingsPanel";
import Browser from "@/views/Browser";

export default function MainTab({}) {
  const [tabId, setTabId] = useAtom(Globals.mainTabIndexAtom);

  return (
    <>
      <Tabs
        align={"center"}
        index={tabId}
        onChange={(i) => setTabId(i)}
        overflowY={"auto"}
        display={"flex"}
        flexDir={"column"}
        h={"100%"}
      >
        <TabList zIndex={1000}>
          <Tab>Search</Tab>
          <Tab>Details</Tab>
          {Dev.isDev() && <Tab>Test</Tab>}
          {Dev.isDev() && <Tab>Settings</Tab>}
        </TabList>
        <TabPanels flex={"1"} bgColor={"red.100"} overflowY={"auto"}>
          <TabPanel h="100%" p={"0"}>
            {false && <ShipArchive />}
            {true && <Browser />}
          </TabPanel>
          <TabPanel h="100%" bgColor={"blue.100"} p={"0"}>
            {true && <ShipResume />}
          </TabPanel>
          {Dev.isDev() && (
            <TabPanel>
              <Foo />
            </TabPanel>
          )}
          <TabPanel>{Dev.isDev() && <SettingsPanel />}</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
