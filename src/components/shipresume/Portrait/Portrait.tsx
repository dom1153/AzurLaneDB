import { Text, Box, Image, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Ship } from "@azurapi/azurapi/build/types/ship";
import { BLUR_IMAGE } from "@/hooks/useDevTools";

import ShipModal from "@/components/shipresume/ShipModal/ShipModal";

// leave any portrait display logic here, delegation policy
// main resume has enough to do
// if need be allow param override
export function Portrait({ ship, skinId }: PortraitProp) {
  if (!ship) return <Text>Empty</Text>;

  const { skinURL, chibiURL, bgURL, isFancyPortraitPosition } = usePortrait(
    ship,
    skinId
  );

  return (
    <>
      <Box position={"relative"} h="100%">
        <Box position={"absolute"} left="0" top="0">
          <ShipModal />
        </Box>
        <Image
          src={chibiURL}
          position={"absolute"}
          right="0"
          top="0"
          loading="eager"
          zIndex={3}
        />
        {isFancyPortraitPosition ? (
          <Image
            boxSize={"100%"}
            src={skinURL}
            objectFit={"cover"}
            overflow={"unset"}
            zIndex={"-1000"}
            loading="eager"
          />
        ) : (
          <Image
            src={skinURL}
            loading="eager"
            bgImage={bgURL}
            filter={BLUR_IMAGE ? "blur(10px)" : ""}
          />
        )}
      </Box>
    </>
  );
}

function usePortrait(ship: Ship, skinId: number) {
  // need: background url, chibi url, isFancy, and skinURL, based on ship and skin input

  const isFancyPortraitPosition = true;
  const skinURL: string = getSkinUrl(ship, skinId);
  const chibiURL: string = ship.skins[skinId].chibi;
  const bgURL: string = getBGUrl(ship, skinId);

  function getSkinUrl(ship: Ship, skinId: number) {
    // can figure out to allow user input... later...
    const skinInfo = ship.skins[skinId];
    const hasSkinBG = skinInfo.bg;
    return hasSkinBG ? skinInfo.bg : skinInfo.image;
  }

  function getBGUrl(ship: Ship, skinId: number) {
    const skinInfo = ship.skins[skinId];
    // VVV placeholder... need the gay background function later...
    return skinInfo.background;
  }

  return { skinURL, chibiURL, bgURL, isFancyPortraitPosition };
}

// only editor provides warning
interface PortraitProp {
  ship: Ship;
  skinId: number;
}

// can provide runtime warnings! :3
Portrait.propTypes = {
  ship: PropTypes.object,
  skinId: PropTypes.number,
};
