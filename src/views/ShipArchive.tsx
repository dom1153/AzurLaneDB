import {
  HStack,
  Input,
  Center,
  Stack,
  Card,
  Text,
  Box,
} from "@chakra-ui/react";

import * as Assets from "@/assets/asset_index";

import { useShipArchive } from "@/hooks/useShipArchive";

import ShipCardGallery from "@components/shiparchive/ShipCardGallery";
import FilterButton from "@components/shiparchive/filter/FilterButton";

export default function BrowseSearch() {
  const { textSearchHandler, shipListMeta, ships, filterButtonHandler } =
    useShipArchive();

  if (!ships) {
    return <Text>No ships provided</Text>;
  }

  return (
    <>
      <Box
        bgImage={Assets.technology_bg}
        bgPosition="center"
        // bgRepeat={"repeat"}
        bgRepeat="no-repeat"
        // bgClip={"unset"}
        bgSize={"cover"}
        // bgSize={"contain"}
        backgroundAttachment={"local, scroll"}
        // overflow={"unset"}
        // w={"100vw"}
        p={"2"}
        h={"container.md"}
      >
        <Center>
          <Stack w={"container.md"}>
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
                <FilterButton onConfirmHandler={filterButtonHandler} />
              </HStack>
            </Card>
            {/* TODO: dynamically set grid size */}
            <ShipCardGallery shipListMeta={shipListMeta} />
          </Stack>
        </Center>
      </Box>
    </>
  );
}

// function useShipUtils(): { changeResumeShip: any; changeMainTab: any } {
//   throw new Error("Function not implemented.");
// }
