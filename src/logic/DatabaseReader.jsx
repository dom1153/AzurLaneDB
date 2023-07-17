import { useState } from "react";

const DatabaseReader = () => {
  const [shipList, setShipList] = useState(null);
  const [ship, setShip] = useState(null);

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
          let ships = result;

          ships = ships.toSorted((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          setShipList(ships);

          const DEFAULT_SHIP = ships.filter((s) =>
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
