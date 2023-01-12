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

export type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Element = HeadingElement | "p" | "span" | "div";
type Variant = "text" | "subtext" | "title" | "subtitle" | HeadingElement;
type Color = "primary" | "secondary" | "text";
type IconPlacement = "leading" | "trailing";

export type TypographyProps = {
  /**
   * Determines the component that wraps the text.
   */
  element?: Element;

  /**
   * Style of the text.
   */
  variant?: Variant;

  /**
   * Color style of the component.
   */
  color?: Color;

  /**
   * Custom icon.
   */
  icon?: React.ReactNode;

  /**
   * Determines the placement of the Icon in regard to text.
   */
  iconPlacement?: IconPlacement;

  /**
   * Custom container className.
   */
  className?: string;

  /**
   * Children of the component (not exclusively text).
   */
  children: React.ReactNode;
} & TypographyTokensProps;

type TypographyTokensProps = {
  tokens?: ComponentTokens<"Typography">;
};

export default function Typography({
  element: Element = "span",
  variant = "text",
  icon,
  iconPlacement = "leading",
  className = "",
  children,
  ...props
}: TypographyProps) {
  const tokens = useTokens("Typography", props.tokens);

  const containerClassName = cx(tokens.container.base);
  const elementClassName = cx(tokens.variant[variant].fontSize, tokens.variant[variant].color, className);
  const iconClassName = cx(
    tokens.icon[variant],
    tokens.icon.base,
    { [tokens.icon.marginRight]: iconPlacement === "leading" },
    { [tokens.icon.marginLeft]: iconPlacement === "trailing" }
  );

  const elementNode = <Element className={elementClassName}>{children}</Element>;

  if (icon) {
    return (
      <div className={containerClassName}>
        {iconPlacement === "leading" && <div className={iconClassName}>{icon}</div>}
        {elementNode}
        {iconPlacement === "trailing" && <div className={iconClassName}>{icon}</div>}
      </div>
    );
  }

  return <>{elementNode}</>;
}
