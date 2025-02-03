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
import { ComponentTokens, cx, TokenProps, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

export type FieldGroupProps = {
  /**
   * Field content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: string | React.ReactElement;

  /**
   * The help text displayed below the field.
   */
  help?: string | React.ReactElement;

  /**
   * Represents the label above the field.
   */
  label: string | React.ReactElement;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * Displays the field items vertically instead of horizontally by default.
   */
  vertical?: boolean;

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
} & FieldGroupTokens;

export type FieldGroupItemProps = {
  label: string | React.ReactElement;

  help?: string | React.ReactElement;

  id: string;

  children: React.ReactNode;

  className?: string;

  disabled?: boolean;

  "data-testid"?: string;
} & TokenProps<"FieldGroup">;

type FieldGroupTokens = {
  fieldGroupTokens?: ComponentTokens<"FieldGroup">;
  inputTokens?: ComponentTokens<"Input">;
};

function FieldGroup({
  label,
  help,
  error,
  className = "",
  required,
  vertical,
  children,
  ...props
}: FieldGroupProps & FieldGroupTokens) {
  const fieldGroupTokens = useTokens("FieldGroup", props.fieldGroupTokens);
  const inputTokens = useTokens("Input", props.inputTokens);

  const requiredLabelText = useLabel("required", "Required field");

  let errorMessage = error;

  if (errorMessage?.toString().startsWith("intl:")) {
    errorMessage = <Intl name={errorMessage.toString().replace("intl:", "")} />;
  }

  const containerClassName = cx(
    fieldGroupTokens.Group.content.master,
    { [fieldGroupTokens.Group.content.horizontal]: !vertical },
    { [fieldGroupTokens.Group.content.vertical]: vertical },
  );

  return (
    <fieldset data-testid={props["data-testid"]}>
      <legend className={fieldGroupTokens.Group.legend}>
        {label}
        {required && (
          <div className={inputTokens.Required.base} title={requiredLabelText}>
            *
          </div>
        )}
      </legend>
      <p className={fieldGroupTokens.Group.help}>{help}</p>
      <div className={tillerTwMerge(containerClassName, className)}>{children}</div>
      {errorMessage && <p className={fieldGroupTokens.Group.error}>{errorMessage}</p>}
    </fieldset>
  );
}

function FieldGroupItem({ label, help, id, children, className = "", disabled, ...props }: FieldGroupItemProps) {
  const tokens = useTokens("FieldGroup", props.tokens);

  const fieldGroupItemClassName = cx({ [tokens.GroupItem.disabled]: disabled });

  return (
    <div className={tillerTwMerge(fieldGroupItemClassName, className)} data-testid={props["data-testid"]}>
      <div className={tokens.GroupItem.container}>
        <div className={tokens.GroupItem.content}>{children}</div>
        <div className={tokens.GroupItem.info}>
          <label htmlFor={id} className={tokens.GroupItem.label}>
            {label}
          </label>
          <p className={tokens.GroupItem.help}>{help}</p>
        </div>
      </div>
    </div>
  );
}

FieldGroup.Item = FieldGroupItem;
export default FieldGroup;
