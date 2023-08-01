import {
  AspectRatio,
  Box,
  Center,
  Square,
  Circle,
  Container,
  Flex,
  Spacer,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  HStack,
  VStack,
  Wrap,
  WrapItem,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  IconButton,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  PinInput,
  PinInputField,
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Switch,
  Textarea,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Code,
  Divider,
  Kbd,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CircularProgress,
  CircularProgressLabel,
  Progress,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  useToast,
  Text,
  Heading,
  Highlight,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VisuallyHidden,
  VisuallyHiddenInput,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Link,
  LinkBox,
  LinkOverlay,
  SkipNavLink,
  SkipNavContent,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Image,
  useDisclosure,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

export default function MyToggleGroup() {
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
    {
      label: "Sakura Empire",
    },
  ];

  const handleOnChange = (v) => {
    console.log(`${v} got clicked`);
  };

  const { value, getRadioProps, getRootProps } = useRadioGroup({
    defaultValue: "Name",
    onChange: handleOnChange,
  });

  return (
    <>
      <Center>
        <Box {...getRootProps()} bgColor={"black"} padding={"10"}>
          <Heading textColor={"white"}>{"Sort: "}</Heading>
          <HStack>
            {buttonList.map((b) => (
              <ToggleButton
                key={b.label}
                lbl={b.label}
                {...getRadioProps({ value: b.label })}
              />
            ))}
          </HStack>
        </Box>
      </Center>
    </>
  );

  function ToggleButton(props) {
    const { lbl, ...radioProps } = props;
    const { state, getInputProps, getRadioProps, htmlProps, getLabelProps } =
      useRadio(radioProps);

    return (
      <label {...htmlProps}>
        <input {...getInputProps({})} hidden />
        <Tag
          colorScheme={state.isChecked ? "blue" : "gray"}
          {...getRadioProps()}
          // bg={state.isChecked ? "blue" : "gray"}
          rounded={""}
          // borderWidth={"0.1px 0.1px 3px 0.1px"}
          // borderColor={"white"}
          // borderStyle={"solid"}
          fontWeight={"bold"}
          // color={"white"}
        >
          <TagLabel
            {...getLabelProps()}
            // colorScheme={state.isChecked ? "green" : "red"}
            // colorScheme={"green"}
            px="2"
            py="1"
            m="1"
          >
            {props.lbl}
          </TagLabel>
        </Tag>
      </label>
    );
  }
}
