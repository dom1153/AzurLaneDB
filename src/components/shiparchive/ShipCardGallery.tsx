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
        templateColumns={"repeat(6, 1fr)"}
        gap={6}
        overflowY={"scroll"}
        maxH={"container.sm"}
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
