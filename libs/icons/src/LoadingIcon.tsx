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

type LoadingIconProps = {
  /**
   * Determines the width and height of the loading icon.
   * Defaults to 5.
   */
  size?: number;

  /**
   * Custom additional class name for the svg icon.
   */
  className?: string;
};

export default function LoadingIcon({ size = 5, className = "" }: LoadingIconProps) {
  const svgClassName = cx("spinner", `w-${size} h-${size}`, className);

  return (
    <svg className={svgClassName} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <circle
        className="path stroke-current"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        cx="33"
        cy="33"
        r="30"
      />
    </svg>
  );
}
