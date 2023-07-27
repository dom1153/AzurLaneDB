// DEV CONFIG
// vite env info
// also developer globals

import { MAIN_TAB_NAMES } from "@/hooks/useGlobals";
import { useToast } from "@chakra-ui/react";

// functions
export const isProd = () => import.meta.env.MODE == "production";
export const isDev = () => !isProd();
export const getDevMode = () => import.meta.env.MODE;

const DEV_TAB_IDX = MAIN_TAB_NAMES.ARCHIVE;

export const DEFAULT_TAB_INDEX = isProd()
  ? MAIN_TAB_NAMES.ARCHIVE
  : DEV_TAB_IDX;
export const DEFAULT_SHIP_NAME = "essex"; // case insensitive
export const DEFAULT_SHIP_FILTER_IDX = 0; // for ship swith overlapping names e.g. enterprise us/hms

export const ENABLE_ARCHIVE: boolean = true;
export const ENABLE_RESUME: boolean = true;
export const ENABLE_FOO: boolean = true;
export const ENABLE_SETTINGS: boolean = true;

export function useNyi() {
  const toast = useToast();
  const nyiToast = () =>
    toast({
      title: "Error (NYI)",
      description: "Not Yet Implemented",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  return nyiToast;
}
