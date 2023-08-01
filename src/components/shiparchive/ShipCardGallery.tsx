import { Text, Card, Center, Grid } from "@chakra-ui/react";

import ShipCard from "@/components/shiparchive/ShipCard";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";

let visibleAtom = atom([]);

export default function ShipCardGallery({ shipListMeta }) {
  let [visibleCnt, setVisible] = useAtom(visibleAtom);

  useEffect(() => {
    setVisible(shipListMeta.filter((m) => m.show));
  }, []);

  useEffect(() => {
    setVisible(shipListMeta.filter((m) => m.show));
  }, [shipListMeta]);

  if (visibleCnt.length > 0) {
    return (
      <Grid
        px={"5"}
        templateColumns={"repeat(6, 1fr)"}
        gap={6}
        h="container.sm"
        overflowY={"auto"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            width: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "white",
            borderRadius: "24px",
          },
        }}
      >
        {shipListMeta.map((meta) => {
          return (
            <ShipCard
              key={meta.ship.id}
              ship={meta.ship}
              displayMode={meta.show}
              moreInfo={meta.moreInfo}
            />
          );
        })}
      </Grid>
    );
  } else {
    return (
      <Center>
        <Card p={"2"}>
          <Text>{"No ships match criteria ;) "}</Text>
        </Card>
      </Center>
    );
  }
}
