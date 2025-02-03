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

import { extendTailwindMerge } from "tailwind-merge";
import { preset } from "@tiller-ds/theme";

const theme = preset.theme.extend || {};

const extractKeys = (prefix: string, obj?: Record<string, unknown>) =>
  obj ? Object.keys(obj).map((key) => `${prefix}-${key}`) : [];

const fontSizes = extractKeys("text", theme.fontSize);
const flexValues = extractKeys("flex", theme.flex);
const maxWidths = extractKeys("max-w", theme.maxWidth);
const spacings = extractKeys("p", theme.spacing).concat(extractKeys("m", theme.spacing));
const widths = extractKeys("w", theme.width);
const textColors = extractKeys("text", theme.textColor);
const colors = Object.keys(theme.colors || {}).flatMap((color) => [`bg-${color}`, `text-${color}`, `border-${color}`]);

export const tillerTwMerge = extendTailwindMerge({
  extend: {
    theme: {
      colors: ["primary", "secondary", "tertiary", "success", "danger", "warning", "info"],
      borderColor: ["base"],
      spacing: spacings,
    },
    classGroups: {
      "font-size": fontSizes,
      flex: flexValues,
      "max-w": maxWidths,
      w: widths,
      "text-color": textColors.concat(colors),
      "bg-color": colors,
    },
  },
});
export default tillerTwMerge;
