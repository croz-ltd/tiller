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

import { default as ReachTooltip } from "@reach/tooltip";

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";

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
   * Custom additional class name for the main container.
   */
  className?: string;
} & TooltipTokensProps;

type TooltipTokensProps = {
  tokens?: ComponentTokens<"Tooltip">;
};

export default function Tooltip({ children, label, className, ...props }: TooltipProps) {
  const tokens = useTokens("Tooltip", props.tokens);

  const tooltipClassName = cx(
    className,
    tokens.master,
    tokens.padding,
    tokens.borderRadius,
    tokens.fontSize,
    tokens.color,
    tokens.backgroundColor
  );

  return (
    <ReachTooltip className={tooltipClassName} label={<pre>{label}</pre>}>
      <div>{children}</div>
    </ReachTooltip>
  );
}
