import { useEffect } from "react";

import useAzurApi from "@/hooks/useAzurApi";

import GlobalAlert from "@components/GlobalAlert";
import MainTab from "@components/MainTab";

function App() {
  const {} = useApp();

  return (
    <div className="App">
      <GlobalAlert />
      <MainTab />
    </div>
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
