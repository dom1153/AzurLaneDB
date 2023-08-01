import { Text } from "@chakra-ui/react";

export function MetaDump({ ship }) {
  const str = JSON.stringify(ship, null, " ");
  if (!ship) return <></>;
  return (
    <>
      <Text as="pre">{str}</Text>
    </>
  );
}
