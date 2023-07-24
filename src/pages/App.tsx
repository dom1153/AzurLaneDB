import { Box } from "@chakra-ui/react";

import GlobalAlert from "../components/special/GlobalAlert";
import MainTab from "../components/special/MainTab";

function App() {
  return (
    <div className="App">
      <Box>
        <GlobalAlert />
        <MainTab />
      </Box>
    </div>
  );
}

export default App;
