import { Grid, Text, Box } from "@chakra-ui/react";
import { atom, useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import useAzurApi from "@/hooks/useAzurApi";

import Globals from "@/hooks/useGlobals";
import * as AttrIcons from "@/assets/asset_index.js";
import { InfoTabs } from "@components/shipresume/InfoTabs";
import { Portrait } from "@components/shipresume/Portrait/Portrait";
import { Ship } from "@azurapi/azurapi/build/types/ship";

export default function ShipResume() {
  const { ship, skinId, bgUrl } = useShipResume();

  if (!ship) return <></>;

  return (
    <>
      <Box
        bgImage={`url('${bgUrl}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgClip={"unset"}
        bgSize={"cover"}
        backgroundAttachment={"fixed"}
        p={"2"}
        h="inherit"
      >
        <Grid
          templateColumns={"repeat(2, minmax(10px, 1fr))"}
          h="inherit"
          w={"container.xl"}
          maxH="inherit"
        >
          {ship ? (
            <>
              <Portrait ship={ship} skinId={skinId} />
              <InfoTabs ship={ship} />
            </>
          ) : (
            <Text>Please Wait...</Text>
          )}
        </Grid>
      </Box>
    </>
  );
}

function useShipResume() {
  // leave the resume to handle resume things...
  // outside functions should only just set the ship

  const ship = useAtomValue(Globals.resumeShipAtom);
  const [skinId, setSkinId] = useAtom(Globals.resumeSkinAtom);
  const [bgUrl, setBgUrl] = useState(AttrIcons.detail_bg_gray);

  // TODO: remove; delegate to children
  useEffect(() => {
    // console.log("yeah ship: ", ship);
    if (ship) {
      setSkinId(0);
      // setSkin(ship.skins[0]);
      // let { level_background } = parseShipDetails(ship);
      // setBG(level_background);
    }
  }, [ship]);

  // TODO: remove this code and move to portrait
  // function parseShipDetails(ship) {
  //   let level_background = AttrIcons.detail_bg_gray;
  //   let rarity = ship.rarity.toLowerCase();
  //   switch (rarity) {
  //     case "common":
  //       level_background = AttrIcons.detail_bg_gray;
  //       break;
  //     case "rare":
  //       level_background = AttrIcons.detail_bg_blue;
  //       break;
  //     case "elite":
  //       level_background = AttrIcons.detail_bg_purp;
  //       break;
  //     case "super rare":
  //       level_background = AttrIcons.detail_bg_gold;
  //       break;
  //     case "priority":
  //       level_background = AttrIcons.detail_bg_gold_pr;
  //       break;
  //     case "ultra rare":
  //       level_background = AttrIcons.detail_bg_gay;
  //       break;
  //     case "decisive":
  //       level_background = AttrIcons.detail_bg_gay_pr;
  //       break;
  //     default:
  //       console.log("DEBUG: ship rarity not matched -> ", ship.rarity);
  //       break;
  //   }

  // return { level_background };
  // }

  return { ship, skinId, bgUrl };
}
