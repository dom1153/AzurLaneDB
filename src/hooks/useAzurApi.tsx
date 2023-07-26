import { useState } from "react";
import { Ship } from "@azurapi/azurapi/build/types/ship";
import {
  DEFAULT_SHIP_NAME,
  DEFAULT_SHIP_FILTER_IDX,
} from "@src/utils/devTools.jsx";
// DEFAULT_SHIP_NAME
// DEFAULT_SHIP_FILTER_IDX

export default function useAzurApi() {
  const [fullShipList, setFullShipList] = useState<Array<Ship> | null>(null);
  const [resumeShipId, setResumeShipId] = useState<Ship | null>(null);

  function getDB() {
    fetch(
      "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
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

          // set default ship
          const DEFAULT_SHIP = ships.filter((s: Ship) =>
            s.names.en.toLowerCase().includes("essex")
          )[0];
          setResumeShipId(DEFAULT_SHIP);

          // console.log("final success ajax: ", shipList, ship);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );
  }

  return { fullShipList, resumeShipId, setResumeShipId, getDB };
}
