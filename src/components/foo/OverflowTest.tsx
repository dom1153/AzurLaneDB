import { Box, Flex, Text } from "@chakra-ui/react";

import { lorem } from "@/views/Foo";

export default function OverflowTest() {
  return (
    <Flex h="200px" border={"dashed"}>
      {/* VVV overflow does not work on ele w/out height */}
      <Flex
        flexDir={"column"}
        bgColor={"red.100"}
        maxW={"400px"}
        overflowY={"auto"}
      >
        <Text>{lorem()}</Text>
        <Text>{lorem()}</Text>
        <Text>{lorem()}</Text>
        <Text>{lorem()}</Text>
        <Text>{lorem()}</Text>
        <Text>{lorem()}</Text>
        <Text>{lorem()}</Text>
      </Flex>
      <Box>
        <Text>Second item!</Text>
      </Box>
    </Flex>
  );
}
