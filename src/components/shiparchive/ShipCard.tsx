import { Center, Image, Card, Text, Box } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import { MAIN_TAB_NAMES } from "@/hooks/useDevTools";

import { mainTabIndexAtom } from "@components/MainTab";
import { resumeShipAtom } from "@/views/ShipResume";

export default function ShipCard({ ship, displayMode, moreInfo }) {
  const { shipCardClickHandler, cardColorByRarity } = useShipCard();

  return (
    <Card
      key={ship.id}
      display={displayMode ? "box" : "none"}
      onClick={() => shipCardClickHandler(ship)}
      bgColor={cardColorByRarity(ship)}
      color={"black"}
      borderRadius={"none"}
    >
      <Box position={"relative"}>
        <Image src={ship.thumbnail} />
      </Box>
      <Text
        whiteSpace={"nowrap"}
        overflow={"clip"}
        textOverflow={"ellipsis"}
        textAlign={"center"}
      >
        {moreInfo}
      </Text>
      <Text
        //   fontSize={"3xs"}
        whiteSpace={"nowrap"}
        overflow={"clip"}
        textOverflow={"ellipsis"}
        textAlign={"center"}
      >
        {ship.names.en}
      </Text>
    </Card>
  );
}

enum ShipRarity {
  Normal = "Normal",
  Common = "Common",
  Rare = "Rare",
  Epic = "Epic",
  Elite = "Elite",
  SuperRare = "Super Rare",
  Priority = "Priority",
  UltraRare = "Ultra Rare",
  Decisive = "Decisive",
}

function useShipCard() {
  const setShip = useSetAtom(resumeShipAtom);
  const setTab = useSetAtom(mainTabIndexAtom);

  function cardColorByRarity(ship: Ship) {
    // console.log(ship.rarity);
    switch (ship.rarity as ShipRarity) {
      case ShipRarity.Normal:
      case ShipRarity.Common:
        return "gray.100";
      case ShipRarity.Rare:
        return "blue.100";
      case ShipRarity.Elite:
        // case ShipRarity.Epic:
        return "purple.100";
      case ShipRarity.SuperRare:
      case ShipRarity.Priority:
        return "yellow.100";
      case ShipRarity.UltraRare:
      case ShipRarity.Decisive:
        return "pink.100";
      default:
        console.log("unkonwn value: ", ship.rarity);
        return "white";
    }
  }

  function shipCardClickHandler(ship: Ship) {
    setShip(ship);
    setTab(MAIN_TAB_NAMES.RESUME);
  }
  return { shipCardClickHandler, cardColorByRarity };
}
