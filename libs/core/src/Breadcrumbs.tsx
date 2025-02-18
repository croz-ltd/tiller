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

import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

type BreadcrumbProps = {
  children: React.ReactNode;
  "data-testid"?: string;
  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;
} & TokenProps<"Breadcrumbs">;

export type BreadcrumbsProps = {
  /**
   * Breadcrumbs content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Defines the look of the icon between steps of breadcrumbs.
   */
  icon?: React.ReactElement;

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
} & BreadcrumbsTokensProps;

type BreadcrumbsTokensProps = {
  tokens?: ComponentTokens<"Breadcrumbs">;
};

function Breadcrumbs({ children, icon, className, ...props }: BreadcrumbsProps) {
  const tokens = useTokens("Breadcrumbs", props.tokens);

  const containerClassName = cx(
    tokens.master,
    tokens.container.backgroundColor,
    tokens.container.borderRadius,
    tokens.container.padding,
    tokens.container.display,
    tokens.container.spaceBetween,
  );

  const childContainerClassName = cx(
    tokens.childContainer.display,
    tokens.childContainer.alignItems,
    tokens.childContainer.spaceBetween,
  );

  const breadcrumbIcon = useIcon("breadcrumbs", icon, { className: tokens.iconColor });

  return (
    <nav className="flex" data-testid={props["data-testid"]}>
      <ol className={tillerTwMerge(containerClassName, className)}>
        {React.Children.map(
          children,
          (child, index) =>
            child && (
              <li key={index} className="flex">
                <div className={childContainerClassName}>
                  {index > 0 && React.cloneElement(breadcrumbIcon)}
                  {child}
                </div>
              </li>
            ),
        )}
      </ol>
    </nav>
  );
}

function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  const tokens = useTokens("Breadcrumbs", props.tokens);

  const breadcrumbClassname = cx(
    tokens.breadcrumb.master,
    tokens.breadcrumb.fontSize,
    tokens.breadcrumb.fontWeight,
    tokens.breadcrumb.color,
    tokens.breadcrumb.hover,
    tokens.breadcrumb.transitionDuration,
    tokens.breadcrumb.transitionTimingFunction,
  );

  return (
    <span className={tillerTwMerge(breadcrumbClassname, className)} data-testid={props["data-testid"]}>
      {children}
    </span>
  );
}

Breadcrumbs.Breadcrumb = Breadcrumb;
export default Breadcrumbs;
