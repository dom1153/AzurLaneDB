// import ships from "../../db/ships.json";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";

import {
  DEFAULT_TAB_INDEX,
  DEV_TAB_IDX,
  MAIN_TAB_NAMES,
  isDev,
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
  const { tabId, setTabId } = useMainTab();

  return (
    <>
      <Tabs align={"center"} index={tabId} onChange={(i) => setTabId(i)}>
        <TabList zIndex={1000}>
          <Tab>Search</Tab>
          <Tab>Details</Tab>
          {isDev() && <Tab>Test</Tab>}
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={"0"}>{ENABLE_ARCHIVE && <ShipArchive />}</TabPanel>
          <TabPanel p={"0"}>{ENABLE_RESUME && <ShipResume />}</TabPanel>
          {isDev() && <TabPanel>{ENABLE_FOO && <Foo />}</TabPanel>}
          <TabPanel>{ENABLE_SETTINGS && <SettingsPanel />}</TabPanel>
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
