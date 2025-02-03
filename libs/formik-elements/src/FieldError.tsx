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

import { useFormikContext, useField } from "formik";

import { Intl } from "@tiller-ds/intl";
import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

export type FieldErrorProps = {
  /**
   * The accessor value for the component (for validation, fetching, etc.).
   */
  name: string;

  /**
   * Custom additional styling applied to the component.
   */
  className?: string;
} & InputTokensProps;

type InputTokensProps = {
  tokens?: ComponentTokens<"FieldError">;
};

export default function FieldError({ name, className, ...props }: FieldErrorProps) {
  const [, meta] = useField(name);
  const formik = useFormikContext();
  const tokens = useTokens("FieldError", props.tokens);

  const errorClassName = cx(tokens.error);

  if (!((meta.touched || formik.submitCount > 0) && meta.error)) {
    return null;
  }

  let error: React.ReactElement | string = meta.error;
  if (error.startsWith("intl:")) {
    error = <Intl name={error.replace("intl:", "")} />;
  }

  return <>{meta.error && <p className={tillerTwMerge(errorClassName, className)}>{error}</p>}</>;
}
