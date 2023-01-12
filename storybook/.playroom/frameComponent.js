import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { IntlProvider } from "react-intl";

import { ThemeProvider, defaultIconConfig } from "@tiller-ds/theme";
import { FormikDecorator } from "../src/utils";

import "../.storybook/index.css";

export default function FrameComponent({ children }) {
  return (
    <IntlProvider locale="en">
      <FormikDecorator>
        <ThemeProvider iconConfig={defaultIconConfig}>
          <Router>{children}</Router>
        </ThemeProvider>
      </FormikDecorator>
    </IntlProvider>
  );
}
