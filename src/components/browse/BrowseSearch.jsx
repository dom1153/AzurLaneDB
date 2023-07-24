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
import * as Assets from "@/assets/asset_index";
import FilterButton from "./FilterButton";

function ShipCard(ship, displayMode, setShip) {
  return (
    <Card
      key={ship.id}
      display={displayMode}
      variant={"outline"}
      // bg={"blue.100"}
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
      <Box
        bgImage={Assets.technology_bg}
        bgPosition="center"
        bgRepeat={"repeat"}
        // bgRepeat="no-repeat"
        // bgClip={"unset"}
        // bgSize={"cover"}
        // bgSize={"contain"}
        backgroundAttachment={"local, scroll"}
        // overflow={"unset"}
        // w={"100vw"}
        p={"2"}
      >
        <Center>
          <Stack maxW={"container.md"}>
            <Card p={"2"} position={"sticky"} top="0" zIndex={1000}>
              <HStack>
                <Input
                  placeholder="filter ship names"
                  margin={"sm"}
                  // bg={"white"}
                  variant={"filled"}
                  onChange={(e) => search(e.target.value)}

                  // colorScheme="blue"
                />
                <FilterButton />
              </HStack>
            </Card>
            {/* TODO: dynamically set grid size */}
            <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
              {ships &&
                ships.map((ship, i) => ShipCard(ship, shipGirls[i], setShip))}
            </Grid>
          </Stack>
        </Center>
      </Box>
    </>
  );
}
