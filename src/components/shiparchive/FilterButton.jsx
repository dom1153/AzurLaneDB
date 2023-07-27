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

// for testing new concepts
export default function FilterButton({ children }) {
  function FilterButtonWithModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    function SortButtons() {
      return (
        <>
          <HStack>
            <Text w="75px">Sort</Text>
            <Box>
              <Button>Name</Button>
              <Button>Id</Button>
              <Button>Rarity</Button>
              <Button>Total Stats</Button>
              <Menu closeOnSelect={false}>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Stats
                </MenuButton>
                <MenuList minWidth="100px">
                  <MenuOptionGroup type="radio">
                    <MenuItemOption value="HP">HP</MenuItemOption>
                    <MenuItemOption>AVI</MenuItemOption>
                    <MenuItemOption>EVA</MenuItemOption>
                    <MenuItemOption>AA</MenuItemOption>
                    <MenuItemOption>TRP</MenuItemOption>
                    <MenuItemOption>RLD</MenuItemOption>
                    <MenuItemOption>ASW</MenuItemOption>
                    <MenuItemOption>SPD</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </>
      );
    }
    function HullButtons() {
      return (
        <>
          <HStack>
            <Text w="75px">Index</Text>
            <Box>
              <Button>All (Reset)</Button>
            </Box>
          </HStack>
          <HStack>
            <Text w="75px">Index (Main)</Text>
            <Box>
              <Button>All</Button>
              <Button>CV</Button>
              <Button>AR</Button>
              <Button>BB</Button>
              <Button>None</Button>
            </Box>
          </HStack>
          <HStack>
            <Text w="75px" fontSize={"sm"}>
              Index (Vanguard)
            </Text>
            <Box>
              <Button>All</Button>
              <Button>DD</Button>
              <Button>CL</Button>
              <Button>CA</Button>
              <Button>None</Button>
            </Box>
          </HStack>
          <HStack>
            <Text w="75px">Index (SS)</Text>
            <Box>
              <Button>All</Button>
              <Button>None</Button>
            </Box>
          </HStack>
        </>
      );
    }

    function FactionButtons() {
      return (
        <>
          <HStack>
            <Text w="75px">Faction</Text>
            <Box>
              <Button>Eaglue Union</Button>
              <Button>Royal Navy</Button>
              <Button>Sakura Empire</Button>
              <Button>Iron Blood</Button>
              <Button>Dragon Empry</Button>
              <Button>Sardegna Empire</Button>
              <Button>Northern Parliament</Button>
              <Button>Iris Libre</Button>
              <Button>Vichya Dominion</Button>
              <Button>Bulin</Button>
              <Button>Tempesta</Button>
            </Box>
          </HStack>
          <HStack>
            <Text w="75px">Acquire Source</Text>
            <Box>
              <Button>Common</Button>
              <Button>Collab</Button>
              <Button>Priority Ships</Button>
              <Button>Meta</Button>
            </Box>
          </HStack>
        </>
      );
    }
    function RarityButtons() {
      return (
        <>
          <HStack>
            <Text w="75px">Rarity</Text>
            <Box>
              <Button>All</Button>
              <Button>Common</Button>
              <Button>Rare</Button>
              <Button>Elite</Button>
              <Button>Super Rare</Button>
              <Button>Ultra</Button>
            </Box>
          </HStack>
        </>
      );
    }
    function OtherButtons() {
      return (
        <>
          <HStack>
            <Text w="75px">Other</Text>
            <Box>
              <Button>Has Skin</Button>
              <Button>Only Has Default Skin</Button>
              <Button>Special</Button>
              <Button>Has Retrofit</Button>
              <Button>Unique Module</Button>
              <Button>Wearing Skin</Button>
              <Button>Oath Skin</Button>
            </Box>
          </HStack>
          <HStack>
            <Text w="75px">Options</Text>
            <Box>
              <Button>Show retrofit if available</Button>
              <Button>Show last selected skin</Button>
              <Button>
                Show random skin during 'wearing skin' if applicable
              </Button>
            </Box>
          </HStack>
        </>
      );
    }

    return (
      <>
        <Button onClick={onOpen}>Filter</Button>

        {/* something is final ref ; open search on close */}
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Sort and Filter</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <SortButtons />
                <HullButtons />
                <FactionButtons />
                <RarityButtons />
                <OtherButtons />
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Confirm
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <FilterButtonWithModal />
    </>
  );
}
