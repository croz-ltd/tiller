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

import { isEqual } from "lodash";

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ButtonProps = {
  /**
   * Button content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Custom additional class name for the button component.
   */
  className?: string;

  /**
   * Determines whether the button is hidden.
   */
  hidden?: boolean;

  /**
   * The unique identifier of the button.
   */
  id?: string;

  /**
   * Optional ref property to pass onto the HTML button component.
   */
  buttonRef?: React.Ref<HTMLButtonElement>;

  /**
   * Icon on the left side of the button text.
   */
  leadingIcon?: React.ReactNode;

  /**
   * Determines whether the button serves as a menu button when combined with a trailing icon.
   */
  menu?: boolean;

  /**
   * Determines whether the button is rounded or not.
   */
  rounded?: boolean;

  /**
   * Determines the size (5 options) of the button.
   */
  size?: ButtonSize;

  /**
   * Icon on the right side of the button text.
   */
  trailingIcon?: React.ReactNode;

  /**
   * Determines the variant (look) of the button.
   */
  variant?: "filled" | "outlined" | "text";
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
  ButtonTokensProps;

type ButtonTokensProps = {
  tokens?: ComponentTokens<"Button">;
};

export default function Button({
  id,
  variant = "filled",
  size = "md",
  color = "primary",
  className = "",
  disabled = false,
  leadingIcon,
  trailingIcon,
  children,
  hidden = false,
  menu,
  rounded = true,
  buttonRef,
  ...props
}: ButtonProps) {
  const tokens = useTokens("Button", props.tokens);

  const buttonClassName = cx(
    { hidden: hidden },
    { [tokens.disabled.opacity]: disabled },
    tokens.master,
    tokens.base.focus,
    tokens.size[size],
    { [tokens.base.borderRadius]: rounded },
    { [tokens.variant[variant].base.master]: !isEqual(props.tokens, {}) },
    { [tokens.variant[variant].color[color].textColor]: !isEqual(props.tokens, {}) },
    { [tokens.variant[variant].color[color].backgroundColor]: !isEqual(props.tokens, {}) },
    { [tokens.variant[variant].color[color].borderColor]: !isEqual(props.tokens, {}) },
    { [tokens.variant[variant].color[color].hover]: !isEqual(props.tokens, {}) && !disabled },
    { [tokens.variant[variant].color[color].shadow]: !isEqual(props.tokens, {}) },
    className
  );

  const leadingIconClassName = cx(tokens.leadingIcon[size], "flex justify-center items-center");
  const trailingIconClassName = cx(tokens.trailingIcon[size], "flex justify-center items-center");

  return (
    <button ref={buttonRef} className={buttonClassName} id={id} data-testid={id} disabled={disabled} {...props}>
      {leadingIcon && React.cloneElement(leadingIcon as React.ReactElement, { className: leadingIconClassName })}
      {children}
      {trailingIcon &&
        React.cloneElement(trailingIcon as React.ReactElement, { className: menu ? "" : trailingIconClassName })}
    </button>
  );
}
