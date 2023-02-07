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

import { useField, useFormikContext } from "formik";

import { Input, InputProps } from "@tiller-ds/form-elements";
import { ComponentTokens } from "@tiller-ds/theme";

import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type InputOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type InputFieldProps = {
  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Determines whether a clear button (X) is shown in the field.
   */
  allowClear?: boolean;

  /**
   * Determines whether the components auto trim whitespace after typing
   */
  autoTrim?: boolean;
} & Omit<InputProps, InputOnlyPropsUnion> &
  InputTokensProps;

type InputTokensProps = {
  tokens?: ComponentTokens<"Input">;
};

export default function InputField({ name, autoTrim = true, ...props }: InputFieldProps) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const onChange = (e) => {
    helpers.setValue(e.target.value, shouldValidate);
    initialError.current = undefined;
  };
  const onReset = () => helpers.setValue("", shouldValidate);

  const onBlur = () => {
    if (autoTrim && field.value) {
      helpers.setValue(field.value.trim(), shouldValidate);
    }
    helpers.setTouched(true, shouldValidate);
  };

  return (
    <Input
      name={field.name}
      value={field.value ?? ""}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
      onChange={onChange}
      onReset={onReset}
      onBlur={onBlur}
      {...props}
    />
  );
}
