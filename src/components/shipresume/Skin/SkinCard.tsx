import { Tooltip, Box, Image } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

import Globals from "@/hooks/useGlobals";

// img === skin
export function SkinCard({ img, idx, alt = false }) {
  const { onClickHandler } = useSkinCard();

  return alt ? (
    <>
      <Box onClick={() => onClickHandler(idx)}>
        <Tooltip label={`${img.name}`}>
          <Image
            src={2 in img.info.icons && img.info.icons[2].url}
            bgColor={"gray.200"}
            border={"1px"}
            loading="lazy"
          />
        </Tooltip>
      </Box>
    </>
  ) : (
    <Box maxW="sm" onClick={() => onClickHandler(idx)}>
      <Tooltip label={`${img.name}`}>
        <Image src={img.image} objectFit={"cover"} loading="lazy" />
      </Tooltip>
    </Box>
  );
}

function useSkinCard() {
  const setSkin = useSetAtom(Globals.resumeSkinAtom);

  function onClickHandler(idx) {
    setSkin(idx);
  }

  return { onClickHandler };
}
