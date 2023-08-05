import { atom } from "jotai";
import { Ship } from "@azurapi/azurapi/build/types/ship";

import Dev from "@/hooks/useDevTools";

// moving these here instead of shipResume help hmr debugging

export default class Globals {
  static readonly resumeShipAtom = atom(null as Ship);
  static readonly resumeSkinAtom = atom(0);
  static readonly fullShipListAtom = atom([] as Ship[]);
  static readonly mainTabIndexAtom = atom(Dev.DEFAULT_TAB_INDEX);

  static readonly scrollbarCss = {
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
}
