// import ships from "../../db/ships.json";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Center,
} from "@chakra-ui/react";
import { atom, useAtom } from "jotai";

import { DEFAULT_TAB_INDEX, isDev } from "@/hooks/useDevTools";
import {
  ENABLE_RESUME,
  ENABLE_FOO,
  ENABLE_ARCHIVE,
  ENABLE_SETTINGS,
} from "@/hooks/useDevTools";

import ShipArchive from "@/views/ShipArchive";
import ShipResume from "@/views/ShipResume";
import Foo from "@/views/Foo";
import SettingsPanel from "@/views/SettingsPanel";

export const mainTabIndex: number = DEFAULT_TAB_INDEX;
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
