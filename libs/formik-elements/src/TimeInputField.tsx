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

import { useField } from "formik";

import { TimeInput, TimeInputProps } from "@tiller-ds/date";

import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type TimeInputOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type TimeInputFieldProps = {
  /**
   * Allows the clear button (x) to be shown when a value is present in the field.
   * On by default.
   */
  allowClear?: boolean;
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;
} & Omit<TimeInputProps, TimeInputOnlyPropsUnion>;

export default function TimeInputField({ name, allowClear = true, ...props }: TimeInputFieldProps) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const onChange = (value: string | null) => {
    helpers.setValue(value ? value : null, shouldValidate);
    initialError.current = undefined;
  };

  const onReset = () => {
    helpers.setTouched(true, shouldValidate);
    helpers.setValue(null, shouldValidate);
  };

  return (
    <TimeInput
      name={field.name}
      value={field.value}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
      onChange={onChange}
      onReset={onReset}
      allowClear={allowClear}
      {...props}
    />
  );
}
