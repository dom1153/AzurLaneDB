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

// for testing new concepts
export default function Foo({ children }) {
  if (false) {
    fetch(
      "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
    )
      .then((result) => {
        console.log("A: ", result);
        return result.json();
      })
      .then(
        (result) => {
          console.log("B: ", result);
        },
        (error) => {
          console.log("Error: ", error);
        }
      );
  }
}
