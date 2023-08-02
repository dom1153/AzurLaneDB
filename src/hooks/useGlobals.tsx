import { atom } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

export let shipList: Ship[] = [];

export const fullShipListAtom = atom(shipList);

export const scrollbarCss = {
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    width: "10px",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "gold",
    borderRadius: "24px",
  },
};

// moving these here instead of shipResume help hmr debugging
// consider using a store
const resumeShip: Ship | null = null;
const resumeSkin: number = 0;

export const resumeShipAtom = atom(resumeShip);
export const resumeSkinAtom = atom(resumeSkin);
