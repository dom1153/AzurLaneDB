import { Text } from "@chakra-ui/react";

export function MetaDump({ ship }) {
  const str = JSON.stringify(ship, null, " ");
  if (!ship) return <></>;
  return (
    <>
      <Text
        as="pre"
        maxW={"container.sm"}
        maxH="container.sm"
        whiteSpace={"pre-wrap"}
        wordBreak={"break-all"}
        overflowY={"scroll"}
        textAlign={"left"}
        fontSize={"xs"}
      >
        {str}
      </Text>
    </>
  );
}
