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

import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";

type BreadcrumbProps = {
  children: React.ReactNode;
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
   * Custom additional class name for the main container component.
   */
  className?: string;
} & BreadcrumbsTokensProps;

type BreadcrumbsTokensProps = {
  tokens?: ComponentTokens<"Breadcrumbs">;
};

function Breadcrumbs({ children, icon, className, ...props }: BreadcrumbsProps) {
  const tokens = useTokens("Breadcrumbs", props.tokens);

  const containerClassName = cx(
    className,
    tokens.master,
    tokens.container.backgroundColor,
    tokens.container.borderRadius,
    tokens.container.padding,
    tokens.container.display,
    tokens.container.spaceBetween
  );

  const childContainerClassName = cx(
    tokens.childContainer.display,
    tokens.childContainer.alignItems,
    tokens.childContainer.spaceBetween
  );

  const breadcrumbIcon = useIcon("breadcrumbs", icon, { className: tokens.iconColor });

  return (
    <nav className="flex">
      <ol className={containerClassName}>
        {React.Children.map(children, (child, index) => (
          <li key={index} className="flex">
            <div className={childContainerClassName}>
              {index > 0 && React.cloneElement(breadcrumbIcon)}
              {child}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function Breadcrumb({ children, ...props }: BreadcrumbProps) {
  const tokens = useTokens("Breadcrumbs", props.tokens);

  const breadcrumbClassname = cx(
    "cursor-pointer",
    tokens.breadcrumb.fontSize,
    tokens.breadcrumb.fontWeight,
    tokens.breadcrumb.color,
    tokens.breadcrumb.hover,
    tokens.breadcrumb.transitionDuration,
    tokens.breadcrumb.transitionTimingFunction
  );

  return <span className={breadcrumbClassname}>{children}</span>;
}

Breadcrumbs.Breadcrumb = Breadcrumb;
export default Breadcrumbs;
