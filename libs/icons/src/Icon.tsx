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

import * as React from "react";

import { cx } from "@tiller-ds/theme";

import iconTypes from "./iconTypes";

export type IconType = typeof iconTypes[number] | undefined;

export type IconVariant = "thin" | "light" | "regular" | "bold" | "fill";

export type IconProps = {
  /**
   * The size of the icon (determined by a number or 'full' keyword)
   */
  size?: number;

  /**
   * Shown icon (selected by entered name from the list
   * (all possible icons are shown on https://phosphoricons.com/)
   */
  type: IconType;

  /**
   * Determines whether the icon is solid (filled) or outlined
   */
  variant?: IconVariant;
} & Omit<React.SVGProps<SVGSVGElement>, "color">;

export default function Icon({ variant = "regular", type, className = "", size = 5, ...props }: IconProps) {
  const iconSizes = {
    1: "text-xs",
    2: "text-sm",
    3: "text-base",
    4: "text-lg",
    5: "text-xl",
    6: "text-2xl",
    7: "text-3xl",
    8: "text-4xl",
    9: "text-5xl",
    10: "text-6xl",
    11: "text-7xl",
    12: "text-8xl",
    13: "text-9xl",
  };

  const iconSize = iconSizes[size];

  const iconClassName = cx(iconSize, className, {
    [`ph-${type}`]: variant === "regular",
    [`ph-${type}-${variant}`]: variant !== "regular",
  });

  return <i className={iconClassName} style={{ ...props.style }} />;
}
