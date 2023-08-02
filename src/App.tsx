import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import useAzurApi from "@/hooks/useAzurApi";

import GlobalAlert from "@components/GlobalAlert";
import MainTab from "@components/MainTab";

function App() {
  const {} = useApp();

  return (
    <Flex className="App" flexDir="column" h="100vh">
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
