import { Text, Box, Image, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Ship } from "@azurapi/azurapi/build/types/ship";
import Dev from "@/hooks/useDevTools";

import ShipModal from "@/components/shipresume/ShipModal/ShipModal";
import { Suspense, useEffect, useState } from "react";

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
      <Box position={"relative"} h="100%" maxW={"container.sm"}>
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
          // internally this is unsustainable anyways; use p5 and more complicated methods of offsets
          // VVV interal (drag click) is stretched 'box size 100%'
          <Suspense fallback={<Text>Loading...</Text>}>
            <Box
              as="img"
              boxSize={"100%"}
              aspectRatio={"1 / 1"}
              objectFit={"cover"}
              src={skinURL}
              overflow={"unset"}
              zIndex={"-1000"}
              loading="eager"
            />
          </Suspense>
        ) : (
          <Image
            src={skinURL}
            loading="eager"
            // bgImage={bgURL}
            filter={Dev.BLUR_IMAGE ? "blur(10px)" : ""}
          />
        )}
      </Box>
    </>
  );
}

function usePortrait(ship: Ship, skinId: number) {
  // need: background url, chibi url, isFancy, and skinURL, based on ship and skin input
  const [skinUrl, setSkinUrl] = useState("");
  const [chibiUrl, setChibiUrl] = useState("");
  const [bgUrl, setBgUrl] = useState("");

  const isFancyPortraitPosition = true;

  useEffect(() => {
    // avoid race condition with skinId being updated too late
    setSkinUrl(getSkinUrl(ship, skinId));
    setChibiUrl(ship.skins[skinId].chibi);
    setBgUrl(getBGUrl(ship, skinId));
  }, [skinId]);

  useEffect(() => {
    // man this is dumb...
    skinId = 0;
    setSkinUrl(getSkinUrl(ship, skinId));
    setChibiUrl(ship.skins[skinId].chibi);
    setBgUrl(getBGUrl(ship, skinId));
  }, [ship]);

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

  return {
    skinURL: skinUrl,
    chibiURL: chibiUrl,
    bgURL: bgUrl,
    isFancyPortraitPosition,
  };
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
