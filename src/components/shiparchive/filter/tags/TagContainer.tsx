import { Box, HStack, Heading, Stack } from "@chakra-ui/react";
import { atom, useAtomValue } from "jotai";

import filterData from "@/data/FilterData.json";

import CustomRadioGroup from "@/components/shiparchive/filter/radio/CustomRadioGroup";
import SingleTag from "@/components/shiparchive/filter/tags/SingleTag";

export default function TagContainer() {
  return (
    <Stack maxW={"container.sm"} spacing={"5"}>
      {Object.values(filterData).map((section) => (
        <HeaderTagCombo key={`section_${section.label}`} data={section} />
      ))}
    </Stack>
  );
}

function HeaderTagCombo({ data }) {
  return (
    <>
      <Stack>
        <Heading textAlign={"left"} size={"lg"}>
          {data.label}
        </Heading>
        <HStack flexWrap={"wrap"}>
          {data.options.map((option) => (
            <SingleTag key={option.value} option={option} />
          ))}
        </HStack>
      </Stack>
    </>
  );
}
