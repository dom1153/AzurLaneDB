import {
  Box,
  Card,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useAtom, useAtomValue } from "jotai";
import { searchWaitingAtom } from "@/hooks/useFilterPanel";

export default function SearchBox({ textSearchHandler }) {
  const waiting = useAtomValue(searchWaitingAtom);

  return (
    <Card p={"2"} position={"sticky"} top="0" zIndex={1000}>
      <InputGroup>
        <Input
          placeholder="filter ship names"
          variant={"filled"}
          onChange={(e) => textSearchHandler(e.target.value)}
        />
        <InputRightElement>
          <Spinner display={waiting ? "auto" : "none"} />
        </InputRightElement>
      </InputGroup>
    </Card>
  );
}
