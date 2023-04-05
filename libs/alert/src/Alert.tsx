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

type Variant = "warning" | "danger" | "success" | "info";

export type AlertProps = {
  /**
   * Enables the border with border-color-600 (e.g. border-blue-600) property on the left side of the alert (border-l-4).
   */
  accentBorder?: boolean;

  /**
   * Alert content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Custom container (div) className.
   */
  className?: string;

  /**
   * Custom function activated when the alert is clicked.
   */
  onClick?: () => void;

  /**
   * Custom function that determines the behaviour when the mouse pointer is moved out of the component.
   */
  onMouseOut?: () => void;

  /**
   * Custom function that determines the behaviour when the mouse pointer is over the component.
   */
  onMouseOver?: () => void;

  /**
   * Alert title (not exclusively text).
   */
  title?: React.ReactNode;

  /**
   * Style of the alert. Determines the color of the component depending on the variant type.
   */
  variant?: Variant;

  /**
   * Icon shown on the left side of the Alert.
   */
  icon?: React.ReactNode;
} & AlertTokensProps;

type AlertTokensProps = {
  tokens?: ComponentTokens<"Alert">;
};

export default function Alert({
  title,
  icon,
  accentBorder = false,
  variant = "info",
  children,
  className,
  ...props
}: AlertProps) {
  const tokens = useTokens("Alert", props.tokens);

  const alertClassName = cx(
    className,
    tokens.variant[variant].padding,
    { [tokens.variant[variant].color]: accentBorder },
    { [tokens.borderRadius]: !accentBorder },
    tokens.variant[variant].backgroundColor,
    { [tokens.icon.container]: icon },
  );

  const titleClassName = cx(tokens.title.fontSize, tokens.title.fontWeight, tokens.title.color[variant]);

  const textClassName = cx({ [tokens.text.margin]: title }, tokens.text.fontSize, tokens.text.color[variant]);

  return (
    <section className={alertClassName} {...props}>
      {icon}
      <div>
        {title && <p className={titleClassName}>{title}</p>}
        <div className={textClassName}>{children}</div>
      </div>
    </section>
  );
}
