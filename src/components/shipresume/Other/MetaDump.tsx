import { Text } from "@chakra-ui/react";

export function MetaDump({ ship }) {
  const str = JSON.stringify(ship, null, " ");
  // console.log(str, str.length);
  if (!ship) return <></>;
  return (
    <>
      <Text as="pre">{str}</Text>
    </>
  );
}
