// import * as Cha from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { lorem } from "../../views/Foo";

export default function LoremDump() {
  return (
    <>
      <Box bg="blue.100" color="black">
        <Text flexGrow={1}>Haha some basic content</Text>
        <Text fontSize={"9xl"}>{lorem()}</Text>
      </Box>
    </>
  );
}
