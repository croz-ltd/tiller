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

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";

import { Container } from "@tiller-ds/core";

type SidebarLayoutProps = {
  /**
   * Content inside the sidebar layout, most often its subcomponents 'SidebarLayout.Heading' and 'SidebarLayout.Content'.
   */
  children: React.ReactNode;

  /**
   * Navigation component placed on the left side. Most often 'SidebarNavigation' component.
   */
  navigation: React.ReactNode;

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
} & SidebarLayoutTokensProps;

type SidebarLayoutTokensProps = {
  tokens?: ComponentTokens<"SidebarLayout">;
};

type SidebarLayoutHeadingProps = {
  children: React.ReactNode;
};

type SidebarLayoutContentProps = {
  children: React.ReactNode;
};

function SidebarLayout({ navigation, children, className, ...props }: SidebarLayoutProps) {
  const tokens = useTokens("SidebarLayout", props.tokens);

  const containerClassName = cx(
    "h-screen flex overflow-hidden flex-col md:flex-row",
    tokens.backgroundColor,
    className
  );

  const contentClassName = cx("flex-1 relative z-0 overflow-y-auto", tokens.padding, "focus:outline-none");

  return (
    <div className={containerClassName}>
      {navigation}
      <div className={contentClassName}>
        <main>
          <Container>{children}</Container>
        </main>
      </div>
    </div>
  );
}

function SidebarLayoutHeading({ children }: SidebarLayoutHeadingProps) {
  return <Container>{children}</Container>;
}

function SidebarLayoutContent({ children }: SidebarLayoutContentProps) {
  return (
    <main>
      <Container>
        <div className="py-4">{children}</div>
      </Container>
    </main>
  );
}

SidebarLayout.Heading = SidebarLayoutHeading;
SidebarLayout.Content = SidebarLayoutContent;
export default SidebarLayout;
