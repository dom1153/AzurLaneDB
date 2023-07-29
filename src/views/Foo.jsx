import { useEffect, useState } from "react";
// VVV ugly af but great for testing!!! jaja
import * as Cha from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

import { useNyi } from "@/hooks/useDevTools";

import essexShipResume from "@src/data/essex.json";

// for testing new concepts
export default function Foo({ children }) {
  useEffect(() => {}, []);

  return (
    <>
      <Cha.Stack>
        <Cha.Box>
          <Cha.Button>Test</Cha.Button>
        </Cha.Box>
        <MyToggleGroup />
        <ChakraRadioGroupExample />
        <RadioGroupBasic />
      </Cha.Stack>
    </>
  );
}

function RadioGroupBasic() {
  const [value, setValue] = useState("1");

  function RadioButton({ v, t }) {
    return (
      <>
        <Cha.Radio bg="gray.100" value={v} mr="5">
          <Cha.Box bg={"blue.100"} p="2" rounded={"lg"}>
            {t}
          </Cha.Box>
        </Cha.Radio>
      </>
    );
  }

  return (
    <>
      <Cha.Box bg={"white"}>
        <input type="radio" value="test" />
        <Cha.RadioGroup onChange={setValue} value={value}>
          <Cha.Stack direction="row">
            <RadioButton v="1" t="First" />
            <RadioButton v="2" t="Second" />
            <RadioButton v="3" t="Third" />
          </Cha.Stack>
        </Cha.RadioGroup>
      </Cha.Box>
    </>
  );
}
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

function MyToggleGroup() {
  const buttonList = [
    {
      label: "Name",
    },
    {
      label: "Id",
    },
    {
      label: "Rarity",
    },
  ];

  const handleOnChange = (v) => {
    console.log(`${v} got clicked`);
  };

  const { value, getRadioProps, getRootProps } = Cha.useRadioGroup({
    defaultValue: "Name",
    onChange: handleOnChange,
  });

  return (
    <>
      <Cha.Center>
        <Cha.HStack {...getRootProps()}>
          <Cha.Text>{"Sort: "}</Cha.Text>
          <Cha.HStack>
            {buttonList.map((b) => (
              <ToggleButton
                key={b.label}
                lbl={b.label}
                {...getRadioProps({ value: b.label })}
              />
            ))}
          </Cha.HStack>
        </Cha.HStack>
      </Cha.Center>
    </>
  );

  function ToggleButton(props) {
    const { lbl, ...radioProps } = props;
    const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
      Cha.useRadio(radioProps);

    return (
      <label {...htmlProps}>
        <input {...getInputProps({})} hidden />
        <Cha.Box
          {...getRadioProps()}
          bg={state.isChecked ? "red" : "blue"}
          rounded={"lg"}
          fontWeight={"bold"}
        >
          <Cha.Text
            {...getLabelProps()}
            // colorScheme={state.isChecked ? "green" : "red"}
            // colorScheme={"green"}
            p="2"
            m="1"
          >
            {props.lbl}
          </Cha.Text>
        </Cha.Box>
      </label>
    );
  }
}

function ToastAlert() {
  const nyi = useNyi();
  return <Cha.Button onClick={() => nyi()}>Show Toast</Cha.Button>;
}

function LoremDump() {
  return (
    <>
      <Cha.Box
        bg="blue.100"
        color="black"
        // h="xl"
        // h="100%"
        // overflowY={"scroll"}
      >
        <Cha.Text flexGrow={1}>Haha some basic content</Cha.Text>
        <Text fontSize={"9xl"}>{lorem()}</Text>
      </Cha.Box>
      {/* <Text>Test Component</Text>
      <Cha.Button /> */}
    </>
  );
}

// VVV these aren't exported, so they aren't taking extra memory when this file is imported
function fetchShipJson() {
  fetch(
    "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
  )
    .then((result) => {
      console.log("A: ", result);
      return result.json();
    })
    .then(
      (result) => {
        console.log("B: ", result);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
}

function lorem() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus urna duis convallis convallis tellus id. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum posuere. Facilisi etiam dignissim diam quis. Maecenas accumsan lacus vel facilisis. Adipiscing bibendum est ultricies integer quis auctor elit. Arcu non sodales neque sodales ut etiam sit amet nisl. Placerat vestibulum lectus mauris ultrices eros in cursus turpis. Nam at lectus urna duis convallis. Ipsum dolor sit amet consectetur adipiscing elit duis. Non diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Commodo elit at imperdiet dui accumsan. Fermentum iaculis eu non diam phasellus vestibulum lorem sed risus. Eros in cursus turpis massa tincidunt dui ut ornare lectus. Lectus magna fringilla urna porttitor rhoncus. Mus mauris vitae ultricies leo integer malesuada nunc.  Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Laoreet sit amet cursus sit amet dictum sit amet justo. Non quam lacus suspendisse faucibus. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Aliquam sem et tortor consequat id porta nibh venenatis cras. Duis ut diam quam nulla. Enim diam vulputate ut pharetra sit amet aliquam. Eget mi proin sed libero enim sed. Cursus sit amet dictum sit amet justo donec. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Penatibus et magnis dis parturient montes nascetur ridiculus. Orci porta non pulvinar neque laoreet. In hendrerit gravida rutrum quisque non tellus orci ac. Viverra accumsan in nisl nisi scelerisque eu.  Sit amet justo donec enim diam vulputate ut pharetra sit. Felis eget velit aliquet sagittis id. Tempor orci dapibus ultrices in iaculis. In aliquam sem fringilla ut morbi tincidunt augue interdum velit. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Eget dolor morbi non arcu. Non odio euismod lacinia at quis risus sed vulputate. Eget aliquet nibh praesent tristique magna sit amet. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit.  Eget nunc lobortis mattis aliquam. Consequat semper viverra nam libero justo laoreet sit amet cursus. Id diam maecenas ultricies mi eget mauris pharetra et. Nunc mattis enim ut tellus elementum sagittis vitae et. Ornare arcu odio ut sem. Amet aliquam id diam maecenas ultricies mi eget mauris. Gravida arcu ac tortor dignissim. Venenatis tellus in metus vulputate eu scelerisque. Pulvinar sapien et ligula ullamcorper malesuada. Mauris a diam maecenas sed enim ut sem.  Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Gravida rutrum quisque non tellus orci ac. Lectus nulla at volutpat diam ut venenatis. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Aliquam eleifend mi in nulla. Dui id ornare arcu odio. Nulla facilisi nullam vehicula ipsum a arcu cursus. Lacus sed turpis tincidunt id aliquet risus feugiat in ante. Orci ac auctor augue mauris. Fermentum odio eu feugiat pretium nibh ipsum consequat. Eget gravida cum sociis natoque penatibus et magnis dis parturient. Nam aliquam sem et tortor consequat id porta. Risus commodo viverra maecenas accumsan lacus. Eu ultrices vitae auctor eu augue ut lectus arcu. Egestas sed tempus urna et pharetra pharetra massa massa ultricies. Sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus. Mauris vitae ultricies leo integer.";
}

function checkHasDuplicatesn() {
  let seen = [];
  ships.map((s) => {
    let id = s.id;
    console.log(`seen ${id}`);
    if (id in seen) {
      console.log(`dupe ship id ${id} => ${s.names.en} ; ${seen[id]}!!!`);
    }
    seen[id] = s;
  });
  console.log("checked for duplicates");
}

// { ...visbileShipIdMap, [s.id]: true }
