import { Flex, Stack, Heading, Text, Box, Image } from "@chakra-ui/react";

export function SkillCard({ skill }) {
  return (
    <div>
      <Flex bgColor={"blue.100"}>
        <Box boxSize="">
          <Image src={skill.icon} loading="lazy" />
        </Box>
        <Stack>
          <Heading size="md">{skill.names.en}</Heading>
          <Text>{skill.description}</Text>
        </Stack>
      </Flex>
    </div>
  );
}
