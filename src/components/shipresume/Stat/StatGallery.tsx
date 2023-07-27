import { Grid, Heading } from "@chakra-ui/react";

import * as AttrIcons from "@/assets/asset_index.js";

import { StatCard } from "@components/shipresume/Stat/StatCard";

export function StatGallery({ ship }) {
  if (!ship) return <></>;
  // VVV may need to become state....
  const stats = ship.stats.level120;

  return (
    <>
      <Heading>Level 120</Heading>
      <Grid templateColumns={"repeat(3, 1fr)"} gap="6">
        <StatCard header="HP" body={stats.health} icon={AttrIcons.attr_hp} />
        <StatCard
          header="Armor"
          body={stats.armor}
          icon={AttrIcons.attr_armor}
        />
        <StatCard header="RL" body={stats.reload} icon={AttrIcons.attr_rld} />
        <StatCard header="FP" body={stats.firepower} icon={AttrIcons.attr_fp} />
        <StatCard header="TP" body={stats.torpedo} icon={AttrIcons.attr_trp} />
        <StatCard header="EV" body={stats.evasion} icon={AttrIcons.attr_eva} />
        <StatCard header="AA" body={stats.antiair} icon={AttrIcons.attr_aa} />
        <StatCard header="AV" body={stats.aviation} icon={AttrIcons.attr_av} />
        <StatCard
          header="Cost"
          body={stats.oilConsumption}
          icon={AttrIcons.attr_cost}
        />
        <StatCard
          header="ASW"
          body={stats.antisubmarineWarfare}
          icon={AttrIcons.attr_asw}
        />
      </Grid>
    </>
  );
}
