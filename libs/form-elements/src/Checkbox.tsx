/*
 *    Copyright 2025 CROZ d.o.o, the original author or authors.
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

import { uniqueId } from "lodash";

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

type CheckboxColor = "primary" | "secondary" | "tertiary" | "info" | "danger" | "warning" | "success" | "white";

export type CheckboxProps = {
  /**
   * The color of the checkbox (CheckboxColor type).
   */
  color?: CheckboxColor;

  /**
   * The label written on the right side of the checkbox (not exclusively text).
   */
  label?: React.ReactNode;

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
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
} & Omit<React.HTMLProps<HTMLInputElement>, "label"> &
  CheckboxTokensProps;

type CheckboxTokensProps = {
  checkboxTokens?: ComponentTokens<"Checkbox">;
};

export default function Checkbox({ id, label, color = "primary", className, ...props }: CheckboxProps) {
  const tokens = useTokens("Checkbox", props.checkboxTokens);
  const [defaultId] = React.useState(uniqueId("checkbox-"));
  const [isChecked, setIsChecked] = React.useState(props.checked);

  React.useEffect(() => {
    setIsChecked(props.checked);
  }, [props.checked]);

  const checkboxClassName = cx(
    tokens.master,
    tokens.transition,
    tokens.backgroundColor,
    tokens.border,
    tokens.borderRadius,
    tokens.boxShadow,
    tokens.color[color],
    { [tokens.disabled]: props.disabled },
  );

  const labelClassName = cx(tokens.label.fontSize, tokens.label.color, tokens.label.padding, {
    [tokens.disabled]: props.disabled,
  });

  return (
    <div className={tokens.container}>
      <input
        type="checkbox"
        id={id || defaultId}
        className={tillerTwMerge(checkboxClassName, className)}
        {...props}
        checked={isChecked}
        onClick={() => setIsChecked(!isChecked)}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e")`,
        }}
        data-testid={props["data-testid"]}
      />
      {label && (
        <label htmlFor={id || defaultId} className={labelClassName}>
          {label}
        </label>
      )}
    </div>
  );
}
