import * as Cha from "@chakra-ui/react";
import { lorem } from "../../views/Foo";

export default function XLModal() {
  const { isOpen, onOpen, onClose } = Cha.useDisclosure();

  return (
    <>
      <Cha.Box>
        <Cha.Button onClick={onOpen}>Open XL Modal</Cha.Button>
      </Cha.Box>

      <Cha.Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <Cha.ModalOverlay />
        <Cha.ModalContent
          h={"calc(100% - 20px)"}
          m={"10px"}
          p={""}
          border={"dashed"}
          overflowY={"auto"}
          bgColor={"green.100"}
        >
          <Cha.ModalCloseButton />
          <Cha.ModalHeader>Modal Title</Cha.ModalHeader>
          <Cha.ModalBody
            border={"10px ridge"}
            bgColor={"red.100"}
            overflowY={"auto"}
          >
            <Cha.Flex>
              <Cha.Text maxW={"300px"}>{lorem()}</Cha.Text>
              <Cha.Box flex={"1"} bgColor={"purple.100"}>
                Hallo there
              </Cha.Box>
            </Cha.Flex>
          </Cha.ModalBody>
        </Cha.ModalContent>
      </Cha.Modal>
    </>
  );
}
