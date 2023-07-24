// DEV CONFIG
// vite env info
// also developer globals

// functions
export const isProd = () => import.meta.env.MODE == "production";
export const isDev = () => !isProd();
export const getDevMode = () => import.meta.env.MODE;

// states
const DEV_TAB_IDX = 0;
export const DEFAULT_TAB_INDEX = isProd() ? 0 : DEV_TAB_IDX;
