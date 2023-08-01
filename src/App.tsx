import { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";

import useAzurApi from "@/hooks/useAzurApi";

import GlobalAlert from "@components/GlobalAlert";
import MainTab from "@components/MainTab";
import NavBar from "@components/NavBar";

function App() {
  const {} = useApp();

  return (
    <Flex className="App" flexDir="column">
      <GlobalAlert />
      <MainTab />
    </Flex>
  );
}

function useApp() {
  const { getDb } = useAzurApi();
  useEffect(() => {
    getDb();
  }, []);

  if (import.meta.hot) {
    // state data is reset on HMR so this should fix it. for debugging only
    import.meta.hot.on("vite:afterUpdate", () => {
      console.log("hot reload!");
      getDb();
    });
  }

  return {};
}

export default App;
