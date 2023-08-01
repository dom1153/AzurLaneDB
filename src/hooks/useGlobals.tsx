import { atom } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

export let shipList: Ship[] = [];

export const fullShipListAtom = atom(shipList);
