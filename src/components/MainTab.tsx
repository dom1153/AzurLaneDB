// import ships from "../../db/ships.json";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";

import { DEFAULT_TAB_INDEX, isDev } from "@/hooks/useDevTools";

import ShipArchive from "@/views/ShipArchive";
import ShipResume from "@/views/ShipResume";
import Foo from "@/views/Foo";
import SettingsPanel from "@/views/SettingsPanel";

export const mainTabIndex: number = DEFAULT_TAB_INDEX;
export const mainTabIndexAtom = atom(mainTabIndex);

export default function MainTab({}) {
  const { tabId, setTabId } = useMainTab();

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
          {isDev() && <Tab>Test</Tab>}
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels flex={"1"} bgColor={"red.100"} overflowY={"auto"}>
          <TabPanel h="100%" p={"0"}>
            <ShipArchive />
          </TabPanel>
          <TabPanel h="100%" bgColor={"blue.100"} p={"0"}>
            <ShipResume />
          </TabPanel>
          {isDev() && (
            <TabPanel>
              <Foo />
            </TabPanel>
          )}
          <TabPanel>
            <SettingsPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function useMainTab() {
  const [tabId, setTabId] = useAtom(mainTabIndexAtom);

  return {
    tabId,
    setTabId,
  };
}
