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

import { useField } from "formik";
import { isEqual, isNil } from "lodash";

import { Select, SelectProps } from "@tiller-ds/selectors";
import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type SelectOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type SelectFieldProps<T> = {
  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Function describing what property of the object the component will treat as a value.
   */
  getOptionValue?: (item: T) => unknown;
} & Omit<SelectProps<T>, SelectOnlyPropsUnion>;

function find<T>(value: T, arr: T[]) {
  return arr.findIndex((item) => isEqual(item, value));
}

function SelectField<T>({ name, getOptionValue, children, options, ...props }: SelectFieldProps<T>) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const optionsToValues = React.useMemo(() => {
    if (getOptionValue) {
      return options.map(getOptionValue);
    } else {
      return options;
    }
  }, [options, getOptionValue]);

  const valueFn = (option: T) => optionsToValues[find(option, options)];

  const optionFn = (value: unknown) => options[find(value, optionsToValues)] || (value as T);

  const value = field.value && (Array.isArray(field.value) ? field.value.map(optionFn) : optionFn(field.value));

  const onChange = (item: T | T[] | undefined) => {
    if (!isNil(item)) {
      if (Array.isArray(item)) {
        helpers.setValue(item.map(valueFn), shouldValidate);
      } else {
        helpers.setValue(valueFn(item), shouldValidate);
      }
    } else {
      helpers.setTouched(true, shouldValidate);
      helpers.setValue(item, shouldValidate);
    }
    initialError.current = undefined;
  };

  const onBlur = () => helpers.setTouched(true, shouldValidate);

  return (
    <Select
      name={field.name}
      options={options}
      value={value}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
      onBlur={onBlur}
      onChange={onChange}
      {...props}
      data-testid={name ?? props["data-testid"]}
    >
      {children}
    </Select>
  );
}

export default SelectField;
