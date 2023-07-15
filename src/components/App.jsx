// import ships from "../../db/ships.json";
import DatabaseReader from "../logic/DatabaseReader";
import Foo from "./special/Foo";
import Details from "./details/Details";
import {
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
import { useEffect, useState } from "react";

// DEV CONFIG
const isProd = () => import.meta.env.MODE == "production";
const isDev = () => !isProd();
const DEV_TAB_IDX = 1;
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
    console.log("pah", ship);
    setShip(ship);
    setTabIdx(1);
  }

  useEffect(() => {
    // console.log("main");
  }, [ship]);

  useEffect(() => {
    console.log("tabIdx updated", tabIdx);
  }, [tabIdx]);
  // useEffect(() => {
  //   console.log("main", shipList);
  // }, [shipList]);

  return (
    <div className="App">
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

      <Center>
        <Tabs index={tabIdx} onChange={handleTabsChange}>
          <Center>
            <TabList zIndex={1000} bg={"white"}>
              <Tab>Search</Tab>
              <Tab>Details</Tab>
              {isDev() && <Tab>Test</Tab>}
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel maxW={"container.lg"}>
              {true && (
                <BrowseSearch ships={shipList} setShip={handleSetSecretary} />
              )}
            </TabPanel>
            <TabPanel>{true && <Details ship={ship} />}</TabPanel>
            {isDev() && (
              <TabPanel>
                <Foo />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Center>
    </div>
  );
}

export default App;
