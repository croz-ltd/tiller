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

import * as React from "react";

import { useField } from "formik";

import { RadioGroup, RadioGroupItemProps, RadioGroupProps } from "@tiller-ds/form-elements";

import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type RadioGroupFieldProps = Omit<RadioGroupProps, "value" | "onChange" | "error">;

type RadioGroupFieldItemProps = RadioGroupItemProps;

function RadioGroupField({ name, children, ...props }: RadioGroupFieldProps) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const onChange = (value: string | boolean | null) => {
    helpers.setValue(value, shouldValidate);
    initialError.current = undefined;
  };

  const onBlur = () => {
    helpers.setTouched(true, shouldValidate);
  };

  return (
    <RadioGroup
      {...props}
      name={name}
      value={field.value || {}}
      onChange={onChange}
      onBlur={onBlur}
      error={meta.touched && !field.value ? initialError.current || meta.error : undefined}
      data-testid={name ?? props["data-testid"]}
    >
      {children}
    </RadioGroup>
  );
}

function RadioGroupFieldItem(props: RadioGroupFieldItemProps) {
  return <RadioGroup.Item {...props} data-testid={props.value ?? props["data-testid"]} />;
}

RadioGroupField.Item = RadioGroupFieldItem;
export default RadioGroupField;
