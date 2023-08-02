import { useEffect, useState } from "react";
import { Box, Text, Card, Grid } from "@chakra-ui/react";

import { scrollbarCss } from "@/hooks/useGlobals";
import { ShipCardMeta } from "@/hooks/useFilterPanel";
import ShipCard from "@/components/shiparchive/ShipCard";

interface ShipCardGalleryProps {
  shipListMeta: ShipCardMeta[];
  onClick?: () => void;
}

export default function ShipCardGallery({
  shipListMeta,
  onClick,
}: ShipCardGalleryProps) {
  const { ShipGrid, NoShipFound, visibleCnt, hasVisible } = useShipCardGallery(
    shipListMeta,
    onClick
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

function useShipCardGallery(shipListMeta: ShipCardMeta[], onClick) {
  let [visibleCnt, setVisibleCnt] = useState([]);

  function hasVisible() {
    return shipListMeta.filter((m) => m.show).length > 0;
  }

  // useEffect(() => {
  //   setVisibleCnt(shipListMeta.filter((m) => m.show));
  // }, [shipListMeta]);

  function ShipGrid({ shipMetaList }) {
    return (
      <Grid px={"5"} templateColumns={"repeat(6, 1fr)"} gap={6}>
        {shipMetaList.map((meta) => {
          return (
            <ShipCard
              key={meta.ship.id}
              ship={meta.ship}
              displayMode={meta.show}
              moreInfo={meta.moreInfo}
              onClick={onClick}
            />
          );
        })}
      </Grid>
    );
  }

  function NoShipFound() {
    return (
      <Card p={"2"}>
        <Text>{"No ships match criteria"}</Text>
      </Card>
    );
  }

  return {
    ShipGrid,
    NoShipFound,
    visibleCnt,
    hasVisible,
  };
}
