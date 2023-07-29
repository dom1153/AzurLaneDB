import { useEffect } from "react";
import { Box } from "@chakra-ui/react";

import useAzurApi from "@/hooks/useAzurApi";

import GlobalAlert from "@components/GlobalAlert";
import MainTab from "@components/MainTab";

function App() {
  const {} = useApp();

  return (
    <Box className="App" h="100vh">
      <GlobalAlert />
      <MainTab />
    </Box>
  );
}

function useApp() {
  const { getDb } = useAzurApi();
  useEffect(() => {
    getDb();
  }, []);
  return {};
}

export default App;
