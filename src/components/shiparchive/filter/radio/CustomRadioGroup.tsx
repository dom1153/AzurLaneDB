import { Text, HStack, useRadioGroup } from "@chakra-ui/react";

import RadioCard from "@/components/shiparchive/filter/radio/RadioCard";
import { Atom, useSetAtom } from "jotai";

export interface radioKV {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: radioKV[];
  defaultValue: string;
  groupName: radioKV;
  valueAtom: Atom;
}

// 1. Create a component that consumes the `useRadio` hook
// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.

// TODO: support option nesting for groups of radio buttons
export default function CustomRadioGroup({
  options,
  defaultValue,
  groupName,
  valueAtom,
}: RadioGroupProps) {
  if (!options) {
    return <>No options passesd</>;
  }
  // const options = ["react", "vue", "svelte"];
  const setVal = useSetAtom(valueAtom);

  function onChange(value) {
    console.log(value);
    setVal(value);
  }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: groupName.value,
    defaultValue: defaultValue,
    onChange: onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      <Text>{`${groupName.label}`}:</Text>
      {options.map(({ value, label }) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {label}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
