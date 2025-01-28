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

import { Intl, useLabel } from "@tiller-ds/intl";
import { ComponentTokens, useTokens } from "@tiller-ds/theme";

import Label from "./Label";

export type FieldProps = {
  /**
   * Field content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Optional styling for the field container.
   */
  containerClassName?: string;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;

  /**
   * Optional styling for the field component.
   */
  fieldClassName?: string;

  /**
   * The help text displayed below the field and content defined with addonBelow prop (not exclusively text).
   */
  help?: React.ReactNode;

  /**
   * Unique identifier passed onto the component.
   */
  id?: string;

  /**
   * Represents the label above the field.
   */
  label?: React.ReactNode;

  /**
   * The accessor value for the field component (for validation, fetching, etc.).
   */
  name?: string;

  /**
   * Optional component displayed under the field component and above the help and error.
   * Useful for rendering arbitrary items under the field component.
   */
  addonBelow?: React.ReactNode;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * Text to display when hovering over a required symbol (*).
   * Useful for bilingual purposes.
   */
  requiredLabel?: string;

  /**
   * Tooltip icon and text (on icon hover) displayed on the right of the label.
   */
  tooltip?: React.ReactNode;

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
} & InputTokensProps;

type InputTokensProps = {
  tokens?: ComponentTokens<"Input">;
};

export type FieldLabelProps = {
  id?: string;

  label?: React.ReactNode;

  tooltip?: React.ReactNode;

  required?: boolean;

  requiredLabel?: string;
} & FieldLabelTokensProps;

type FieldLabelTokensProps = {
  fieldTokens?: ComponentTokens<"Field">;
  inputTokens?: ComponentTokens<"Input">;
};

export default function Field({
  id,
  label,
  help,
  tooltip,
  required,
  error,
  containerClassName,
  fieldClassName,
  children,
  addonBelow,
  ...props
}: FieldProps) {
  const tokens = useTokens("Input", props.tokens);
  let errorMessage = error;

  if (errorMessage?.toString().startsWith("intl:")) {
    errorMessage = <Intl name={errorMessage.toString().replace("intl:", "")} />;
  }
  if (typeof errorMessage !== "string" && !React.isValidElement(errorMessage)) {
    errorMessage = "";
  }

  return (
    <div className={containerClassName} data-testid={props["data-testid"]}>
      <FieldLabel id={id} label={label} required={required} tooltip={tooltip} {...props} />
      <div className={fieldClassName}>{children}</div>
      {addonBelow && addonBelow}
      {error
        ? errorMessage && <p className={tokens.ErrorText.base}>{errorMessage}</p>
        : help && <p className={tokens.Help.base}>{help}</p>}
    </div>
  );
}

export function FieldLabel({ id, label, required, tooltip, ...props }: FieldLabelProps) {
  const inputTokens = useTokens("Input", props.inputTokens);
  const fieldTokens = useTokens("Field", props.fieldTokens);

  const requiredLabelText = useLabel("required", "Required field");

  return (
    <Label id={id}>
      <span className="flex">
        {label}
        {required && (
          <div className={inputTokens.Required.base} title={requiredLabelText}>
            *
          </div>
        )}
        {tooltip && <div className={fieldTokens.Tooltip.marginLeft}>{tooltip}</div>}
      </span>
    </Label>
  );
}
