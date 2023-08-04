// DEV CONFIG
// vite env info
// also developer globals

import { useToast } from "@chakra-ui/react";

// functions
export const isProd = () => import.meta.env.MODE == "production";
export const isDev = () => !isProd();
export const getDevMode = () => import.meta.env.MODE;
export const isLocalhost = () => window.location.href.includes("localhost");

//
// eventually use typescirpt enum
export enum MAIN_TAB_NAMES {
  ARCHIVE,
  RESUME,
  FOO,
  SETTINGS,
}

// === GLOBAL VARS ===
export const DEBUG_FILTER_MODAL: boolean = false;
export const DEV_TAB_IDX = MAIN_TAB_NAMES.ARCHIVE;
export const DEFAULT_SHIP_NAME = "essex"; // case insensitive
export const DEFAULT_SHIP_FILTER_IDX = 0; // for ship swith overlapping names e.g. enterprise us/hms

export const DEFAULT_TAB_INDEX = isProd()
  ? MAIN_TAB_NAMES.ARCHIVE
  : DEV_TAB_IDX;

export const BLUR_IMAGE: boolean = isProd();

export function useNyi() {
  const toast = useToast();
  const nyiToast = (arg) =>
    toast({
      title: "Error (NYI)",
      description: `Not Yet Implemented: ${arg}`,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  return nyiToast;
}
