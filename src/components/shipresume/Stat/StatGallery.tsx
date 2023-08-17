import { Grid, Heading } from "@chakra-ui/react";

import Assets from "@assets/asset_index.js";

import { StatCard } from "@components/shipresume/Stat/StatCard";

export function StatGallery({ ship }) {
  if (!ship) return <></>;
  // VVV may need to become state....
  const stats = ship.stats.level120;

  return (
    <>
      <Heading>Level 120</Heading>
      <Grid templateColumns={"repeat(3, 1fr)"} gap="6">
        <StatCard header="HP" body={stats.health} icon={Assets.attr_hp} />
        <StatCard header="Armor" body={stats.armor} icon={Assets.attr_armor} />
        <StatCard header="RL" body={stats.reload} icon={Assets.attr_rld} />
        <StatCard header="FP" body={stats.firepower} icon={Assets.attr_fp} />
        <StatCard header="TP" body={stats.torpedo} icon={Assets.attr_trp} />
        <StatCard header="EV" body={stats.evasion} icon={Assets.attr_eva} />
        <StatCard header="AA" body={stats.antiair} icon={Assets.attr_aa} />
        <StatCard header="AV" body={stats.aviation} icon={Assets.attr_av} />
        <StatCard
          header="Cost"
          body={stats.oilConsumption}
          icon={Assets.attr_cost}
        />
        <StatCard
          header="ASW"
          body={stats.antisubmarineWarfare}
          icon={Assets.attr_asw}
        />
      </Grid>
    </>
  );
}
