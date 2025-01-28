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

import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from "react-router-dom";

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";

type LinkColor = "main" | "primary" | "secondary" | "tertiary" | "info" | "danger" | "warning" | "success";

export type LinkProps = {
  /**
   * Content wrapped in a link.
   */
  children: React.ReactNode;

  /**
   * The target link to which the component transfers you on click.
   */
  to?: string;

  /**
   * Determines the look of the link. Supports all colors.
   * Defaults to linkColor defined in the color's configuration of defaultConfig.
   */
  variant?: LinkColor;
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
} & Omit<ReactRouterLinkProps, "to"> &
  LinkTokensProps;

type LinkTokensProps = {
  tokens?: ComponentTokens<"Link">;
};

export default function Link({ children, variant = "main", to, className, ...props }: LinkProps) {
  const tokens = useTokens("Link", props.tokens);

  const linkClassName = cx(
    className,
    tokens.master,
    tokens.base.fontSize,
    tokens.base.fontWeight,
    tokens.color[variant],
  );

  if (to) {
    return (
      <ReactRouterLink {...props} to={to} className={linkClassName} data-testid={props["data-testid"]}>
        {children}
      </ReactRouterLink>
    );
  }

  return (
    <a {...props} type="button" className={linkClassName} data-testid={props["data-testid"]}>
      {children}
    </a>
  );
}
