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

import Field from "./Field";

export type TextareaProps = {
  /**
   * Custom class name for the field container.
   */
  className?: string;

  /**
   * Enables or disables the component's functionality.
   */
  disabled?: boolean;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;

  /**
   * The help text displayed below the text area field.
   */
  help?: React.ReactNode;

  /**
   * Represents the label above the text area field (not exclusively text).
   */
  label?: React.ReactNode;

  /**
   * The accessor value for the text area field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * The placeholder displayed inside the text area field.
   */
  placeholder?: string;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * Custom class name for the textarea container.
   */
  textareaClassName?: string;

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

  /**
   * Tooltip icon and text (on icon hover) displayed on the right of the label.
   */
  tooltip?: React.ReactNode;

  /**
   * The value of the field sent on submit and/or retrieved on component render (in string format).
   */
  value: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> &
  TextareaTokensProps;

type TextareaTokensProps = {
  tokens?: ComponentTokens<"Textarea">;
};

export default function Textarea({
  name,
  value,
  label,
  placeholder,
  tooltip,
  help,
  required,
  error,
  disabled,
  className,
  textareaClassName = "",
  ...props
}: TextareaProps) {
  const tokens = useTokens("Textarea", props.tokens);

  const textareaComponentClassName = cx(
    "w-full block",
    textareaClassName,
    tokens.master,
    tokens.fontSize,
    { [tokens.borderColor]: !error },
    tokens.borderRadius,
    tokens.padding,
    { [tokens.boxShadow]: !error },
    { [tokens.error.borderColor]: error },
    { [tokens.error.color]: error },
    { [tokens.error.placeholder]: error },
    { [tokens.error.boxShadow]: error },
    { [tokens.disabled]: disabled },
  );

  const inputContainerClassName = cx("relative", tokens.container.base, { [tokens.container.withLabel]: label });

  const id = `textarea-${name}`;

  return (
    <Field
      id={id}
      label={label}
      help={help}
      required={required}
      tooltip={tooltip}
      error={error}
      containerClassName={className}
      fieldClassName={inputContainerClassName}
    >
      <textarea
        name={name}
        id={id}
        data-testid={props["data-testid"] || id}
        value={value}
        className={textareaComponentClassName}
        disabled={disabled}
        placeholder={placeholder}
        {...props}
      />
    </Field>
  );
}
