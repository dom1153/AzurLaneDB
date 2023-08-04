import { HStack, Box, useColorMode, Grid } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

import * as Assets from "@/assets/asset_index";

import { visibleShipCardsAtom } from "@/hooks/useFilterPanel";

import SearchFilterPanel from "@components/shiparchive/filter/SearchFilterPanel";
import ShipCardGallery from "@components/shiparchive/ShipCardGallery";

export default function ShipArchive() {
  let shipCardMeta = useAtomValue(visibleShipCardsAtom);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        bgImage={Assets.technology_bg}
        bgPosition="center"
        bgColor={"blue.300"}
        bgRepeat="no-repeat"
        bgSize={"cover"}
        h="100%"
      >
        <Grid
          templateColumns={"repeat(2, minmax(10px, 1fr))"}
          p="2"
          h="100%"
          w={"container.xl"}
          maxH="inherit"
          bgColor={colorMode === "light" ? "blue.400" : "gray.800"}
        >
          <SearchFilterPanel />
          <ShipCardGallery shipListMeta={shipCardMeta} />
        </Grid>
      </Box>
    </>
  );
}
