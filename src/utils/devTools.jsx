// DEV CONFIG
// vite env info
// also developer globals

// TODO: import.meta.env making typescript angry

// functions
export const isProd = () => import.meta.env.MODE == "production";
export const isDev = () => !isProd();
export const getDevMode = () => import.meta.env.MODE;

// states
const DEV_TAB_IDX = 0;
export const DEFAULT_TAB_INDEX = isProd() ? 0 : DEV_TAB_IDX;
export const DEFAULT_SHIP_NAME = "essex"; // case insensitive
export const DEFAULT_SHIP_FILTER_IDX = 0; // for ship swith overlapping names e.g. enterprise us/hms
