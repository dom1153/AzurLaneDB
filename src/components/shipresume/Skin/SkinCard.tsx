import { Tooltip, Box, Image } from "@chakra-ui/react";
import { useSetAtom } from "jotai";

import { useNyi } from "@/hooks/useDevTools";
import { resumeSkinAtom } from "@/hooks/useGlobals";

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
  const nyi = useNyi();
  const setSkin = useSetAtom(resumeSkinAtom);

  function onClickHandler(idx) {
    // nyi();
    setSkin(idx);
    // setSkin(s);
  }

  return { onClickHandler };
}
