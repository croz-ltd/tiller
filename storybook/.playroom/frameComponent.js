import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { IntlProvider } from "@tiller-ds/intl";
import { ThemeProvider, defaultIconConfig } from "@tiller-ds/theme";

import { FormikDecorator } from "../src/utils";
import "../.storybook/index.css";

export default function FrameComponent({ children }) {
  return (
    <IntlProvider lang="en">
      <FormikDecorator>
        <ThemeProvider iconConfig={defaultIconConfig}>
          <Router>{children}</Router>
        </ThemeProvider>
      </FormikDecorator>
    </IntlProvider>
  );
}
