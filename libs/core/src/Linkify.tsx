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

import LinkifyLibrary from "linkifyjs/lib/linkify-react";
import { Options } from "linkifyjs";

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

type LinkifyColor = "main" | "primary" | "secondary" | "tertiary" | "info" | "danger" | "warning" | "success";

export type LinkifyProps = {
  /**
   * Content wrapped in a LinkifyLibrary component.
   */
  children: React.ReactNode;

  /**
   * Determines the look of the detected link(s). Supports all colors.
   * Defaults to linkColor defined in the color's configuration of defaultConfig.
   */
  variant?: LinkifyColor;

  /**
   * Custom classes for the container.
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
} & Options &
  LinkTokensProps;

type LinkTokensProps = {
  tokens?: ComponentTokens<"Link">;
};

export default function Linkify({ children, variant = "main", nl2br = true, className, ...props }: LinkifyProps) {
  const tokens = useTokens("Link", props.tokens);

  const linkClassName = cx(tokens.master, tokens.base.fontSize, tokens.base.fontWeight, tokens.color[variant]);

  const options = {
    className: tillerTwMerge(linkClassName, className),
    nl2br,
    ...props,
  } as Options;

  return (
    <LinkifyLibrary options={options} data-testid={props["data-testid"]}>
      {children}
    </LinkifyLibrary>
  );
}
