/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
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

import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

type Shade = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

interface ThemeColorShades {
  default: Shade;
  light: Shade;
  dark: Shade;
  contrast: string;
}

const DEFAULT_SHADES: ThemeColorShades = {
  default: "600",
  light: "100",
  dark: "800",
  contrast: "white",
}

export function color(colorName: string, shades?: Partial<ThemeColorShades>, colorsConfig?: Partial<typeof colors>) {
  const finalColorConfig = colorsConfig !== undefined ? colorsConfig : colors;
  const finalShades: ThemeColorShades = { ...DEFAULT_SHADES, ...shades };
  return {
    ...finalColorConfig[colorName],
    DEFAULT: finalColorConfig[colorName][finalShades.default],
    light: finalColorConfig[colorName][finalShades.light],
    dark: finalColorConfig[colorName][finalShades.dark],
    contrast: finalColorConfig[finalShades.contrast],
  }
}


export function font(size: string, lineHeight?: string, weight?: string, themeConfig?: Partial<typeof defaultTheme>) {
  const finalThemeConfig = themeConfig !== undefined ? themeConfig: defaultTheme;
  if (lineHeight !== undefined && weight !== undefined) {
    return [
      finalThemeConfig?.fontSize?.[size][0] ?? defaultTheme.fontSize[size][0],
      {
        lineHeight: finalThemeConfig?.lineHeight?.[lineHeight] ?? defaultTheme.lineHeight[lineHeight],
        fontWeight: finalThemeConfig?.fontWeight?.[weight] ?? defaultTheme.fontWeight[weight],
      }
    ];
  } else {
    return finalThemeConfig?.fontSize?.[size][0] ?? defaultTheme.fontSize[size][0];
  }
}
