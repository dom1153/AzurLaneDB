// import * as Cha from "@chakra-ui/react";
import { lorem } from "../../views/Foo";

export default function XLModal() {
  const { isOpen, onOpen, onClose } = Cha.useDisclosure();

  return (
    <>
      <Box>
        <Button onClick={onOpen}>Open XL Modal</Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent
          h={"calc(100% - 20px)"}
          m={"10px"}
          p={""}
          border={"dashed"}
          overflowY={"auto"}
          bgColor={"green.100"}
        >
          <ModalCloseButton />
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody
            border={"10px ridge"}
            bgColor={"red.100"}
            overflowY={"auto"}
          >
            <Flex>
              <Text maxW={"300px"}>{lorem()}</Text>
              <Box flex={"1"} bgColor={"purple.100"}>
                Hallo there
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
