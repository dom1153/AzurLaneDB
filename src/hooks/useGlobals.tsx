import { atom } from "jotai";
// atom / useAtom for local only ; set / useValue for global
import { Ship } from "@azurapi/azurapi/build/types/ship";
// import { Skin } from "@/types/ship";

// eventually use typescirpt enum
export enum MAIN_TAB_NAMES {
  ARCHIVE,
  RESUME,
  SETTINGS,
}

// can refactor the name later
// interface resumeShipType {
//   ship: Ship;
//   skinId: number;
// }
// init values
// const resumeShip: resumeShipType = {
//   ship: null,
//   skinId: 0,
// };
const shipList: Ship[] = [];

// atoms
export const fullShipListAtom = atom(shipList);

// export function useShipUtils() {
//   // const setResumeShipAtom = useSetAtom(resumeShipAtom);
//   const setTabName = useSetAtom(mainTabIndexAtom);
//   // const getResumeShipValue = () => useAtomValue(resumeShipAtom);
//   // const getResumeShipDBInfo = () => useAtomValue(resumeShipAtom).ship;
//   // const changeResumeShip = (ship) =>
//   //   setResumeShipAtom({ ship: ship, skinId: 0 });
//   const changeMainTab = (index: MAIN_TAB_NAMES) => setTabName(index);

//   return {
//     // getResumeShipValue,
//     // getResumeShipDBInfo,
//     // changeResumeShip,
//     changeMainTab,
//   };
// }
