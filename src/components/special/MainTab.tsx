// import ships from "../../db/ships.json";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { isDev, DEFAULT_TAB_INDEX } from "../../utils/devTools";
import useAzurApi from "../../hooks/useAzurApi";

import ShipArchive from "../browse/ShipArchive";
import ShipDetail from "../resume/ShipResume";
import Foo from "../special/Foo";
import SettingsPanel from "../settings/SettingsPanel";

const SHIP_DETAIL_TAB = 1;

export default function MainTab({}) {
  const { fullShipList, resumeShipId, setResumeShipId, getDB } = useAzurApi();
  const [tabId, setTabId] = useState(DEFAULT_TAB_INDEX);

  function shipCardClickHandler(ship) {
    // when click on card from browse/search ; go to details tab
    setResumeShipId(ship);
    setTabId(SHIP_DETAIL_TAB);
  }

  useEffect(() => {
    getDB();
  }, []);

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
          <TabPanel p={"0"}>
            {true && (
              <ShipArchive
                ships={fullShipList}
                setShip={shipCardClickHandler}
              />
            )}
          </TabPanel>
          <TabPanel p={"0"}>
            {true && <ShipDetail ship={resumeShipId} />}
          </TabPanel>
          {isDev() && (
            <TabPanel bg={"purple.100"} color={"black"}>
              <Foo />
            </TabPanel>
          )}
          <TabPanel>
            <SettingsPanel></SettingsPanel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
