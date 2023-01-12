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

import { Checkbox, CheckboxProps } from "@tiller-ds/form-elements";
import { TokenProps, useTokens } from "@tiller-ds/theme";

export type CheckboxFieldProps = {
  /**
   * The accessor value for the input field component (for validation, fetching, etc.).
   */
  name: string;
} & CheckboxProps &
  TokenProps<"CheckboxField">;

export default function CheckboxField({ name, label, ...props }: CheckboxFieldProps) {
  const [field] = useField({ name, type: "checkbox" });
  const tokens = useTokens("CheckboxField", props.tokens);
  const id = `${name}-${field.value}`;

  return (
    <div className={tokens.base}>
      <Checkbox id={id} label={label} {...field} {...props} />
    </div>
  );
}
