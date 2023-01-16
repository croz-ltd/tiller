import React from "react";
import ReactDOM from "react-dom/client";

import { IntlProvider } from "@tiller-ds/intl";
import { ThemeProvider } from "@tiller-ds/theme";

import App from "./App";
import "./index.css";
import { defaultIconConfig, defaultComponentConfig } from "./theme/tiller.config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider lang={"en"} loadDictionary={undefined}>
      <ThemeProvider themeConfig={defaultComponentConfig} iconConfig={defaultIconConfig}>
        <App />
      </ThemeProvider>
    </IntlProvider>
  </React.StrictMode>
);
