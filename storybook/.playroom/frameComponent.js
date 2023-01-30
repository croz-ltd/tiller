import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { iconConfig } from "@tiller-ds/icons";
import { IntlProvider } from "@tiller-ds/intl";
import { ThemeProvider } from "@tiller-ds/theme";

import { FormikDecorator } from "../src/utils";
import "../.storybook/index.css";

export default function FrameComponent({ children }) {
  return (
    <IntlProvider lang="en">
      <FormikDecorator>
        <ThemeProvider iconConfig={iconConfig}>
          <Router>{children}</Router>
        </ThemeProvider>
      </FormikDecorator>
    </IntlProvider>
  );
}
