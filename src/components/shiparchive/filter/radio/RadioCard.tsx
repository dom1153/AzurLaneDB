import { Tag, useRadio } from "@chakra-ui/react";

export default function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <label>
      <input {...input} />
      <Tag
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "black",
          color: "white",
          borderColor: "black",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={2}
        py={2}
      >
        {props.children}
      </Tag>
    </label>
  );
}
