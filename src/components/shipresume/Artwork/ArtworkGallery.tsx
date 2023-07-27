import { Grid } from "@chakra-ui/react";
import { ArtworkCard } from "@components/shipresume/Artwork/ArtworkCard";

export function ArtworkGallery({ ship }) {
  if (!ship) return <></>;
  return (
    <>
      <Grid templateColumns={"repeat(5, 1fr)"} gap="8px">
        {ship.gallery.map((g, i) => ArtworkCard(ship, g, i))}
      </Grid>
    </>
  );
}
