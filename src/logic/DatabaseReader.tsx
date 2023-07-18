import { useState } from "react";
import { Ship } from "@azurapi/azurapi/build/types/ship";

const DatabaseReader = () => {
  const [shipList, setShipList] = useState<Array<Ship> | null>(null);
  const [ship, setShip] = useState<Ship | null>(null);

  function getDB() {
    fetch(
      "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
    )
      .then((result) => {
        // console.log("A: ", result);
        return result.json();
      })
      .then(
        (result) => {
          // console.log("B: ", result);
          let ships: Array<Ship> = result;

          ships.sort((a: Ship, b: Ship) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          setShipList(ships);

          const DEFAULT_SHIP = ships.filter((s: Ship) =>
            s.names.en.toLowerCase().includes("essex")
          )[0];
          setShip(DEFAULT_SHIP);

          // console.log("final success ajax: ", shipList, ship);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );
  }
  return { shipList, ship, setShip, getDB };
};

export default DatabaseReader;
