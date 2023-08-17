import { Tooltip, Link, Image, useDisclosure } from "@chakra-ui/react";

export function ArtworkCard({ ship, img, id, onClick }) {
  return (
    <Tooltip label={img.description}>
      <Image
        src={img.url}
        objectFit={"cover"}
        loading="lazy"
        onClick={() => onClick(img)}
      />
    </Tooltip>
  );
}

function onClickHandler() {}
