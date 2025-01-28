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

import Button, { ButtonProps } from "./Button";

export type ButtonGroupsProps = {
  /**
   * Content which represents button groups.
   * Most often 'ButtonGroups.Button' elements.
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
} & ButtonGroupsTokensProps;

type ButtonGroupsTokensProps = {
  tokens?: ComponentTokens<"ButtonGroups">;
};

export type ButtonGroupsButtonProps = ButtonProps;

type ButtonGroupContext = {
  index: number;
  count: number;
};

const ButtonGroupContext = React.createContext<ButtonGroupContext>({ index: 0, count: 0 });

function ButtonGroups({ children, className, ...props }: ButtonGroupsProps) {
  const tokens = useTokens("ButtonGroups", props.tokens);

  const baseClassName = cx(tokens.master, tokens.base, className);

  return (
    <span className={baseClassName} data-testid={props["data-testid"]}>
      {React.Children.map(children, (child, key) => (
        <ButtonGroupContext.Provider key={key} value={{ index: key, count: React.Children.count(children) }}>
          {child}
        </ButtonGroupContext.Provider>
      ))}
    </span>
  );
}

export function ButtonGroupsButton({
  className = "",
  children,
  color = "primary",
  variant = "outlined",
  disabled,
  onClick,
  size = "md",
  leadingIcon,
  trailingIcon,
  ...props
}: ButtonGroupsButtonProps) {
  const { index, count } = React.useContext(ButtonGroupContext);

  const roundedClassName = cx(
    className,
    "rounded-none -ml-px",
    { "rounded-l-md": index === 0 },
    { "rounded-r-md": index + 1 === count },
  );

  return (
    <Button
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={roundedClassName}
      variant={variant}
      color={color}
      rounded={false}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
      {...props}
    >
      {children}
    </Button>
  );
}

export function ButtonGroupsIconButton({
  onClick,
  disabled,
  children,
  color = "primary",
  variant = "outlined",
  className = "",
  ...props
}: ButtonGroupsButtonProps) {
  const { index, count } = React.useContext(ButtonGroupContext);

  const roundedClassName = cx(
    className,
    { "rounded-l-md": index === 0 },
    { "rounded-r-md -ml-px": index + 1 === count },
  );

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={roundedClassName}
      variant={variant}
      color={color}
      rounded={false}
      {...props}
    >
      {children}
    </Button>
  );
}

ButtonGroups.Button = ButtonGroupsButton;
ButtonGroups.IconButton = ButtonGroupsIconButton;
export default ButtonGroups;
