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

import { ComponentTokens, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

export type ContainerProps = {
  /**
   * Content wrapped in a container.
   */
  children: React.ReactNode;

  /**
   * Defines the look of the container by determining the padding, margins and width
   * for inner and outer container of the component.
   */
  variant?: "max" | "fullWidth" | "constrainedPadded" | "fullWidthContainer" | "narrowConstrained";

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

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;
} & ContainerTokensProps;

type ContainerTokensProps = {
  tokens?: ComponentTokens<"Container">;
};

export default function Container({ variant = "max", children, className, ...props }: ContainerProps) {
  const tokens = useTokens("Container", props.tokens);

  return (
    <div className={tillerTwMerge(tokens.variant[variant].outerContainer, className)} data-testid={props["data-testid"]}>
      <div className={tokens.variant[variant].innerContainer}>{children}</div>
    </div>
  );
}
