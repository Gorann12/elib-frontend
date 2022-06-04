import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import axios from "axios";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);
axios.defaults.baseURL = "http://localhost:4200/";

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();
