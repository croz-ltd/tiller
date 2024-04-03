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

import { Container } from "@tiller-ds/core";
import { ComponentTokens, cx, TokenProps, useTokens } from "@tiller-ds/theme";
import { createNamedContext, useWindowEvent } from "@tiller-ds/util";

type StackedLayoutProps = {
  /**
   * Defines the color of the background.
   */
  background?: "white" | "gray";

  /**
   * Stacked Layout content, most often its subcomponents 'StackedLayout.Heading' and 'StackedLayout.Content'
   */
  children: React.ReactNode;

  /**
   * Defines the variant for the container (each one differs by width, margins and padding).
   */
  containerVariant?: "max" | "fullWidth" | "constrainedPadded" | "fullWidthContainer" | "narrowConstrained" | undefined;

  /**
   * Defines whether the position of the navigation is fixed to the top of the screen.
   */
  isFixed?: boolean;

  /**
   * Defines a navigation component displayed at the top of the stacked layout.
   * Typically, TopNavigation.
   */
  navigation: React.ReactNode;

  /**
   * Defines whether the StackedLayout header statys fixed or hides when page is scrolled.
   * Defaults to true.
   */
  hideOnScroll?: boolean;

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
} & StackedLayoutTokensProps;

type StackedLayoutTokensProps = {
  tokens?: ComponentTokens<"StackedLayout">;
};

type StackedLayoutHeadingProps = {
  headerCompact?: boolean;
  headerBackground?: "transparent" | "white";
  containerVariant?: "max" | "fullWidth" | "constrainedPadded" | "fullWidthContainer" | "narrowConstrained" | undefined;
  children: React.ReactNode;
} & TokenProps<"StackedLayout">;

StackedLayoutHeading.defaultProps = {
  type: "StackedLayoutHeading",
};

type StackedLayoutContentProps = {
  containerVariant?: "max" | "fullWidth" | "constrainedPadded" | "fullWidthContainer" | "narrowConstrained" | undefined;
  children: React.ReactNode;
};

StackedLayoutContent.defaultProps = {
  type: "StackedLayoutContent",
};

type StackedLayoutContext = {
  containerVariant?: "max" | "fullWidth" | "constrainedPadded" | "fullWidthContainer" | "narrowConstrained" | undefined;
  isScrolling?: boolean;
  isFixed?: boolean;
};

const StackedLayoutContext = createNamedContext<StackedLayoutContext>("StackedLayoutContext");

function StackedLayout({
  containerVariant = "fullWidth",
  navigation,
  isFixed,
  children,
  background = "gray",
  hideOnScroll = true,
  className,
  ...props
}: StackedLayoutProps) {
  const tokens = useTokens("StackedLayout", props.tokens);
  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);

  const navigationContainerClassName = cx({
    [tokens.navigationContainer.fixed]: isFixed,
    [tokens.navigationContainer.scrolled]: isScrolling,
  });

  const containerClassName = cx(
    className,
    tokens.master,
    { [tokens.backgroundColor]: background === "white" },
    { [tokens.grayBackgroundColor]: background !== "white" }
  );

  useWindowEvent("scroll", () => {
    if (hideOnScroll) {
      if (window.pageYOffset > 80) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }
  });

  return (
    <StackedLayoutContext.Provider value={{ containerVariant, isScrolling, isFixed }}>
      <div className={containerClassName}>
        <div className={navigationContainerClassName}>
          {navigation}
        </div>
        {children}
      </div>
    </StackedLayoutContext.Provider>
  );
}

function StackedLayoutHeading({
  children,
  headerCompact = false,
  headerBackground = "transparent",
  ...props
}: StackedLayoutHeadingProps) {
  const tokens = useTokens("StackedLayout", props.tokens);
  const layoutContext = React.useContext(StackedLayoutContext) as StackedLayoutContext;

  const headingContainerClassName = cx({
    [tokens.heading.fixed]: layoutContext?.isFixed,
  });

  const headingClassName = cx(
    { [tokens.backgroundColor]: headerBackground === "transparent" },
    { [tokens.compactPadding]: headerCompact },
    { [tokens.padding]: !headerCompact }
  );

  return (
    <div className={headingContainerClassName}>
      <div className={headingClassName}>
        <Container variant={layoutContext.containerVariant}>{children}</Container>
      </div>
    </div>
  );
}

function StackedLayoutContent({ containerVariant = "fullWidth", children }: StackedLayoutContentProps) {
  const tokens = useTokens("StackedLayout");

  return (
    <Container variant={containerVariant}>
      <main className={tokens.contentContainer}>{children}</main>
    </Container>
  );
}

StackedLayout.Heading = StackedLayoutHeading;
StackedLayout.Content = StackedLayoutContent;
export default StackedLayout;
