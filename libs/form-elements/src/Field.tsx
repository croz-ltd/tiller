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

import { Intl, useLabel } from "@tiller-ds/intl";
import { ComponentTokens, useTokens } from "@tiller-ds/theme";

import Label from "./Label";

export type FieldProps = {
  id?: string;

  name?: string;

  label?: React.ReactNode;

  tooltip?: React.ReactNode;

  required?: boolean;

  requiredLabel?: string;

  help?: React.ReactNode;

  error?: React.ReactNode;

  containerClassName?: string;

  fieldClassName?: string;

  children: React.ReactNode;
} & InputTokensProps;

type InputTokensProps = {
  tokens?: ComponentTokens<"Input">;
};

export type FieldLabelProps = {
  id?: string;

  label?: React.ReactNode;

  tooltip?: React.ReactNode;

  required?: boolean;

  requiredLabel?: string;
} & FieldLabelTokensProps;

type FieldLabelTokensProps = {
  fieldTokens?: ComponentTokens<"Field">;
  inputTokens?: ComponentTokens<"Input">;
};

export default function Field({
  id,
  label,
  help,
  tooltip,
  required,
  error,
  containerClassName,
  fieldClassName,
  children,
  ...props
}: FieldProps) {
  const tokens = useTokens("Input", props.tokens);
  let errorMessage = error;

  if (errorMessage?.toString().startsWith("intl:")) {
    errorMessage = <Intl name={errorMessage.toString().replace("intl:", "")} />;
  }

  return (
    <div className={containerClassName}>
      <FieldLabel id={id} label={label} required={required} tooltip={tooltip} {...props} />
      <div className={fieldClassName}>{children}</div>
      {error
        ? errorMessage && <p className={tokens.ErrorText.base}>{errorMessage}</p>
        : help && <p className={tokens.Help.base}>{help}</p>}
    </div>
  );
}

export function FieldLabel({ id, label, required, tooltip, ...props }: FieldLabelProps) {
  const inputTokens = useTokens("Input", props.inputTokens);
  const fieldTokens = useTokens("Field", props.fieldTokens);

  const requiredLabelText = useLabel("required");

  return (
    <Label id={id}>
      <span className="flex">
        {label}
        {required && (
          <div className={inputTokens.Required.base} title={requiredLabelText}>
            *
          </div>
        )}
        {tooltip && <div className={fieldTokens.Tooltip.marginLeft}>{tooltip}</div>}
      </span>
    </Label>
  );
}
