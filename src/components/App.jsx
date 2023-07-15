// import ships from "../../db/ships.json";
import DatabaseReader from "../logic/DatabaseReader";
import Foo from "./Foo";
import CenterDiv from "./CenterDiv";
import Details from "./Details";
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
import BrowseSearch from "./BrowseSearch";
import { useEffect, useState } from "react";

// DEV CONFIG
const isProd = () => import.meta.env.MODE == "production";
const isDev = () => !isProd();
const DEFAULT_INDEX = isProd() ? 0 : 2;

function App() {
  useEffect(() => {}, []);

  const { shipList, ship } = DatabaseReader();
  const [tabIdx, setTabIdx] = useState(DEFAULT_INDEX);
  const handleTabsChange = (index) => {
    setTabIdx(index);
  };
  function handleSetSecretary(ship) {
    setShip(ship);
    setTabIdx(1);
  }

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
        <Tabs index={tabIdx} onChange={handleTabsChange} maxW={"container.lg"}>
          <Center>
            <TabList zIndex={1000} bg={"white"}>
              <Tab>Search</Tab>
              <Tab>Details</Tab>
              {isDev() && <Tab>Test</Tab>}
            </TabList>
          </Center>

          <TabPanels>
            <TabPanel>
              <BrowseSearch ships={shipList} setShip={handleSetSecretary} />
            </TabPanel>
            <TabPanel>
              <Details ship={ship} />
            </TabPanel>
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
