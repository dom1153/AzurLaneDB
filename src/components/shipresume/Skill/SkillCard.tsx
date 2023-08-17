import Dev from "@/hooks/useDevTools";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Box,
  Image,
  HStack,
  Card,
  Highlight,
} from "@chakra-ui/react";

const other = true;

export function SkillCard({ skill }) {
  return other ? (
    <HStack flexDir={"row"} bgColor={"gray.200"} p="2" rounded={"md"} h="150px">
      <Image
        src={skill.icon}
        loading="lazy"
        boxSize={"max-content"}
        alignSelf={"flex-start"}
      />
      <Stack overflowY={"auto"} h="inherit" p={"2"}>
        <Heading size="md" textAlign={"left"}>
          {skill.names.en}
        </Heading>
        <Text overflowY={"auto"} textAlign={"left"} overflowWrap={"break-word"}>
          {skill.description}
        </Text>
      </Stack>
    </HStack>
  ) : (
    <>
      <HStack flexDir={"row"} bgColor={"gray.200"} p="2" rounded={"md"}>
        <Stack>
          <HStack justifyContent={"space-between"}>
            <Heading size="lg" textAlign={"left"} alignSelf={"flex-end"}>
              {skill.names.en}
            </Heading>
            <Image src={skill.icon} loading="lazy" boxSize={"100px"} />
          </HStack>
          <Text overflowY={"auto"} textAlign={"left"}>
            <Highlight query={"/ab+c/"}>{skill.description}</Highlight>
          </Text>
        </Stack>
      </HStack>
    </>
  );
}
