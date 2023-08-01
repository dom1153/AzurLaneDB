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
import FilterPanel from "@components/shiparchive/filter/FilterPanel";

export default function ShipArchive() {
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
        bgColor={"blue.300"}
        bgRepeat="no-repeat"
        bgSize={"cover"}
        p={"2"}
      >
        <HStack w={"container.lg"} px="2">
          <FilterPanel
            textSearchHandler={textSearchHandler}
            filterButtonHandler={filterButtonHandler}
          />
          <ShipCardGallery shipListMeta={shipListMeta} />
        </HStack>
      </Box>
    </>
  );
}
