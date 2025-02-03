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

import { cx } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

type LoadingIconProps = {
  /**
   * Determines the width and height of the loading icon.
   * Defaults to 5.
   */
  size?: number;

  /**
   * Custom classes for the svg icon.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;
};

export default function LoadingIcon({ size = 5, className = "", ...props }: LoadingIconProps) {
  const svgClassName = cx("spinner", `w-${size} h-${size}`);

  return (
    <svg
      className={tillerTwMerge(svgClassName, className)}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      data-testid={props["data-testid"]}
    >
      <circle className="path stroke-current" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
    </svg>
  );
}
