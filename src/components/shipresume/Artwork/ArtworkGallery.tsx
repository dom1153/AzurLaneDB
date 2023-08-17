import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
  Text,
  Link,
  HStack,
  Stack,
  Center,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { ArtworkCard } from "@components/shipresume/Artwork/ArtworkCard";
import { useState } from "react";

export function ArtworkGallery({ ship }) {
  if (!ship) return <></>;
  let [img, setImg] = useState({ description: "", url: "" });

  const { isOpen, onOpen, onClose } = useDisclosure();
  function imageClickHandler(img) {
    setImg(img);
    onOpen();
  }
  return (
    <>
      <Grid
        templateColumns={"repeat(2, 1fr)"}
        gap="8px"
        maxH={"container.sm"}
        overflowY={"auto"}
      >
        {ship.gallery.map((g, i) => (
          <ArtworkCard
            key={`${ship.id}_gallery_${i}`}
            ship={ship}
            img={g}
            id={i}
            onClick={imageClickHandler}
          />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Center>
              <Stack>
                <Link href={img.url} target="_blank" isExternal>
                  {" "}
                  <Image src={img.url} objectFit={"cover"} loading="lazy" />
                </Link>
                <Text fontSize={"2xl"}>{img.description}</Text>
              </Stack>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={() => open(img.url)}>
              View Full Image
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
