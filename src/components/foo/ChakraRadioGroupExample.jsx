import * as Cha from "@chakra-ui/react";

function ChakraRadioGroupExample() {
  function CustomRadio(props) {
    const { image, ...radioProps } = props;
    const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
      Cha.useRadio(radioProps);

    return (
      <label {...htmlProps} cursor="pointer">
        <input {...getInputProps({})} hidden />
        <Cha.Box
          {...getRadioProps()}
          bg={state.isChecked ? "green.200" : "transparent"}
          w={12}
          p={1}
          rounded="full"
        >
          <Cha.Image src={image} rounded="full" {...getLabelProps()} />
        </Cha.Box>
      </label>
    );
  }

  const toast = Cha.useToast();

  const avatars = [
    {
      name: "Kat",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Kevin",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
    },
    { name: "Andy", image: "https://randomuser.me/api/portraits/men/29.jpg" },
    {
      name: "Jess",
      image: "https://randomuser.me/api/portraits/women/95.jpg",
    },
  ];

  const handleChange = (value) => {
    toast({
      title: `The value got changed to ${value}!`,
      status: "success",
      duration: 2000,
    });
  };

  const { value, getRadioProps, getRootProps } = Cha.useRadioGroup({
    defaultValue: "Kevin",
    onChange: handleChange,
  });

  return (
    <Cha.Stack {...getRootProps()}>
      <Cha.Text>The selected radio is: {value}</Cha.Text>
      <Cha.HStack>
        {avatars.map((avatar) => {
          return (
            <CustomRadio
              key={avatar.name}
              image={avatar.image}
              {...getRadioProps({ value: avatar.name })}
            />
          );
        })}
      </Cha.HStack>
    </Cha.Stack>
  );
}
