import { Box, Card, HStack, Input, Stack } from "@chakra-ui/react";
import FilterButton from "@/components/shiparchive/filter/FilterButton";
import SearchBox from "@/components/shiparchive/filter/SearchBox";
import FilterTags from "@/components/shiparchive/filter/FilterTags";

// <FilterButton onConfirmHandler={filterButtonHandler} />

export default function FilterPanel({
  textSearchHandler,
  filterButtonHandler,
}) {
  return (
    <Stack w="container.md" bgColor={"blue.400"} p="2">
      <SearchBox textSearchHandler={textSearchHandler} />
      <FilterTags />
    </Stack>
  );
}
