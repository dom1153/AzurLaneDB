import { Tooltip, Link, Image } from "@chakra-ui/react";

export function ArtworkCard(ship, img, id) {
  return (
    <Link
      key={`${ship.names.en}_gal_${id}`}
      href={img.url}
      target="_blank"
      maxW=""
    >
      <Tooltip label={img.description}>
        <Image src={img.url} objectFit={"cover"} loading="lazy" />
      </Tooltip>
    </Link>
  );
}
