import { Center, Container } from "@chakra-ui/react";

export default function CenterDiv({ children }) {
  return (
    <>
      <Container bgColor="blue.50">
        <Center>{children}</Center>
      </Container>
    </>
  );
}
