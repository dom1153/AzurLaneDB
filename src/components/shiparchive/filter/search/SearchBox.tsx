import { Box, Card, Input } from "@chakra-ui/react";

export default function SearchBox({ textSearchHandler }) {
  return (
    <Box p={"2"} position={"sticky"} top="0" zIndex={1000}>
      <Input
        placeholder="filter ship names"
        variant={"filled"}
        onChange={(e) => textSearchHandler(e.target.value)}
      />
    </Box>
  );
}
