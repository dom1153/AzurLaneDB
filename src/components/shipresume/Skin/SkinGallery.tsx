import { Grid, Stack } from "@chakra-ui/react";

import { SkinCard } from "@components/shipresume/Skin/SkinCard";

const alt = true;

export function SkinGallery({ ship }) {
  if (!ship) return <></>;

  return alt ? (
    <>
      <Stack overflowY={"auto"} maxH="container.sm" align={"flex-start"}>
        {ship.skins.map((g, i) => (
          <SkinCard key={`${ship.id}_skin_${i}`} img={g} idx={i} alt={alt} />
        ))}
      </Stack>
    </>
  ) : (
    <>
      <Grid templateColumns={"repeat(5, 1fr)"} gap="8px">
        {ship.skins.map((g, i) => (
          <SkinCard key={`${ship.id}_skin_${i}`} img={g} idx={i} alt={alt} />
        ))}
      </Grid>
    </>
  );
}
