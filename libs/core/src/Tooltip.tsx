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

import { Tooltip as ReachTooltip } from "@reach/tooltip";

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

export type TooltipProps = {
  /**
   * Content wrapped in a tooltip.
   */
  children: React.ReactNode;

  /**
   * Label of the tooltip (not exclusively text).
   */
  label: React.ReactNode;

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  /**
   * The style of the tooltip. Defaults to `dark`.
   */
  color?: "dark" | "light";

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
} & TooltipTokensProps;

type TooltipTokensProps = {
  tokens?: ComponentTokens<"Tooltip">;
};

export default function Tooltip({ children, label, color = "dark", className, ...props }: TooltipProps) {
  const tokens = useTokens("Tooltip", props.tokens);

  const tooltipClassName = cx(
    tokens.master,
    tokens.padding,
    tokens.borderRadius,
    tokens.color,
    tokens.fontSize,
    tokens[color].backgroundColor,
  );

  return (
    <ReachTooltip
      {...props}
      className={tillerTwMerge(tooltipClassName, className)}
      label={
        <pre style={{ all: "unset", whiteSpace: "pre-wrap" }} data-testid={props["data-testid"]}>
          <span className={tokens[color].textColor}>{label}</span>
        </pre>
      }
    >
      <div>{children}</div>
    </ReachTooltip>
  );
}
