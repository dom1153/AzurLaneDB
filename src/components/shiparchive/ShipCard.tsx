import { Image, Card, Text, Box } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import { MAIN_TAB_NAMES, isDev } from "@/hooks/useDevTools";

import { mainTabIndexAtom } from "@components/MainTab";
import { resumeShipAtom } from "@/hooks/useGlobals";

export default function ShipCard({ ship, displayMode, moreInfo, onClick }) {
  const { shipCardClickHandler, cardColorByRarity } = useShipCard(
    ship,
    onClick
  );

  return (
    <Card
      key={ship.id}
      display={displayMode ? "box" : "none"}
      onClick={() => shipCardClickHandler(ship)}
      bgColor={cardColorByRarity(ship).replace("1", "2")}
      color={"black"}
      // borderWidth={"5px 0px 5px 0px"}
      // borderRadius={"md"}
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

function useShipCard(ship: Ship, onClick = null) {
  const setShip = useSetAtom(resumeShipAtom);
  const setTab = useSetAtom(mainTabIndexAtom);

  // passing this directory is faster than setting a state first
  function cardColorByRarity(ship: Ship) {
    switch (ship.rarity as ShipRarity) {
      case "Normal":
      case "Common":
        return "gray.100";
      case "Rare":
        return "blue.100";
      case "Elite":
      case "Epic":
        return "purple.100";
      case "Super Rare":
      case "Priority":
        return "yellow.100";
      case "Ultra Rare":
      case "Decisive":
        return "pink.100";
      default:
        if (isDev()) {
          throw new Error(`Custom: Unknown Ship Rarity: "${ship.rarity}"`);
        }
        return "white";
    }
  }

  // TODO: extract this to pass-able if the time comes...
  function shipCardClickHandler(ship: Ship) {
    setShip(ship);
    setTab(MAIN_TAB_NAMES.RESUME);
    if (onClick) {
      onClick();
    }
  }

  return { shipCardClickHandler, cardColorByRarity };
}
