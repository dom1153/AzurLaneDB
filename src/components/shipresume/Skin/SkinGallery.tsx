import { Grid } from "@chakra-ui/react";

import { SkinCard } from "@components/shipresume/Skin/SkinCard";

export function SkinGallery({ ship }) {
  if (!ship) return <></>;

  return (
    <>
      <Grid templateColumns={"repeat(5, 1fr)"} gap="8px">
        {ship.skins.map((g, i) => (
          <SkinCard key={`${ship.id}_skin_${i}`} img={g} idx={i} />
        ))}
      </Grid>
    </>
  );
}
