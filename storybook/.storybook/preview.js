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

export const parameters = {
  playroom: {
    url: "/tiller/playroom",
  },
  controls: {
    hideNoControlsWarning: true,
    expanded: true,
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
