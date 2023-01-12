import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom";

import { defaultThemeConfig, ThemeProvider } from "@tiller-ds/theme";
import { iconConfig } from "@tiller-ds/icons";

import App from "./app/app";

ReactDOM.render(
  <StrictMode>
    <ThemeProvider themeConfig={defaultThemeConfig} iconConfig={iconConfig}>
      <App />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);
