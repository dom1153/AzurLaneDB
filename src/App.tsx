import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";

import Dev from "./hooks/useDevTools";
import useAzurApi from "@/hooks/useAzurApi";
import GlobalAlert from "@components/GlobalAlert";
import MainTab from "@components/MainTab";

export default function App() {
  const {} = useApp();

  return (
    <Flex className="App" flexDir="column" h="100vh">
      <GlobalAlert />
      {true && <MainTab />}
    </Flex>
  );
}

function useApp() {
  const { getDb } = useAzurApi();

  useEffect(() => {
    Dev.log("==========");
    Dev.log("App begins");
    Dev.log("==========");
    getDb();
  }, []);

  if (import.meta.hot) {
    import.meta.hot.on("vite:afterUpdate", () => {
      getDb();
      Dev.log("===========================");
      Dev.log("App || vite:afterUpdate HMR");
      Dev.log("===========================");
    });
  }

  return {};
}
