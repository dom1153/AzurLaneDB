// import ships from "../../db/ships.json";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";

import {
  DEFAULT_TAB_INDEX,
  DEV_TAB_IDX,
  MAIN_TAB_NAMES,
  isDev,
  isLocalhost,
  isProd,
} from "@/hooks/useDevTools";
import {
  ENABLE_RESUME,
  ENABLE_FOO,
  ENABLE_ARCHIVE,
  ENABLE_SETTINGS,
} from "@/hooks/useDevTools";

import ShipArchive from "@/views/ShipArchive";
import ShipResume from "@/views/ShipResume";
import Foo from "@/views/Foo";
import SettingsPanel from "@/views/SettingsPanel";

export const mainTabIndex: number = DEFAULT_TAB_INDEX;
export const mainTabIndexAtom = atom(mainTabIndex);

export default function MainTab({}) {
  const { tabId, setTabId, panelHeight } = useMainTab();

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
            {ENABLE_ARCHIVE && <ShipArchive />}
          </TabPanel>
          <TabPanel h="100%" bgColor={"blue.100"} p={"0"}>
            {ENABLE_RESUME && <ShipResume />}
          </TabPanel>
          {isDev() && <TabPanel>{ENABLE_FOO && <Foo />}</TabPanel>}
          <TabPanel>{ENABLE_SETTINGS && <SettingsPanel />}</TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function useMainTab() {
  const [tabId, setTabId] = useAtom(mainTabIndexAtom);

  // hehe... magic numbers
  function panelHeight() {
    let alertHeight = isLocalhost() ? "48px" : "0px";
    let tabHeight = "40px";
    // VVV let it be known there is REQUIRED whitespace between - operator
    let sum = `calc(100dvh - ${tabHeight} - ${alertHeight})`;
    return sum;
  }

  return {
    tabId,
    setTabId,
    panelHeight,
  };
}
