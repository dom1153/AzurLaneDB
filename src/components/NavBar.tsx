// import ships from "../../db/ships.json";
import { Box, Flex, Center } from "@chakra-ui/react";
import { atom, useAtom } from "jotai";

import Dev from "@/hooks/useDevTools";

export const mainTabIndex: number = Dev.DEFAULT_TAB_INDEX;
export const mainTabIndexAtom = atom(mainTabIndex);

export default function NavBar({}) {
  let {} = useNavBar();

  return (
    <>
      {/* tabs */}
      <Flex flexDir={"column"} flex={"1"}>
        {/*tablist  */}
        <Flex bg="green.100" p={"2"} justifyContent={"center"}>
          <NavLink href="" text="Archive" />
          <NavLink href="" text="Resume" />
          <NavLink href="" text="Foo" />
        </Flex>
        {/* tabpanels */}
        <ContentPanel>
          {/* tabpanel */}
          <p>Hello</p>
          <p>Bye</p>
        </ContentPanel>
      </Flex>
    </>
  );
}

function NavLink({ href, text }) {
  return (
    <Box p="2" bgColor={"blue.100"} mx="1">
      <a href={href}>{text}</a>
    </Box>
  );
}

function useNavBar() {
  let [tabIndex, setTabIndex] = useAtom(mainTabIndexAtom);
  function onClickHandler(i) {
    console.log("clicked", i);
    setTabIndex(i);
  }

  return {};
}

function ContentPanel({ children }) {
  console.log(typeof children, children, Array.isArray(children));
  return false;
  return (
    <Center bg={"purple.100"} flex={"1"}>
      {children.map((c, i) => (
        <ContentItem key={`Tab ${i}`} Item={c} />
      ))}
    </Center>
  );
}

function ContentItem({ Item }) {
  return <Item />;
}
