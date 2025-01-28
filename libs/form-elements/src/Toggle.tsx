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

import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";

import Field, { FieldProps } from "./Field";

export type ToggleProps = {
  /**
   * If true, the Toggle is rendered in an active state.
   */
  checked?: boolean;

  /**
   * Icon specified in an active state of the toggle.
   */
  checkedIcon?: React.ReactElement;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string;

  /**
   * Determines whether the component is disabled.
   */
  disabled?: boolean;

  /**
   * Function fired when the toggle is clicked.
   */
  onClick?: () => void;

  /**
   * Icon specified in an inactive state of the toggle.
   */
  uncheckedIcon?: React.ReactElement;

  /**
   * Changes the default layout of the component to show the label before the toggle component.
   * Defaults to false.
   */
  reverse?: boolean;
} & Omit<FieldProps, "children" | "hint" | "help"> &
  ToggleTokensProps;

type ToggleTokensProps = {
  tokens?: ComponentTokens<"Toggle">;
};

export default function Toggle({
  className,
  checked,
  label,
  onClick,
  checkedIcon,
  uncheckedIcon,
  disabled,
  reverse,
  ...props
}: ToggleProps) {
  const tokens = useTokens("Toggle", props.tokens);

  const divClassName = cx(className, tokens.container);

  const checkboxClassName = cx(
    tokens.base,
    { [tokens.backgroundColor]: checked },
    { [tokens.gray]: !checked },
    { [tokens.disabled]: disabled },
  );

  const toggleClassName = cx(
    tokens.toggle,
    { "translate-x-5": checked },
    { "translate-x-0": !checked },
    { [tokens.disabled]: disabled },
  );

  const labelClassName = cx(tokens.label.fontSize, tokens.label.color, tokens.label.padding, {
    [tokens.disabled]: disabled,
  });

  const iconClassName = cx(tokens.icon.master, tokens.icon.margin);

  const finalCheckedIcon = useIcon("completed", checkedIcon, {
    className: iconClassName,
    size: tokens.icon.size,
  });

  const finalUncheckedIcon = useIcon("dismiss", uncheckedIcon, {
    className: iconClassName,
    size: tokens.icon.size,
  });

  return (
    <div className={divClassName}>
      <Field {...props} data-testid={props["data-testid"] && `${props["data-testid"]}-wrapper`}>
        <div className={tokens.master}>
          {reverse && label && <label className={labelClassName}>{label}</label>}
          <span
            role="checkbox"
            aria-checked={checked}
            tabIndex={0}
            onClick={onClick}
            className={checkboxClassName}
            data-testid={props["data-testid"]}
          >
            <span className={toggleClassName}>{checked ? finalCheckedIcon : finalUncheckedIcon}</span>
          </span>
          {!reverse && label && <label className={labelClassName}>{label}</label>}
        </div>
      </Field>
    </div>
  );
}
