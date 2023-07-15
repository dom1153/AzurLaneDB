import { useEffect, useState } from "react";

// for testing new concepts
export default function Foo({ children }) {
  if (false) {
    fetch(
      "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
    )
      .then((result) => {
        console.log("A: ", result);
        return result.json();
      })
      .then(
        (result) => {
          console.log("B: ", result);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );
  }
}
