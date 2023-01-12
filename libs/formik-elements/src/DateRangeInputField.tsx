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

import React from "react";

import * as dateFns from "date-fns";
import { useField, useFormikContext } from "formik";

import { DateRangeInput, DateRangeInputProps } from "@tiller-ds/date";
import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type DateRangeInputOnlyPropsUnion = "name" | "onChange" | "onBlur" | "error" | "start" | "end";

export type DateRangeInputFieldProps = {
  /**
   * Allows the clear button (x) to be shown when a value is present in the field.
   * On by default.
   */
  allowClear?: boolean;

  /**
   * The accessor value for the ending date (for validation, fetching, etc.).
   * Name accessor represents start and end dates combined ('start end').
   * The accepted values inferred from the name are either undefined, null, a string in a 'yyyy-mm-dd' format or a Date type.
   * If string is given, the component itself makes sure to convert the string into a Date format.
   * Examples of accepted Date format: 'new Date()', 'new Date("2019-01-20")'.
   */
  end: string;

  /**
   * The accessor value for the starting date (for validation, fetching, etc.).
   * Name accessor represents start and end dates combined ('start end').
   * The accepted values inferred from the name are either undefined, null, a string in a 'yyyy-mm-dd' format or a Date type.
   * If string is given, the component itself makes sure to convert the string into a Date format.
   * Examples of accepted Date format: 'new Date()', 'new Date("2019-01-20")'.
   */
  start: string;
} & Omit<DateRangeInputProps, DateRangeInputOnlyPropsUnion>;

export default function DateRangeInputField({ start, end, allowClear = true, ...props }: DateRangeInputFieldProps) {
  const [startField, startMeta, startHelpers] = useField(start);
  const [endField, endMeta, endHelpers] = useField(end);
  const shouldValidate = useShouldValidate();
  const initialStartError = useFormikBypass(start);
  const initialEndError = useFormikBypass(end);

  const name = `${startField.name} ${endField.name}`;
  const dateFormat = "yyyy-MM-dd";

  const onChange = (startValue: Date | null, endValue: Date | null) => {
    startHelpers.setValue(startValue && dateFns.format(startValue, dateFormat), shouldValidate);
    endHelpers.setValue(endValue && dateFns.format(endValue, dateFormat), shouldValidate);
    initialStartError.current = undefined;
    initialEndError.current = undefined;
  };

  const onError = () => {
    const startError = startMeta.touched && (initialStartError.current ? initialStartError.current : startMeta.error);
    const endError = endMeta.touched && (initialEndError.current ? initialEndError.current : endMeta.error);

    if (startError && endError) {
      return `${startError} ${endError}`;
    }

    return startError || endError;
  };

  const onReset = React.useCallback(() => {
    startHelpers.setValue(null, shouldValidate);
    endHelpers.setValue(null, shouldValidate);
  }, [endHelpers, startHelpers]);

  const onBlur = () => endHelpers.setTouched(true, shouldValidate);

  return (
    <DateRangeInput
      name={name}
      start={
        startField.value instanceof Date
          ? startField.value
          : startField.value && dateFns.parse(startField.value, dateFormat, new Date())
      }
      end={
        endField.value instanceof Date
          ? endField.value
          : endField.value && dateFns.parse(endField.value, dateFormat, new Date())
      }
      error={onError()}
      onReset={onReset}
      allowClear={allowClear}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
  );
}
