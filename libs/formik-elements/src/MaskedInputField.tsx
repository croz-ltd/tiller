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

import { useField, useFormikContext } from "formik";

import { MaskedInput, MaskedInputProps } from "@tiller-ds/form-elements";
import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type MaskedInputOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type MaskedInputFieldProps = {
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;
} & Omit<MaskedInputProps, MaskedInputOnlyPropsUnion>;

export default function MaskedInputField({ name, ...props }: MaskedInputFieldProps) {
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);
  const onChange = (e) => {
    helpers.setValue(e.target.value, shouldValidate);
    initialError.current = undefined;
  };

  const onBlur = () => helpers.setTouched(true, shouldValidate);

  return (
    <MaskedInput
      name={field.name}
      value={field.value}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
      onBlur={onBlur}
      onChange={onChange}
      {...props}
      data-testid={name ?? props["data-testid"]}
    />
  );
}
