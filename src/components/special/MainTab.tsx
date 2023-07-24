// import ships from "../../db/ships.json";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { isDev, DEFAULT_TAB_INDEX } from "../../utils/devTools";
import DatabaseReader from "../../hooks/DatabaseReader";

import BrowseSearch from "../browse/BrowseSearch";
import Details from "../details/Details";
import Foo from "../special/Foo";
import SettingsPanel from "../settings/SettingsPanel";

export default function MainTab({}) {
  const { shipList, ship, setShip, getDB } = DatabaseReader();
  const [tabIdx, setTabIdx] = useState(DEFAULT_TAB_INDEX);

  const handleTabsChange = (index) => {
    setTabIdx(index);
  };
  function handleSetSecretary(ship) {
    setShip(ship);
    setTabIdx(1);
  }

  useEffect(() => {
    getDB();
  }, []);

  return (
    <>
      <Tabs align={"center"} index={tabIdx} onChange={handleTabsChange}>
        <TabList zIndex={1000}>
          <Tab>Search</Tab>
          <Tab>Details</Tab>
          {isDev() && <Tab>Test</Tab>}
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={"0"}>
            {true && (
              <BrowseSearch ships={shipList} setShip={handleSetSecretary} />
            )}
          </TabPanel>
          <TabPanel p={"0"}>{true && <Details ship={ship} />}</TabPanel>
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
