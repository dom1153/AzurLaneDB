// import ships from "../../db/ships.json";
import DatabaseReader from "../logic/DatabaseReader";
import Foo from "./special/Foo";
import Details from "./details/Details";
import {
  Flex,
  Text,
  Stack,
  Button,
  Box,
  HStack,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import BrowseSearch from "./browse/BrowseSearch";
import SettingsPanel from "./settings/SettingsPanel";
import { useEffect, useState } from "react";
import * as Assets from "../assets/asset_index";

// DEV CONFIG
const isProd = () => import.meta.env.MODE == "production";
const isDev = () => !isProd();
const DEV_TAB_IDX = 0;
const DEFAULT_TAB_INDEX = isProd() ? 0 : DEV_TAB_IDX;

function App() {
  const { shipList, ship, setShip, getDB } = DatabaseReader();
  const [tabIdx, setTabIdx] = useState(DEFAULT_TAB_INDEX);

  useEffect(() => {
    getDB();
  }, []);
  const handleTabsChange = (index) => {
    setTabIdx(index);
  };
  function handleSetSecretary(ship) {
    setShip(ship);
    setTabIdx(1);
  }

  useEffect(() => {
    // console.log("main");
  }, [ship]);

  // useEffect(() => {
  //   console.log("main", shipList);
  // }, [shipList]);

  // bg={"purple.100"}
  // <Flex h="100vh" flexDir={"column"}>

  return (
    <div className="App">
      <Box>
        <HStack spacing="">
          <Alert
            status={isProd() ? "success" : "info"}
            alignItems={"center"}
            textAlign={"center"}
            zIndex={1000}
          >
            <AlertIcon />
            <AlertTitle>Environment mode:</AlertTitle>
            <AlertDescription>
              {import.meta.env.MODE.toUpperCase()}
            </AlertDescription>
          </Alert>
          <Alert
            status={"warning"}
            alignItems={"center"}
            textAlign={"center"}
            zIndex={1000}
          >
            <AlertIcon />
            <AlertTitle>Version:</AlertTitle>
            <AlertDescription>"P.P. Alpha" (pre-pre alpha)</AlertDescription>
          </Alert>
        </HStack>
        <Tabs
          align={"center"}
          index={tabIdx}
          onChange={handleTabsChange}
          // flex={"1"}
          // display={"flex"}
          // flexDir={"column"}
        >
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
              <TabPanel
                // display={"flex"}
                // flex={"1"}
                // overflowY={"hidden"}
                bg={"purple.100"}
                color={"black"}
              >
                <Foo />
              </TabPanel>
            )}
            <TabPanel>
              <SettingsPanel></SettingsPanel>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}

export default App;
