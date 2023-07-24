// import ships from "../../db/ships.json";
import { Text, Box, useColorMode, Button } from "@chakra-ui/react";
// import { useEffect, useState } from "react";

// for testing new concepts
export default function SettingsPanel({}) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </>
  );
}
