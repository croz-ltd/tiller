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

import { useField, useFormikContext } from "formik";

import { Textarea, TextareaProps } from "@tiller-ds/form-elements";

import useShouldValidate from "./useShouldValidate";
import useFormikBypass from "./useFormikBypass";

type TextareaOnlyPropsUnion = "value" | "onChange" | "onBlur" | "error";

export type TextareaFieldProps = {
  /**
   * The accessor value for component (for validation, fetching, etc.).
   */
  name: string;
} & Omit<TextareaProps, TextareaOnlyPropsUnion>;

export default function TextareaField({ name, tooltip, ...props }: TextareaFieldProps) {
  const formik = useFormikContext();
  const [field, meta, helpers] = useField(name);
  const shouldValidate = useShouldValidate();
  const initialError = useFormikBypass(name);

  const onChange = (e) => {
    helpers.setValue(e.target.value, shouldValidate);
    initialError.current = undefined;
  };

  const onBlur = () => {
    if (field.value) {
      helpers.setValue(field.value.trim(), shouldValidate);
    } else {
      helpers.setTouched(true, shouldValidate);
    }
  };

  return (
    <Textarea
      name={field.name}
      value={field.value ?? ""}
      tooltip={tooltip}
      error={meta.touched && (initialError.current ? initialError.current : meta.error)}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
      data-testid={name ?? props["data-testid"]}
    />
  );
}
