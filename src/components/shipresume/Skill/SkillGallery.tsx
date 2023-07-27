import { Stack } from "@chakra-ui/react";

import { SkillCard } from "@components/shipresume/Skill/SkillCard";

export function SkillGallery({ ship }) {
  if (!ship) return <></>;

  return (
    <>
      <Stack>
        {ship.skills.map((skill, i) => (
          <SkillCard key={`${ship.names.en}_skill_${i}`} skill={skill} />
        ))}
      </Stack>
    </>
  );
}
