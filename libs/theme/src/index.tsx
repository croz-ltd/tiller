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

import {
  Theme as InternalTheme,
  ThemeComponentType as InternalThemeComponentType,
  ThemeConfigFactory as InternalThemeConfigFactory,
  IconConfig as InternalIconConfig,
  IconProps as InternalIconProps,
  IconVariant as InternalIconVariant,
} from "./defaultTheme";
import { TokenProps as InternalTokenProps, ComponentTokens as InternalComponentTokens } from "./useTokens";

export type Theme = InternalTheme;
export type ThemeConfigFactory = InternalThemeConfigFactory;
export type ThemeComponentType = InternalThemeComponentType;
export type IconConfig = InternalIconConfig;
export type IconProps = InternalIconProps;
export type IconVariant = InternalIconVariant;
export type TokenProps<T extends ThemeComponentType> = InternalTokenProps<T>;
export type ComponentTokens<T extends ThemeComponentType> = InternalComponentTokens<T>;

export { default as defaultThemeConfig, createTheme, defaultIconConfig } from "./defaultTheme";
export { default as useTokens } from "./useTokens";
export { default as useIcon } from "./useIcon";
export { ThemeProvider, useThemeContext } from "./ThemeProvider";
export { default as cx } from "./cx";

export { color, font } from "./themeHelpers";
export { default as preset } from "./preset";
