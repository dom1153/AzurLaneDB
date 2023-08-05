import { useEffect } from "react";
import { Box, Text, Card, Grid } from "@chakra-ui/react";

import Globals from "@/hooks/useGlobals";
import { ShipCardMeta } from "@/hooks/useFilterPanel";
import ShipCard from "@/components/shiparchive/ShipCard";
import { numVisibleShipCardsAtom } from "@/hooks/useFilterPanel";
import { useAtomValue } from "jotai";

interface ShipCardGalleryProps {
  shipListMeta: ShipCardMeta[];
  cardClickHandler?: () => void;
}

export default function ShipCardGallery({
  shipListMeta,
  cardClickHandler,
}: ShipCardGalleryProps) {
  const { ShipGrid, NoShipFound, visibleCnt } = useShipCardGallery(
    shipListMeta,
    cardClickHandler
  );

  return (
    <Box
      h="100%"
      minH={"100%"}
      maxH="100%"
      overflowY={"auto"}
      sx={Globals.scrollbarCss}
      pt="2"
    >
      {visibleCnt > 0 ? (
        <ShipGrid shipMetaList={shipListMeta} />
      ) : (
        <NoShipFound />
      )}
    </Box>
  );
}

function useShipCardGallery(shipListMeta: ShipCardMeta[], cardClickHandler) {
  const visibleCnt = useAtomValue(numVisibleShipCardsAtom);

  useEffect(() => {}, [shipListMeta]);

  function ShipGrid({ shipMetaList }) {
    return (
      <Grid px={"5"} templateColumns={"repeat(6, 1fr)"} gap={6}>
        {shipMetaList.map((meta) => {
          return (
            <ShipCard
              key={meta.ship.id}
              ship={meta.ship}
              displayMode={meta.show}
              moreInfoSort={meta.moreInfoSort}
              moreInfoFilter={meta.moreInfoFilter}
              onClickHandler={cardClickHandler}
            />
          );
        })}
      </Grid>
    );
  }

  function NoShipFound() {
    return (
      <Card p={"2"} maxW={"fit-content"}>
        <Text>{"No ships match criteria"}</Text>
      </Card>
    );
  }

  return {
    ShipGrid,
    NoShipFound,
    visibleCnt,
  };
}
