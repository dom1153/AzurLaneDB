import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
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
