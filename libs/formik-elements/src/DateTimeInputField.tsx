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

import { DateTimeInput, DateTimeInputProps } from "@tiller-ds/date";
import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type DateTimeInputOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type DateTimeInputFieldProps = {
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;
} & Omit<DateTimeInputProps, DateTimeInputOnlyPropsUnion>;

export default function DateTimeInputField({ name, allowClear = true, ...props }: DateTimeInputFieldProps) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const onChange = (value: Date) => {
    helpers.setValue(new Date(value), shouldValidate);
    initialError.current = undefined;
  };

  const onReset = () => {
    helpers.setValue("", shouldValidate);
  };

  const onBlur = () => helpers.setTouched(true, shouldValidate);

  const value = field.value ? new Date(field.value) : null;
  return (
    <DateTimeInput
      name={field.name}
      value={value}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
      onChange={onChange}
      onReset={onReset}
      onBlur={onBlur}
      allowClear={allowClear}
      {...props}
    />
  );
}
