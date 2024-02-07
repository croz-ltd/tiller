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

import { CheckboxGroup, CheckboxGroupItemProps, CheckboxGroupProps } from "@tiller-ds/form-elements";

import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type CheckboxGroupFieldProps = Omit<CheckboxGroupProps, "value" | "onChange">;
type CheckboxGroupFieldItemProps = CheckboxGroupItemProps;

function CheckboxGroupField({ name, children, ...props }: CheckboxGroupFieldProps) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const onChange = (value: Record<string, boolean>) => {
    helpers.setValue(value, shouldValidate);
    initialError.current = undefined;
  };

  const onBlur = () => {
    helpers.setTouched(true, shouldValidate);
  };

  const isChecked = () => field.value && Object.values(field.value).some((value) => value === true);

  return (
    <CheckboxGroup
      {...props}
      name={name}
      value={field.value || {}}
      onChange={onChange}
      onBlur={onBlur}
      error={meta.touched && !isChecked() ? initialError.current || meta.error : undefined}
    >
      {children}
    </CheckboxGroup>
  );
}

function CheckboxGroupFieldItem(props: CheckboxGroupFieldItemProps) {
  return <CheckboxGroup.Item {...props} />;
}

CheckboxGroupField.Item = CheckboxGroupFieldItem;
export default CheckboxGroupField;
