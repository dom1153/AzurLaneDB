import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Input,
  Center,
  Grid,
  GridItem,
  Stack,
  Link,
  Heading,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function ShipCard(ship, displayMode, setShip) {
  return (
    <Card
      key={ship.id}
      display={displayMode}
      variant={"outline"}
      bg={"blue.100"}
      onClick={() => setShip(ship)}
    >
      <Image src={ship.thumbnail} />
      <Center>
        <Text
          //   fontSize={"3xs"}
          whiteSpace={"nowrap"}
          overflow={"clip"}
          textOverflow={"ellipsis"}
        >
          {ship.names.en}
        </Text>
      </Center>
    </Card>
  );
}
// {/* <Text fontSize={"3xs"}>Universal Bulin</Text> */}
// {/* <Link fontSize={"3xs"} href={ship.wikiUrl}> */}
// {false && (
//   <marquee behavior="" direction="" scrolldelay="">
//     {ship.names.en}
//   </marquee>
// )}

function FilterButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function SortButtons() {
    return (
      <>
        <HStack>
          <Text w="75px">Sort</Text>
          <Box>
            <Button>Sort A</Button>
            <Button>Sort B</Button>
            <Button>Sort C</Button>
            <Button>Sort D</Button>
          </Box>
        </HStack>
      </>
    );
  }
  function HullButtons() {
    return (
      <>
        <HStack>
          <Text w="75px">Hull</Text>
          <Box>
            <Button>Filter A</Button>
            <Button>Filter B</Button>
            <Button>Filter C</Button>
            <Button>Filter D</Button>
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
            <Button>Filter A</Button>
            <Button>Filter B</Button>
            <Button>Filter C</Button>
            <Button>Filter D</Button>
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
            <Button>Filter A</Button>
            <Button>Filter B</Button>
            <Button>Filter C</Button>
            <Button>Filter D</Button>
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
            <Button>Filter A</Button>
            <Button>Filter B</Button>
            <Button>Filter C</Button>
            <Button>Filter D</Button>
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

export default function BrowseSearch({ ships, setShip, children }) {
  const CARD_DISPLAY = "flex";
  let ALL_VISIBLE = [];
  const [shipGirls, setShipGirls] = useState(ALL_VISIBLE);

  useEffect(() => {
    // ships.forEach((s) => console.log(s.id));
    // VVV hacky for sure...
    search("");
  }, []);

  useEffect(() => {
    // console.log("BrowseSearch [ships] useEffect");
    if (ships) {
      ALL_VISIBLE = ships.map(() => CARD_DISPLAY);
    }
  }, [ships]);

  function search(i) {
    if (i != "") {
      //   console.log("updating...", shipGirls);
      setShipGirls(
        ships.map((s) =>
          s.names.en.toLowerCase().includes(i) ? CARD_DISPLAY : "none"
        )
      );
    } else {
      setShipGirls(ALL_VISIBLE);
    }
  }

  if (!ships) {
    return <Text>No ships found</Text>;
  }

  return (
    <>
      <Stack>
        <HStack>
          <Input
            placeholder="filter ship names"
            margin={"sm"}
            bg={"white"}
            onChange={(e) => search(e.target.value)}
          />
          <FilterButton />
        </HStack>
        {/* TODO: dynamically set grid size */}
        <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
          {ships &&
            ships.map((ship, i) => ShipCard(ship, shipGirls[i], setShip))}
        </Grid>
      </Stack>
    </>
  );
}
