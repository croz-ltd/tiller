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

import React from "react";

import { useField, useFormikContext } from "formik";

import { NumberInput, NumberInputProps } from "@tiller-ds/form-elements";

import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type NumberInputOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type NumberInputFieldProps = {
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;
} & Omit<NumberInputProps, NumberInputOnlyPropsUnion>;

export default function NumberInputField({ name, ...props }: NumberInputFieldProps) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const onChange = (value?: number) => {
    helpers.setValue(value, shouldValidate);
    initialError.current = undefined;
  };

  const onBlur = () => helpers.setTouched(true, shouldValidate);

  return (
    <NumberInput
      name={field.name}
      value={field.value ?? ""}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
      data-testid={name ?? props["data-testid"]}
    />
  );
}
