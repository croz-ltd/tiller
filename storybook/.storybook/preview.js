import IntlProvider from "../../libs/intl/src/IntlProvider";
import defaultThemeConfig from "../../libs/theme/src/defaultTheme";
import intlDictionary from "../../libs/intl/src/intlDictionary";
import { ThemeProvider } from "../../libs/theme/src/ThemeProvider";
import { iconConfig } from "../../libs/icons/src/index.tsx";

import "./index.css";

import storybookDictionary from "../src/intl/storybookDictionary";
import patternsDictionary from "../../libs/patterns/src/patternsDictionary";

export const globalTypes = {
  language: {
    name: "Language",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      items: [
        { value: "hr", title: "Croatian (WIP)" },
        { value: "en", title: "English" },
      ],
    },
  },
};

const customViewports = {
  small: {
    name: "Small mobile",
    styles: {
      width: "320px",
      height: "568px",
    },
  },
  galaxyS23: {
    name: "Samsung Galaxy S23",
    styles: {
      width: "360px",
      height: "780px",
    },
  },
  iPhone14: {
    name: "Apple iPhone 14",
    styles: {
      width: "390px",
      height: "844px",
    },
  },
  tablet: {
    name: "Tablet",
    styles: {
      width: "834px",
      height: "1112px",
    },
  },
};

export const parameters = {
  playroom: {
    url: "/tiller/playroom",
  },
  controls: {
    hideNoControlsWarning: true,
    expanded: true,
  },
  viewport: {
    viewports: customViewports,
  },
};

const withIntlProvider = (Story, context) => {
  return (
    <IntlProvider
      lang={context.globals.language}
      dictionary={_.merge(intlDictionary, storybookDictionary, patternsDictionary)}
    >
      <Story />
    </IntlProvider>
  );
};

const withThemeProvider = (Story) => {
  return (
    <ThemeProvider themeConfig={defaultThemeConfig} iconConfig={iconConfig}>
      <Story />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider, withIntlProvider];
