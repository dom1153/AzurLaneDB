import { Tooltip, Box, Image } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

import Globals from "@/hooks/useGlobals";

export function SkinCard({ img, idx }) {
  const { onClickHandler } = useSkinCard();

  return (
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
