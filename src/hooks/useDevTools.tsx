// DEV CONFIG
// vite env info
// also developer globals

import { useToast } from "@chakra-ui/react";

enum MAIN_TAB_NAMES {
  ARCHIVE,
  RESUME,
  FOO,
  SETTINGS,
}

function logStamp(fn, msg, ...args) {
  if (!Dev.isLocalhost()) return;
  fn(new Date().toLocaleTimeString("en-US"), "||", msg, ...args);
}

function skipDevMessage() {
  return !Dev.isLocalhost() || Dev.isProd();
}

// === GLOBAL VARS ===
export default class Dev {
  static readonly MAIN_TAB_NAMES = MAIN_TAB_NAMES;

  static isProd: () => boolean = () => import.meta.env.MODE === "production";
  static isDev: () => boolean = () => !this.isProd();
  static getDevMode: () => string = () => import.meta.env.MODE;
  static isLocalhost: () => boolean = () =>
    window.location.href.includes("localhost");

  static readonly DEV_TAB_IDX: MAIN_TAB_NAMES = MAIN_TAB_NAMES.ARCHIVE;
  static readonly DEFAULT_SHIP_NAME: string = "essex"; // case insensitive
  static readonly DEFAULT_SHIP_FILTER_IDX: number = 0; // for ship swith overlapping names e.g. enterprise us/hms

  static readonly DEFAULT_TAB_INDEX: MAIN_TAB_NAMES = this.isProd()
    ? MAIN_TAB_NAMES.ARCHIVE
    : this.DEV_TAB_IDX;

  static readonly BLUR_IMAGE: boolean = this.isProd();

  static log(msg, ...args) {
    if (skipDevMessage()) return;
    logStamp(console.log, msg, ...args);
  }

  static warn(msg, ...args) {
    if (skipDevMessage()) return;
    logStamp(console.warn, msg, ...args);
  }

  static error(msg, ...args) {
    if (skipDevMessage()) return;
    logStamp(console.error, msg, ...args);
  }

  static group(level: number) {
    if (skipDevMessage()) return;
    for (let i = 0; i < level; i++) console.group();
  }

  static groupCollapsed(level: number) {
    if (skipDevMessage()) return;
    for (let i = 0; i < level; i++) console.groupCollapsed();
  }

  static groupEnd(level: number) {
    if (skipDevMessage()) return;
    for (let i = 0; i < level; i++) console.groupEnd();
  }

  static clear() {
    if (skipDevMessage()) return;
    console.clear();
  }

  static useNyi() {
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
}
