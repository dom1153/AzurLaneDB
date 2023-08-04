import { useEffect, useState } from "react";
import { Box, Text, Card, Grid } from "@chakra-ui/react";

import { scrollbarCss } from "@/hooks/useGlobals";
import { ShipCardMeta } from "@/hooks/useFilterPanel";
import ShipCard from "@/components/shiparchive/ShipCard";

interface ShipCardGalleryProps {
  shipListMeta: ShipCardMeta[];
  cardClickHandler?: () => void;
}

export default function ShipCardGallery({
  shipListMeta,
  cardClickHandler,
}: ShipCardGalleryProps) {
  const { ShipGrid, NoShipFound, hasVisible } = useShipCardGallery(
    shipListMeta,
    cardClickHandler
  );

  return (
    <Box
      h="100%"
      minH={"100%"}
      maxH="100%"
      overflowY={"auto"}
      sx={scrollbarCss}
      pt="2"
    >
      {hasVisible() ? (
        <ShipGrid shipMetaList={shipListMeta} />
      ) : (
        <NoShipFound />
      )}
    </Box>
  );
}

function useShipCardGallery(shipListMeta: ShipCardMeta[], cardClickHandler) {
  function hasVisible() {
    return shipListMeta.filter((m) => m.show).length > 0;
  }

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
    hasVisible,
  };
}
