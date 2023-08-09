import { useSetAtom } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import Globals from "@/hooks/useGlobals";
import Dev from "@/hooks/useDevTools.js";
import { useToast } from "@chakra-ui/react";

export default function useAzurApi() {
  const setFullShipList = useSetAtom(Globals.fullShipListAtom);
  const setResumeShipAtom = useSetAtom(Globals.resumeShipAtom);
  const toast = useToast();

  function getDb() {
    fetch(
      "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json",
      {
        cache: "force-cache",
      }
    )
      .then((result) => {
        if (!result.ok) {
          handleError(`Response status ${result.status}`);
          Dev.error("useAzurApi || Bad response: ", result);
          return null;
        }
        return result.json();
      }, handleError)
      .then((result) => {
        if (!result) return;
        let ships: Array<Ship> = result;

        // sort by internal id instead of default
        ships.sort((a: Ship, b: Ship) => {
          if (a.id < b.id) return -1;
          if (a.id > b.id) return 1;
          return 0;
        });

        setFullShipList(ships);
        // setFullShipList(ships.slice(0, 300));
        Dev.log("useAzurApi || Retrieved full ship list");

        // set default resume ship
        const resumeShip = ships.filter((s: Ship) =>
          s.names.en.toLowerCase().includes(Dev.DEFAULT_SHIP_NAME)
        )[Dev.DEFAULT_SHIP_FILTER_IDX];

        setResumeShipAtom(resumeShip);
        Dev.log(
          `useAzurApi || Default Resume ship set to ${Dev.DEFAULT_SHIP_NAME}`
        );
      }, handleError);
  }

  function handleError(error) {
    // TODO: test this with chrome dev tools
    console.log("Error with azurApi: ", error);
    toast({
      title: "Error retrieving Azur Lane API",
      description: `Message: ${error}`,
      status: "error",
      duration: 10000,
      isClosable: true,
    });
  }

  return { getDb };
}
