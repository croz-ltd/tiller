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

type BadgeColor = "primary" | "secondary" | "tertiary" | "info" | "danger" | "warning" | "success" | "white";

type Variant = "filled" | "outlined";

export type BadgeProps = {
  /**
   * Badge content (not exclusively text).
   */
  children?: React.ReactNode;

  /**
   * Custom additional class name for the badge component.
   */
  className?: string;

  /**
   * The color of the badge (BadgeColor type).
   */
  color?: BadgeColor;

  /**
   * Enables the dot display on the left side of the badge text.
   */
  dot?: boolean;

  /**
   * Defines the behaviour when the badge is clicked.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * Automatically enables the remove button on the right side of the text and
   * defines the behaviour the button is clicked.
   */
  onRemoveButtonClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * Changes the look of the badge by reducing the padding, leading and
   * changing the roundness to 'rounded-full'.
   */
  small?: boolean;

  /**
   * A unique identifier for testing purposes, equivalent to the `data-testid` attribute.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent testId="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  testId?: string;

  /**
   * Determines whether the style of the badge is 'filled' (text-color-800, bg-color-100)
   * or 'outlined' (border-color-500, text-color-500)
   */
  variant?: Variant;
} & BadgeTokensProps;

type BadgeTokensProps = {
  tokens?: ComponentTokens<"Badge">;
};

export type BadgeDotProps = {
  color?: BadgeColor;
  variant: Variant;
} & TokenProps<"Badge">;

export type BadgeRemoveButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  small?: boolean;
  testId?: string;
  variant: Variant;
  color?: BadgeColor;
} & TokenProps<"Badge">;

export default function Badge({
  children,
  color = "primary",
  small,
  dot,
  className = "",
  variant = "filled",
  onClick,
  onRemoveButtonClick,
  ...props
}: BadgeProps) {
  const tokens = useTokens("Badge", props.tokens);

  const containerClassName = cx(
    className,
    { [tokens.base.padding]: !small },
    { [tokens.base.lineHeight]: !small },
    { [tokens.small.padding]: small },
    { [tokens.small.lineHeight]: small },
    tokens.master,
    tokens.variant[variant].base,
    tokens.variant[variant].color[color].base,
  );

  return (
    <span className={containerClassName} data-testid={props.testId} onClick={onClick}>
      {dot && <BadgeDot color={color} variant={variant} />}
      {children}
      {onRemoveButtonClick && (
        <BadgeRemoveButton
          color={color}
          small={small}
          variant={variant}
          onClick={onRemoveButtonClick}
          testId={props.testId}
        />
      )}
    </span>
  );
}

function BadgeDot({ color = "white", variant = "filled", ...props }: BadgeDotProps) {
  const tokens = useTokens("Badge", props.tokens);

  const className = cx(tokens.variant[variant].color[color].dot, "mr-1.5 h-2 w-2");

  return (
    <svg className={className} fill="currentColor" viewBox="0 0 8 8">
      <circle cx="4" cy="4" r="3" />
    </svg>
  );
}

function BadgeRemoveButton({ color = "white", small, onClick, testId, variant, ...props }: BadgeRemoveButtonProps) {
  const tokens = useTokens("Badge", props.tokens);

  const className = cx(tokens.variant[variant].color[color].removeIcon, {
    "flex-shrink-0 ml-1.5 inline-flex focus:outline-none ": true,
    "-mr-0.5": small,
  });

  const buttonId = testId && `remove-button-${testId}`;

  return (
    <button type="button" data-testid={buttonId} className={className} onClick={onClick}>
      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
      <span className="sr-only">Remove</span>
    </button>
  );
}
