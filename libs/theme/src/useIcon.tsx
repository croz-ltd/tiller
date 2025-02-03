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

import React from "react";

import { IconConfig } from "./defaultTheme";
import { useThemeContext } from "./ThemeProvider";
import { IconProps } from "./defaultTheme";

type AppIconType = keyof IconConfig;

export default function useIcon(
  iconName: AppIconType,
  override?: React.ReactElement,
  iconProps?: Partial<IconProps>,
): React.ReactElement {
  const { icons } = useThemeContext();
  if (override !== undefined) {
    return React.cloneElement(override, {
      className: iconProps?.className,
      size: iconProps?.size,
      variant: iconProps?.variant,
    });
  }

  const { size = 5, className = "", variant } = iconProps ?? {};

  return icons[iconName]({ size, className, variant });
}
