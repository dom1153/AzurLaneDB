import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/react";
import { sortModeAtom, sortDirAtom, filterAtom } from "@/hooks/useFilterPanel";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";

type TagOption = {
  value: string;
  type: "sort" | "check" | "radio";
  label: string;
  checked?: "true" | "false";
};

interface SingleTagProps {
  option: TagOption;
}

// will need a callback or an atom...
export default function SingleTag({ option }: SingleTagProps) {
  const { isChecked, onClickHandler, dir } = useTag(option);

  return (
    <Tag
      as="button"
      colorScheme={isChecked ? "green" : "red"}
      onClick={onClickHandler}
    >
      <TagLabel>{option.label}</TagLabel>
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
    if (option.type === "sort") {
      // VVV can't use option.checked because of this trait
      setIsChecked(sortMode === option.value);
    }
  }, [sortMode]);

  useEffect(() => {
    // VVV surely this is ineffecient...
    if (option.type === "check") {
      // VVV can't use option.checked because of this trait
      setIsChecked(filters[option.value]);
    }
  }, [filters]);

  useEffect(() => {}, [filters]);

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

  return { isChecked, onClickHandler, dir };
}
