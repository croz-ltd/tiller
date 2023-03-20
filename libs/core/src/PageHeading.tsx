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
} & PageHeadingTokensProps;

type PageHeadingTokensProps = {
  tokens?: ComponentTokens<"PageHeading">;
};

type PageHeadingTitleProps = {
  children: React.ReactNode;
} & TokenProps<"PageHeading">;

type PageHeadingSubtitleProps = {
  children: React.ReactNode;
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
};

type PageHeadingBreadcrumbProps = {
  children: React.ReactNode;
};

type PageHeadingMetaProps = {
  children: React.ReactNode;
} & TokenProps<"PageHeading">;

type PageHeadingActionsProps = {
  children: React.ReactNode;
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
    <header>
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

function PageHeadingBreadcrumbs({ children, variant }: PageHeadingBreadcrumbsProps) {
  return (
    <Breadcrumbs icon={variant}>
      {React.Children.map(children, (child) => {
        return <Breadcrumbs.Breadcrumb>{child}</Breadcrumbs.Breadcrumb>;
      })}
    </Breadcrumbs>
  );
}

PageHeadingBreadcrumbs.defaultProps = {
  type: "PageHeadingBreadcrumbs",
};

function PageHeadingBreadcrumb({ children }: PageHeadingBreadcrumbProps) {
  return <>{children}</>;
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
  return <h2 className={pageHeadingTitleClassName}>{children}</h2>;
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
  return <p className={pageHeadingSubtitleClassName}>{children}</p>;
}

PageHeadingSubtitle.defaultProps = {
  type: "PageHeadingSubtitle",
};

function PageHeadingMeta({ children, ...props }: PageHeadingMetaProps) {
  const tokens = useTokens("PageHeading", props.tokens);

  const pageHeadingMeta = cx(tokens.meta.master, tokens.meta.marginTop);
  return (
    <div className={pageHeadingMeta}>
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

  return <div className={pageHeadingActionsClassName}>{children}</div>;
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
