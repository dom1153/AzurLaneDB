import { Grid, Text, Box } from "@chakra-ui/react";
import * as AttrIcons from "@/assets/asset_index.js";
import { InfoTabs } from "@components/shipresume/InfoTabs";
import { Portrait } from "@components/shipresume/Portrait/Portrait";
import { Ship } from "@azurapi/azurapi/build/types/ship";
import { atom, useAtomValue } from "jotai";
import { useEffect } from "react";

const resumeShip: Ship = null;
const resumeSkin: number = 0;
const resumeBG: string = AttrIcons.detail_bg_gray;

export const resumeShipAtom = atom(resumeShip);
export const resumeSkinAtom = atom(resumeSkin);
export const resumeBGAtom = atom(resumeBG);

export default function ShipResume() {
  const { ship, skinId, bgUrl } = useShipResume();

  if (!ship) {
    return <Text>No ship found</Text>;
  }

  return (
    <>
      <Box
        bgImage={`url('${bgUrl}')`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgClip={"unset"}
        bgSize={"cover"}
        height={"container.lg"}
        backgroundAttachment={"fixed"}
        overflow={"unset"}
        p={"2"}
      >
        <Grid templateColumns={"repeat( 2, 1fr)"}>
          <Portrait ship={ship} skinId={skinId} />
          <InfoTabs ship={ship} />
        </Grid>
      </Box>
    </>
  );
}

function useShipResume() {
  // leave the resume to handle resume things...
  // outside functions should only just set the ship

  const ship = useAtomValue(resumeShipAtom);
  const skinId = useAtomValue(resumeSkinAtom);
  const bgUrl = useAtomValue(resumeBGAtom);

  // TODO: remove; delegate to children
  useEffect(() => {
    if (ship) {
      // // setSkin(ship.skins[0]);
      // let { level_background } = parseShipDetails(ship);
      // setBG(level_background);
    }
  }, [ship]);

  // TODO: remove this code and move to portrait
  function parseShipDetails(ship) {
    let level_background = AttrIcons.detail_bg_gray;
    let rarity = ship.rarity.toLowerCase();
    switch (rarity) {
      case "common":
        level_background = AttrIcons.detail_bg_gray;
        break;
      case "rare":
        level_background = AttrIcons.detail_bg_blue;
        break;
      case "elite":
        level_background = AttrIcons.detail_bg_purp;
        break;
      case "super rare":
        level_background = AttrIcons.detail_bg_gold;
        break;
      case "priority":
        level_background = AttrIcons.detail_bg_gold_pr;
        break;
      case "ultra rare":
        level_background = AttrIcons.detail_bg_gay;
        break;
      case "decisive":
        level_background = AttrIcons.detail_bg_gay_pr;
        break;
      default:
        console.log("DEBUG: ship rarity not matched -> ", ship.rarity);
        break;
    }

    return { level_background };
  }

  return { ship, skinId, bgUrl };
}
