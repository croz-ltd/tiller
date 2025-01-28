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

import { ComponentTokens, cx, TokenProps, useTokens } from "@tiller-ds/theme";

import Breadcrumbs from "./Breadcrumbs";

export type PageHeadingProps = {
  /**
   * Children passed inside the component. Most often subcomponents PageHeadingTitle, PageHeadingSubtitle,
   * PageHeadingBreadcrumbs, PageHeadingMeta, PageHeadingActions, etc.
   */
  children: React.ReactNode;

  /**
   * Custom additional class name for the main container component.
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
} & PageHeadingTokensProps;

type PageHeadingTokensProps = {
  tokens?: ComponentTokens<"PageHeading">;
};

type PageHeadingTitleProps = {
  children: React.ReactNode;
  "data-testid"?: string;
} & TokenProps<"PageHeading">;

type PageHeadingSubtitleProps = {
  children: React.ReactNode;
  "data-testid"?: string;
} & TokenProps<"PageHeading">;

type PageHeadingBreadcrumbsProps = {
  /**
   * Breadcrumbs content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Defines the look of the component, as demonstrated in stories of Breadcrumbs.
   */
  variant?: React.ReactElement;
  "data-testid"?: string;
};

type PageHeadingBreadcrumbProps = {
  children: React.ReactNode;
  "data-testid"?: string;
};

type PageHeadingMetaProps = {
  children: React.ReactNode;
  "data-testid"?: string;
} & TokenProps<"PageHeading">;

type PageHeadingActionsProps = {
  children: React.ReactNode;
  "data-testid"?: string;
} & TokenProps<"PageHeading">;

function PageHeading({ children, className, ...props }: PageHeadingProps) {
  const childrenArray = React.Children.toArray(children);
  const tokens = useTokens("PageHeading", props.tokens);

  function findChild(type: string) {
    return childrenArray.find((child) => React.isValidElement(child) && child.props.type === type);
  }

  const title = findChild("PageHeadingTitle");
  const subtitle = findChild("PageHeadingSubtitle");
  const breadcrumbs = findChild("PageHeadingBreadcrumbs");
  const meta = findChild("PageHeadingMeta");
  const actions = findChild("PageHeadingActions");

  return (
    <header data-testid={props["data-testid"]}>
      {breadcrumbs && <div className={tokens.breadcrumbs}>{breadcrumbs}</div>}
      <div className={`${tokens.container} ${className}`}>
        {title && (
          <div className={tokens.master}>
            {title}
            {subtitle}
            {meta}
          </div>
        )}
        {actions}
      </div>
    </header>
  );
}

function PageHeadingBreadcrumbs({ children, variant, ...props }: PageHeadingBreadcrumbsProps) {
  return (
    <Breadcrumbs icon={variant} data-testid={props["data-testid"]}>
      {React.Children.map(children, (child) => {
        return <Breadcrumbs.Breadcrumb>{child}</Breadcrumbs.Breadcrumb>;
      })}
    </Breadcrumbs>
  );
}

PageHeadingBreadcrumbs.defaultProps = {
  type: "PageHeadingBreadcrumbs",
};

function PageHeadingBreadcrumb({ children, ...props }: PageHeadingBreadcrumbProps) {
  return <span data-testid={props["data-testid"]}>{children}</span>;
}

function PageHeadingTitle({ children, ...props }: PageHeadingTitleProps) {
  const tokens = useTokens("PageHeading", props.tokens);

  const pageHeadingTitleClassName = cx(
    tokens.title.master,
    tokens.title.padding,
    tokens.title.fontSize,
    tokens.title.fontWeight,
    tokens.title.lineHeight,
    tokens.title.color,
  );
  return (
    <h2 className={pageHeadingTitleClassName} data-testid={props["data-testid"]}>
      {children}
    </h2>
  );
}

PageHeadingTitle.defaultProps = {
  type: "PageHeadingTitle",
};

function PageHeadingSubtitle({ children, ...props }: PageHeadingSubtitleProps) {
  const tokens = useTokens("PageHeading", props.tokens);

  const pageHeadingSubtitleClassName = cx(
    tokens.subtitle.marginTop,
    tokens.subtitle.fontSize,
    tokens.subtitle.lineHeight,
    tokens.subtitle.color,
  );
  return (
    <p className={pageHeadingSubtitleClassName} data-testid={props["data-testid"]}>
      {children}
    </p>
  );
}

PageHeadingSubtitle.defaultProps = {
  type: "PageHeadingSubtitle",
};

function PageHeadingMeta({ children, ...props }: PageHeadingMetaProps) {
  const tokens = useTokens("PageHeading", props.tokens);

  const pageHeadingMeta = cx(tokens.meta.master, tokens.meta.marginTop);
  return (
    <div className={pageHeadingMeta} data-testid={props["data-testid"]}>
      {React.Children.map(children, (child) => (
        <div className={tokens.meta.child}>{child}</div>
      ))}
    </div>
  );
}

PageHeadingMeta.defaultProps = {
  type: "PageHeadingMeta",
};

function PageHeadingActions({ children, ...props }: PageHeadingActionsProps) {
  const tokens = useTokens("PageHeading", props.tokens);

  const pageHeadingActionsClassName = cx(tokens.actions.master, tokens.actions.marginTop, tokens.actions.marginLeft);

  return (
    <div className={pageHeadingActionsClassName} data-testid={props["data-testid"]}>
      {children}
    </div>
  );
}

PageHeadingActions.defaultProps = {
  type: "PageHeadingActions",
};

PageHeading.Title = PageHeadingTitle;
PageHeading.Subtitle = PageHeadingSubtitle;
PageHeading.Breadcrumbs = PageHeadingBreadcrumbs;
PageHeading.Breadcrumb = PageHeadingBreadcrumb;
PageHeading.Meta = PageHeadingMeta;
PageHeading.Actions = PageHeadingActions;
export default PageHeading;
