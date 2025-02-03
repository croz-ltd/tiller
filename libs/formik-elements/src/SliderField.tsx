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
import { isArray, isNil, reduce, sum, take } from "lodash";

import { Slider, SliderProps } from "@tiller-ds/form-elements";
import useShouldValidate from "./useShouldValidate";

type SliderFieldProps = Omit<SliderProps, "onChange" | "value"> & {
  /**
   * Function describing what property of the object the component will treat as a value.
   */
  index?: number;

  /**
   * If true, resets the subsequent value when slider is moving.
   */
  resetAllSubsequent?: boolean;
};

export default function SliderField({ name, index, resetAllSubsequent, ...props }: SliderFieldProps) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();

  const cleanNext = (current: number[], index: number) => {
    for (let i = index + 1; i < current.length; i++) {
      delete current[i];
    }
  };

  const shouldChangeValue = (current: number[], index: number, value: number) => {
    if (index === 0) {
      return true;
    }

    const previousValue = props.stacked ? sum(take(current, index)) : current[index - 1];
    return value >= previousValue;
  };

  const onChange = (value: number) => {
    if (isNil(index)) {
      helpers.setValue(value);
    } else {
      const current = isArray(field.value) ? [...field.value] : [];

      if (shouldChangeValue(current, index, value)) {
        if (resetAllSubsequent) {
          cleanNext(current, index);
        }

        if (props.stacked && index > 0) {
          const collection = current.slice(0, index);
          const stackValue = reduce(collection, (acc: number, current: number) => acc + (current || 0), 0);

          current[index] = value - stackValue;
        } else {
          current[index] = value;
        }

        helpers.setValue(current, shouldValidate);
      }
    }
  };

  return (
    <Slider
      {...props}
      {...field}
      error={meta.touched && meta.error}
      onChange={onChange}
      data-testid={name ?? props["data-testid"]}
    />
  );
}
