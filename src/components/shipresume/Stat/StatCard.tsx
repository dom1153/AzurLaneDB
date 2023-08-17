import { Flex, Text, Box, Image } from "@chakra-ui/react";

export function StatCard({ header, body, icon = null }) {
  if (icon) {
    return (
      <>
        <Flex fontSize={"sm"} bg={"red.100"}>
          <Box bg={"black"} p={"2"}>
            <Image src={icon} boxSize={"20px"} />
          </Box>
          <Flex
            justifyContent={"space-between"}
            bg={"gray"}
            textColor={"white"}
            p={"2"}
            flex={"1"}
          >
            <Text as="b">{header}</Text>
            <Text>{body}</Text>
          </Flex>
        </Flex>
      </>
    );
  } else
    return (
      <Flex fontSize={"sm"}>
        <Text bg={"black"} textColor={"white"} as="b" p={"2"}>
          {header}
        </Text>
        <Box bg={"gray"} textColor={"white"} p={"2"}>
          {body}
        </Box>
      </Flex>
    );
}
