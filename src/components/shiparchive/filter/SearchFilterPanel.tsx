import { Stack } from "@chakra-ui/react";

import Globals from "@/hooks/useGlobals";
import useFilterPanel from "@/hooks/useFilterPanel";
import SearchBox from "@components/shiparchive/filter/search/SearchBox";
import TagContainer from "@components/shiparchive/filter/tags/TagContainer";

export default function SearchFilterPanel() {
  const { textSearchHandler } = useFilterPanel();

  return (
    <Stack overflowY={"auto"} sx={Globals.scrollbarCss} h="100%">
      <SearchBox textSearchHandler={textSearchHandler} />
      <TagContainer />
    </Stack>
  );
}
