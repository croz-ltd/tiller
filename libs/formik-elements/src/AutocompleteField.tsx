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
import { isEqual } from "lodash";

import { Autocomplete, AutocompleteProps } from "@tiller-ds/selectors";

import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type AutocompleteOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type AutocompleteFieldProps<T> = {
  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Function describing what property of the object the component will treat as a value. Required because
   * comparison between objects requires a unique value (typically id) to properly compare them.
   * By default, value(s) determined by this function also serves as value(s) sent on form submit
   * (if not overridden by 'sendOptionValue' prop).
   * Ex. (item: Item) => item.id
   */
  getOptionValue?: (item: T) => unknown;

  /**
   * Optional prop for overriding the default behaviour of the component which is to send values set by 'getOptionValue' prop on submit.
   * Turn this prop off if you wish to send whole objects on submit instead of a value/array of values determined by 'getOptionValue'.
   * On by default.
   */
  sendOptionValue?: boolean;
} & Omit<AutocompleteProps<T>, AutocompleteOnlyPropsUnion>;

export default function AutocompleteField<T>({
  name,
  options,
  getOptionValue,
  sendOptionValue = true,
  ...props
}: AutocompleteFieldProps<T>) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const [value, setValue] = React.useState<T | T[] | undefined>(field.value && field.value);

  React.useEffect(() => {
    if (!Array.isArray(options)) {
      if (getOptionValue && sendOptionValue && value !== undefined) {
        if (Array.isArray(value)) {
          helpers.setValue(value.map(getOptionValue), shouldValidate);
        } else if (value) {
          helpers.setValue(getOptionValue(value), shouldValidate);
        }
      } else {
        helpers.setValue(value, shouldValidate);
      }
    } else if (getOptionValue && sendOptionValue) {
      if (Array.isArray(value)) {
        helpers.setValue(value.map(getOptionValue), shouldValidate);
      } else if (value) {
        helpers.setValue(getOptionValue(value), shouldValidate);
      }
    } else {
      helpers.setValue(value, shouldValidate);
    }
  }, []);

  const lastFieldValue = React.useRef<unknown>(null);
  React.useEffect(() => {
    if (getOptionValue && field.value && !isEqual(lastFieldValue.current, field.value)) {
      if (Array.isArray(field.value)) {
        helpers.setValue(field.value.map(getOptionValue), shouldValidate);
        lastFieldValue.current = field.value.map(getOptionValue);
      } else {
        helpers.setValue(getOptionValue(field.value), shouldValidate);
        lastFieldValue.current = getOptionValue(field.value);
        initialError.current = undefined;
      }
      setValue(field.value);
      initialError.current = undefined;
    } else if (!field.value || (Array.isArray(field.value) && field.value.length === 0)) {
      lastFieldValue.current = undefined;
      setValue(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  const onReset = () => {
    helpers.setValue(undefined, shouldValidate);
    setValue(undefined);
  };

  const onChange = (item: T | T[] | undefined) => {
    if (item) {
      setValue(item);
      if (getOptionValue && sendOptionValue) {
        if (Array.isArray(item)) {
          lastFieldValue.current = item.map(getOptionValue);
          helpers.setValue(item.map(getOptionValue), shouldValidate);
        } else {
          lastFieldValue.current = getOptionValue(item);
          helpers.setValue(getOptionValue(item), shouldValidate);
        }
      } else {
        lastFieldValue.current = item;
        helpers.setValue(item, shouldValidate);
      }
    } else {
      setValue(undefined);
      helpers.setValue(item, shouldValidate);
    }
    initialError.current = undefined;
  };

  const onBlur = () => helpers.setTouched(true, shouldValidate);

  return (
    <Autocomplete
      name={name}
      options={options}
      getOptionValue={getOptionValue}
      {...props}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onReset={onReset}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
    />
  );
}
