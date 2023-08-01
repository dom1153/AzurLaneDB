// import ships from "../../db/ships.json";
import {
  Box,
  Stack,
  HStack,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import LoremDump from "@/components/foo/LoremDump";

// TODO: make this an * later
import filterData from "@/components/shiparchive/filter/FilterData.json";

import CustomRadioGroup from "@src/components/shiparchive/filter/radio/CustomRadioGroup";
import { useEffect, useState } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
// import { filterAtom, sortModeAtom } from "@/hooks/useShipArchive";
import { DEBUG_FILTER_MODAL, isDev } from "@/hooks/useDevTools";

interface FilterParams {
  onConfirm: () => void;
}

// const localSortAtom = atom(filterData.sortGroup.default);
// const localFilterAtom = atom([]);

// for testing new concepts
export default function FilterButton({ onConfirmHandler }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  function FilterButtonWithModal() {
    // let sortValue = useAtomValue(localSortAtom);
    // let lastSortValue = useAtomValue(sortModeAtom);
    // let lastFilterValue = useAtomValue(filterAtom);

    function onConfirm() {
      onClose();
      // console.log("sortvalue:", sortValue);
      // onConfirmHandler({ filters: [], sortMode: sortValue });
    }

    return (
      <>
        <Button onClick={onOpen}>Filter</Button>

        {/* something is final ref ; open search on close */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="full"
          closeOnOverlayClick={false}
        >
          <ModalOverlay backdropFilter={"auto"} backdropBlur={"2px"} />
          <ModalContent h="inherit">
            <ModalHeader>Sort and Filter</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg="blue.100">
              <Stack overflowY={"auto"}></Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onConfirm}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  useEffect(() => {
    if (DEBUG_FILTER_MODAL && isDev()) onOpen();
  }, []);

  return (
    <>
      <FilterButtonWithModal />
    </>
  );
}

// <CustomRadioGroup
//   options={filterData.sortGroup.options}
//   groupName={filterData.sortGroup.groupName}
//   defaultValue={lastSortValue}
//   valueAtom={localSortAtom}
// />
