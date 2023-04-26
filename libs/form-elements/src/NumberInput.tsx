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

import { default as ReactNumberFormat, NumberFormatProps } from "react-number-format";

import { useIntlContext } from "@tiller-ds/intl";

import Input from "./Input";

import { getDecimalSeparator } from "./getDecimalSeparator";
import { getThousandSeparator } from "./getThousandSeparator";

type NumberFormatOnlyPropsUnion =
  | "allowedDecimalSeparators"
  | "any"
  | "customInput"
  | "decimalSeparator"
  | "onValueChange"
  | "step"
  | "type"
  | "thousandSeparator"
  | "max"
  | "min";

export type NumberInputProps = {
  /**
   * Custom additional styling applied to the component.
   */
  className?: string;

  /**
   * Custom decimal separator (e.g. "," or ".").
   *
   * If not provided, it will be inferred from the IntlProvider.
   */
  decimalSeparator?: string;

  /**
   * Determines whether the component is disabled.
   */
  disabled?: boolean;

  /**
   * Value passed through from validation indicating to display the error on the component.
   */
  error?: React.ReactNode;

  /**
   * The help text displayed below the text input field.
   */
  help?: React.ReactNode;

  /**
   * Represents the label above the number input field.
   */
  label?: React.ReactNode;

  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Function that handles the behaviour of the component once its state changes.
   */
  onChange?: (value: number | undefined) => void;

  /**
   * The placeholder displayed inside the number input field.
   */
  placeholder?: string;

  /**
   * Turns this field into a required field in the form. Only applies visual representation (* next to label),
   * still requires validation on frontend or backend to accompany this value if set to true.
   */
  required?: boolean;

  /**
   * Custom thousand separator (e.g. "." or ",").
   *
   * If not provided, it will be inferred from the IntlProvider.
   */
  thousandSeparator?: string;

  /**
   * The value of the field sent on submit and/or retrieved on component render.
   */
  value?: string;
} & Omit<NumberFormatProps, NumberFormatOnlyPropsUnion>;

export default function NumberInput({
  name,
  onChange,
  onBlur,
  decimalSeparator,
  thousandSeparator,
  ...props
}: NumberInputProps) {
  const intlContext = useIntlContext();
  const id = `numberformat-${name}`;

  if (!intlContext && (!decimalSeparator || !thousandSeparator)) {
    throw new Error(
      "You must pass decimalSeparator and thousandSeparator props if you are using the NumberInput component without IntlProvider.",
    );
  }
  const getFinalDecimalSeparator = () => {
    if (decimalSeparator && thousandSeparator) {
      return decimalSeparator;
    }
    if (intlContext) {
      const { intl } = intlContext;
      return getDecimalSeparator(intl);
    }
  };

  const getFinalThousandSeparator = () => {
    if (decimalSeparator && thousandSeparator) {
      return thousandSeparator;
    }
    if (intlContext) {
      const { intl } = intlContext;
      return getThousandSeparator(intl);
    }
  };

  const finalDecimalSeparator = getFinalDecimalSeparator() as string;
  const finalThousandSeparator = getFinalThousandSeparator() as string;

  return (
    <ReactNumberFormat
      id={id}
      data-testid={id}
      name={name}
      decimalSeparator={finalDecimalSeparator}
      thousandSeparator={finalThousandSeparator}
      allowedDecimalSeparators={[finalDecimalSeparator]}
      onValueChange={(values) => {
        if (onChange) {
          onChange(values.floatValue);
        }
      }}
      customInput={Input}
      onBlur={onBlur}
      {...props}
    />
  );
}
