import { Stack } from "@chakra-ui/react";
import SearchBox from "@components/shiparchive/filter/search/SearchBox";
import TagContainer from "@components/shiparchive/filter/tags/TagContainer";

import useFilterPanel from "@/hooks/useFilterPanel";

import { scrollbarCss } from "@/hooks/useGlobals";

export default function SearchFilterPanel({ ...theRest }) {
  const { textSearchHandler, shipListMeta, ships } = useFilterPanel();
  return (
    <Stack overflowY={"auto"} sx={scrollbarCss} h="100%">
      <SearchBox textSearchHandler={textSearchHandler} />
      <TagContainer />
    </Stack>
  );
}
