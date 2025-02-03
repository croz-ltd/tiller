/*
 *    Copyright 2025 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import * as React from "react";

import defaultThemeConfig, { createTheme, defaultIconConfig, IconConfig, Theme, ThemeConfigFactory } from "./defaultTheme";

type ThemeProviderProps = {
  themeConfig?: ThemeConfigFactory;
  iconConfig: IconConfig;
  children?: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  icons: IconConfig;
};

const ThemeContext = React.createContext<ThemeContextType>({ theme: createTheme(defaultThemeConfig), icons: defaultIconConfig });

export function useThemeContext() {
  return React.useContext(ThemeContext);
}

export function ThemeProvider({ themeConfig = defaultThemeConfig, iconConfig, children }: ThemeProviderProps) {
  const theme = React.useMemo(() => ({ theme: createTheme(themeConfig), icons: iconConfig }), [themeConfig, iconConfig]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
