import { useEffect } from "react";
import { atom, useAtom, useAtomValue } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";
import {
  HStack,
  Input,
  Center,
  Grid,
  Stack,
  Card,
  Text,
  Box,
} from "@chakra-ui/react";

import * as Assets from "@/assets/asset_index";

import { fullShipListAtom } from "@/hooks/useGlobals";

import FilterButton from "@/components/shiparchive/FilterButton";
import ShipCard from "@/components/shiparchive/ShipCard";

interface shipCardMeta {
  hash: number;
  show: boolean;
}

const filterAtom = atom([]);
const sortModeAtom = atom("");
const searchTermAtom = atom("");
// id: visible
const visibleShipCardsAtom = atom([] as shipCardMeta[]);

export default function BrowseSearch() {
  const ships = useAtomValue(fullShipListAtom);
  const { visibleShipList, textSearchHandler, CARD_DISPLAY, getShipByMeta } =
    useShipArchive(ships);

  if (!ships) {
    return <Text>No ships found</Text>;
  }

  return (
    <>
      <Box
        bgImage={Assets.technology_bg}
        // bgPosition="center"
        // bgRepeat={"repeat"}
        bgRepeat="no-repeat"
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
                  onChange={(e) => textSearchHandler(e.target.value)}
                  // colorScheme="blue"
                />
                <FilterButton />
              </HStack>
            </Card>
            {/* TODO: dynamically set grid size */}
            <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
              {visibleShipList.map((meta) => {
                let ship = getShipByMeta(meta);
                return (
                  <ShipCard
                    key={ship.id}
                    ship={ship}
                    displayMode={meta.show ? CARD_DISPLAY : "none"}
                  />
                );
              })}
            </Grid>
          </Stack>
        </Center>
      </Box>
    </>
  );
}

export const useShipArchive = (ships: Ship[]) => {
  const CARD_DISPLAY = "flex";
  const [filters, setFilters] = useAtom(filterAtom);
  const [sortMode, setSortMode] = useAtom(sortModeAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [visibleShipList, setVisibleShipList] = useAtom(visibleShipCardsAtom);
  enum FilterMode {
    Text,
    Type,
  }

  useEffect(() => {
    // populate the mapping
    setVisibleShipList(getFullVisibleShipCardList());
    console.log("useEffect: ", ships.length);
  }, [ships]);

  function getFullVisibleShipCardList() {
    return ships.map(
      (s, index) => ({ hash: index, show: true } as shipCardMeta)
    );
  }

  function textSearchHandler(inputStr) {
    // set minor 100s delay?
    setSearchTerm(inputStr);
    console.log("inputstr", inputStr);
    searchSortFilterShips(FilterMode.Text, inputStr);
  }

  function searchSortFilterShips(mode: FilterMode, inputStr: string) {
    if (FilterMode.Text == mode) {
      let lst = getFullVisibleShipCardList(); // reset list
      lst = filterShipName(inputStr, lst);
      setVisibleShipList(lst);
    }

    function filterShipName(name, localList: shipCardMeta[]): shipCardMeta[] {
      if (name.trim().length !== 0) {
        let newlist = localList.map((m) => {
          let ship = getShipByMeta(m);
          if (!ship.names.en.toLowerCase().includes(name)) {
            return { hash: m.hash, show: false } as shipCardMeta;
          } else {
            return m;
          }
        });
        return newlist;
      }

      return localList;
    }
  }

  function getShipByMeta(meta: shipCardMeta) {
    return ships[meta.hash];
  }

  return { visibleShipList, textSearchHandler, CARD_DISPLAY, getShipByMeta };
};

// function useShipUtils(): { changeResumeShip: any; changeMainTab: any } {
//   throw new Error("Function not implemented.");
// }
