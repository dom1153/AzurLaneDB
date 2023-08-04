import { Tag, TagLabel, TagRightIcon, useBoolean } from "@chakra-ui/react";
import { sortModeAtom, sortDirAtom, filterAtom } from "@/hooks/useFilterPanel";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

// will need a callback or an atom...
export default function SingleTag({ option }) {
  const { value, type, label, checked } = option;
  const { isChecked, onClickHandler, dir } = useTag(option);
  return (
    <Tag
      as="button"
      colorScheme={isChecked ? "green" : "red"}
      onClick={onClickHandler}
    >
      <TagLabel>{label}</TagLabel>
      {option.type === "sort" && isChecked && (
        <TagRightIcon as={dir > 0 ? TriangleUpIcon : TriangleDownIcon} />
      )}
    </Tag>
  );
}

function useTag(option) {
  const [isChecked, setIsChecked] = useState(false);
  const [sortMode, setSortMode] = useAtom(sortModeAtom);
  const [dir, setDir] = useAtom(sortDirAtom);
  const [filters, setFilters] = useAtom(filterAtom);

  useEffect(() => {
    // slow...
    // console.log("start", option.label, option.checked);
    // if (option.checked) setIsChecked(true);
  }, [option]);

  useEffect(() => {
    if (option.type === "sort") {
      // console.log("sortMode: ", sortMode, option.value);
      // VVV can't use option.default because of this trait
      setIsChecked(sortMode === option.value);
    }
  }, [sortMode]);

  useEffect(() => {
    if (option.type === "check") {
      // VVV can't use option.default because of this trait
      setIsChecked(filters[option.value]);
    }
  }, [filters]);

  useEffect(() => {}, [filters]);

  // // subscribe to relevant atom
  // // 'should' work as expected
  // switch (option.type) {
  //   case "sort":
  //     break;
  //   case "check":
  //     break;
  //   case "radio":
  //     // case not handled yet
  //     break;
  // }

  function onClickHandler(e) {
    if (option.type == "sort") {
      if (isChecked) {
        setDir(dir * -1);
      } else {
        // setIsChecked(true);
        setSortMode(option.value);
      }
    } else {
      // setIsChecked(!isChecked);
      setFilters({ ...filters, [option.value]: !isChecked });
    }
  }

  // reset if myvalue == false????? via hook

  return { isChecked, onClickHandler, dir };
}
