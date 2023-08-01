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
} from "@chakra-ui/react";

export default function BasicModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // <Button variant="ghost">Secondary Action</Button>
  // <ModalFooter>
  //   <Button colorScheme="blue" mr={3} onClick={onClose}>
  //     Close
  //   </Button>
  // </ModalFooter>
  return (
    <>
      <Box bg={"purple.100"}>
        <Button onClick={onOpen}>Open Full Modal</Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent
          h={"calc(100%-50px)"}
          border={"dashed"}
          overflowY={"auto"}
          bgColor={"green.100"}
        >
          <ModalCloseButton />
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody
            h="inherit"
            overflowY={"auto"}
            border={"10px ridge"}
            bgColor={"red.100"}
          >
            <Text>{}</Text>
            <Text>{}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
