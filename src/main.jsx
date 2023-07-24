import * as React from "react";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";
import App from "./components/App";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} r>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
