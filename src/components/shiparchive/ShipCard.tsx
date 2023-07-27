import { Center, Image, Card, Text } from "@chakra-ui/react";
import { useSetAtom } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import { MAIN_TAB_NAMES } from "@/hooks/useGlobals";

import { mainTabIndexAtom } from "@components/MainTab";
import { resumeShipAtom } from "@/views/ShipResume";

export default function ShipCard({ ship, displayMode }) {
  const { shipCardClickHandler } = useShipCard();

  return (
    <Card
      key={ship.id}
      display={displayMode}
      variant={"outline"}
      // bg={"blue.100"}
      onClick={() => shipCardClickHandler(ship)}
    >
      <Image src={ship.thumbnail} />
      <Center>
        <Text
          //   fontSize={"3xs"}
          whiteSpace={"nowrap"}
          overflow={"clip"}
          textOverflow={"ellipsis"}
        >
          {ship.names.en}
        </Text>
      </Center>
    </Card>
  );
}

function useShipCard() {
  const setShip = useSetAtom(resumeShipAtom);
  const setTab = useSetAtom(mainTabIndexAtom);

  function shipCardClickHandler(ship: Ship) {
    setShip(ship);
    setTab(MAIN_TAB_NAMES.RESUME);
  }
  return { shipCardClickHandler };
}

// {/* <Text fontSize={"3xs"}>Universal Bulin</Text> */}
// {/* <Link fontSize={"3xs"} href={ship.wikiUrl}> */}
// {false && (
//   <marquee behavior="" direction="" scrolldelay="">
//     {ship.names.en}
//   </marquee>
// )}
