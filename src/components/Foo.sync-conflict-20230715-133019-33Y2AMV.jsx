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
  fetch(
    "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json"
  )
    .then((res) => {
      console.log(res);
      res.json();
    })
    .then(
      (result) => {
        console.log(result);
        //   result.items,
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log(error);
      }
    );
}
