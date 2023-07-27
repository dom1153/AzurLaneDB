import { Text, Box, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Ship } from "@azurapi/azurapi/build/types/ship";

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
      <Box position={"relative"}>
        <Image
          src={chibiURL}
          position={"absolute"}
          right="0"
          top="0"
          loading="eager"
        />
        {isFancyPortraitPosition ? (
          <Image
            src={skinURL}
            objectFit={"none"}
            overflow={"unset"}
            // overflow={"cover"}
            zIndex={"-1000"}
            align={"center"}
            loading="eager"
          />
        ) : (
          <Image src={skinURL} loading="eager" bgImage={bgURL} />
        )}
      </Box>
    </>
  );
}

function usePortrait(ship: Ship, skinId: number) {
  // need: background url, chibi url, isFancy, and skinURL, based on ship and skin input

  const isFancyPortraitPosition = false;
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
