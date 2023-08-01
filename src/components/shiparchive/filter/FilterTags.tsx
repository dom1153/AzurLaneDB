import { Box } from "@chakra-ui/react";
import { atom, useAtomValue } from "jotai";

import filterData from "@/components/shiparchive/filter/FilterData.json";

import CustomRadioGroup from "@/components/shiparchive/filter/radio/CustomRadioGroup";
// import { filterAtom, sortModeAtom } from "@/hooks/useShipArchive";

// const localSortAtom = atom(filterData.sortGroup.default);

export default function FilterTags() {
  // let sortValue = useAtomValue(sortModeAtom);
  // let lastFilterValue = useAtomValue(filterAtom);

  return <Box></Box>;
}

// <CustomRadioGroup
//   options={filterData.sortGroup.options}
//   groupName={filterData.sortGroup.groupName}
//   defaultValue={sortValue}
//   valueAtom={localSortAtom}
// />
