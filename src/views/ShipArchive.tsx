import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import {
  HStack,
  Input,
  Center,
  Grid,
  Stack,
  Card,
  Text,
  Box,
} from "@chakra-ui/react";

import * as Assets from "@/assets/asset_index";

import { fullShipListAtom } from "@/hooks/useGlobals";

import FilterButton from "@/components/shiparchive/FilterButton";
import ShipCard from "@/components/shiparchive/ShipCard";

export default function BrowseSearch() {
  const ships = useAtomValue(fullShipListAtom);
  const { shipGirls, textSearchHandler } = useShipArchive(ships);

  if (!ships) {
    return <Text>No ships found</Text>;
  }

  return (
    <>
      <Box
        bgImage={Assets.technology_bg}
        bgPosition="center"
        bgRepeat={"repeat"}
        // bgRepeat="no-repeat"
        // bgClip={"unset"}
        // bgSize={"cover"}
        // bgSize={"contain"}
        backgroundAttachment={"local, scroll"}
        // overflow={"unset"}
        // w={"100vw"}
        p={"2"}
      >
        <Center>
          <Stack maxW={"container.md"}>
            <Card p={"2"} position={"sticky"} top="0" zIndex={1000}>
              <HStack>
                <Input
                  placeholder="filter ship names"
                  margin={"sm"}
                  // bg={"white"}
                  variant={"filled"}
                  onChange={(e) => textSearchHandler(e.target.value)}
                  // colorScheme="blue"
                />
                <FilterButton />
              </HStack>
            </Card>
            {/* TODO: dynamically set grid size */}
            <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
              {ships &&
                ships.map((ship, i) => (
                  <ShipCard
                    key={ship.id}
                    ship={ship}
                    displayMode={shipGirls[i]}
                  />
                ))}
            </Grid>
          </Stack>
        </Center>
      </Box>
    </>
  );
}

export const useShipArchive = (ships) => {
  let ALL_VISIBLE = [];
  const CARD_DISPLAY = "flex";
  const [shipGirls, setShipGirls] = useState(ALL_VISIBLE);
  useEffect(() => {
    // VVV hacky for sure...
    search("");
  }, []);

  useEffect(() => {
    // make all ships visible
    if (ships) {
      ALL_VISIBLE = ships.map(() => CARD_DISPLAY);
    }
  }, [ships]);

  function search(i) {
    if (i != "") {
      setShipGirls(
        ships.map((s) =>
          s.names.en.toLowerCase().includes(i) ? CARD_DISPLAY : "none"
        )
      );
    } else {
      setShipGirls(ALL_VISIBLE);
    }
  }

  return { shipGirls, textSearchHandler: search };
};

// function useShipUtils(): { changeResumeShip: any; changeMainTab: any } {
//   throw new Error("Function not implemented.");
// }
