import { Card, Input } from "@chakra-ui/react";

export default function SearchBox({ textSearchHandler }) {
  return (
    <Card p={"2"} position={"sticky"} top="0" zIndex={1000}>
      <Input
        placeholder="filter ship names"
        margin={"sm"}
        variant={"filled"}
        onChange={(e) => textSearchHandler(e.target.value)}
      />
    </Card>
  );
}
