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
import * as dateFns from "date-fns";

import { DateInput, DateInputProps } from "@tiller-ds/date";

import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type DateInputOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type DateInputFieldProps = {
  /**
   * The accessor value for the date input field component (for validation, fetching, etc.).
   * The accepted values inferred from the name are either undefined, null, a string in a 'yyyy-mm-dd' format or a Date type.
   * If string is given, the component itself makes sure to convert the string into a Date format.
   * Examples of accepted Date format: 'new Date()', 'new Date("2019-01-20")'.
   */
  name: string;
  /**
   * Allows the clear button (x) to be shown when a value is present in the field.
   * On by default.
   */
  allowClear?: boolean;
} & Omit<DateInputProps, DateInputOnlyPropsUnion>;

export default function DateInputField({ name, allowClear = true, ...props }: DateInputFieldProps) {
  const formik = useFormikContext();
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const onChange = (value: Date | null) => {
    helpers.setValue(value && dateFns.format(value, "yyyy-MM-dd"), shouldValidate);
    initialError.current = undefined;
  };

  const onReset = () => helpers.setValue(null, shouldValidate);

  const compareDatesWithRightToMidnight = (dateLeft: Date, dateRight: Date): number => {
    const dateRightMidnight = dateRight;
    dateRightMidnight.setHours(0, 0, 0, 0);

    return dateFns.compareAsc(dateLeft, dateRightMidnight);
  };

  React.useEffect(() => {
    if (field.value) {
      const currentValueDate = dateFns.parse(field.value, "yyyy-MM-dd", new Date());

      if (props.minDate && compareDatesWithRightToMidnight(currentValueDate, props.minDate) === -1) {
        onReset();
      }

      if (props.maxDate && compareDatesWithRightToMidnight(currentValueDate, props.maxDate) === 1) {
        onReset();
      }
    }
  }, [props.minDate, props.maxDate, field.value, onReset]);

  const onBlur = () => helpers.setTouched(true, shouldValidate);

  return (
    <DateInput
      name={field.name}
      value={
        field.value instanceof Date ? field.value : field.value && dateFns.parse(field.value, "yyyy-MM-dd", new Date())
      }
      onChange={onChange}
      onReset={onReset}
      allowClear={allowClear}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
      onBlur={onBlur}
      {...props}
    />
  );
}
