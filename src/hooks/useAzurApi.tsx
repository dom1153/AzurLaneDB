import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import { fullShipListAtom, resumeShipAtom } from "@/hooks/useGlobals";
import {
  DEFAULT_SHIP_NAME,
  DEFAULT_SHIP_FILTER_IDX,
  isDev,
} from "@/hooks/useDevTools.js";

export default function useAzurApi() {
  const setFullShipList = useSetAtom(fullShipListAtom);
  const setResumeShipAtom = useSetAtom(resumeShipAtom);

  function getDb() {
    fetch(
      "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json",
      { cache: "force-cache" }
    )
      .then((result) => {
        return result.json();
      })
      .then(
        (result) => {
          let ships: Array<Ship> = result;

          // sort by internal id instead of default
          ships.sort((a: Ship, b: Ship) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          setFullShipList(ships);

          // set default resume ship
          const resumeShip = ships.filter((s: Ship) =>
            s.names.en.toLowerCase().includes(DEFAULT_SHIP_NAME)
          )[DEFAULT_SHIP_FILTER_IDX];

          setResumeShipAtom(resumeShip);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );
  }

  return { getDb };
}
