import { Tooltip, Box, Image } from "@chakra-ui/react";

import { useNyi } from "@/hooks/useDevTools";

export function SkinCard({ img }) {
  const { onClickHandler } = useSkinCard();

  return (
    <Box maxW="sm" onClick={() => onClickHandler(img)}>
      <Tooltip label={`${img.name}`}>
        <Image src={img.image} objectFit={"cover"} loading="lazy" />
      </Tooltip>
    </Box>
  );
}

function useSkinCard() {
  const nyi = useNyi();

  function onClickHandler(s) {
    nyi();
    // setSkin(s);
  }

  return { onClickHandler };
}
