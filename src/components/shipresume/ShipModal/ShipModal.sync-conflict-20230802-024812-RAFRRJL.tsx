import {
  Box,
  Flex,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";

import { visibleShipCardsAtom } from "@/hooks/useFilterPanel";

import SearchFilterPanel from "@components/shiparchive/filter/SearchFilterPanel";
import ShipCardGallery from "@components/shiparchive/ShipCardGallery";
import { useAtomValue } from "jotai";

export default function ShipModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let shipCardMeta = useAtomValue(visibleShipCardsAtom);

  return (
    <>
      <Button
        p={"2"}
        bgColor={"whiteAlpha.500"}
        fontSize={"sm"}
        onClick={onOpen}
      >
        Ship List
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
        <ModalOverlay />
        <ModalContent
          minH={"calc(100% - 40px)"}
          maxH={"calc(100% - 40px)"}
          w={"calc(100% - 200px)"}
          m={"20px"}
          p={""}
          h="100%"
          border={"dashed"}
          overflowY={"auto"}
        >
          <HStack minH="100%" maxH="100%" h="inherit" overflowY={"auto"} p="5">
            <SearchFilterPanel />
            <ShipCardGallery shipListMeta={shipCardMeta} onClick={onClose} />
          </HStack>
        </ModalContent>
      </Modal>
    </>
  );
}
