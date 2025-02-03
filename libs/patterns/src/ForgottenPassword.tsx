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

import { ObjectSchema } from "yup";
import * as Yup from "yup";

import { Card } from "@tiller-ds/core";
import { FormContainer } from "@tiller-ds/formik-elements";
import { ComponentTokens, useTokens } from "@tiller-ds/theme";

type InitialValues = {
  email?: string;
  newPassword?: string;
  repeatPassword?: string;
};

type ForgottenPasswordProps = {
  validationSchema: ObjectSchema<any>;
  initialValues: InitialValues;
  handleSubmit: (values) => void;
  children?: React.ReactNode;
  passwordValidationRegex?: RegExp;
} & LoginTokensProps;

type LoginTokensProps = {
  tokens?: ComponentTokens<"Login">;
};

const defaultPasswordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

export const PasswordValidationSchema = (passwordValidationRegex?: RegExp) =>
  Yup.object({
    newPassword: Yup.string()
      .required("intl:login.validation.passwordValidation.newPassword.required")
      .matches(
        passwordValidationRegex || defaultPasswordValidationRegex,
        "intl:login.validation.passwordValidation.newPassword.regex",
      ),
    repeatPassword: Yup.string()
      .required("intl:login.validation.passwordValidation.repeatPassword.required")
      .oneOf([Yup.ref("newPassword"), null], "intl:login.validation.passwordValidation.repeatPassword.oneOf"),
  });
export default function ForgottenPassword({
  validationSchema,
  initialValues,
  handleSubmit,
  children,
  passwordValidationRegex = defaultPasswordValidationRegex,
  ...props
}: ForgottenPasswordProps) {
  const tokens = useTokens("Login", props.tokens);
  return (
    <div className={tokens.container}>
      <Card>
        <Card.Body>
          <FormContainer
            initialValues={initialValues}
            validationSchema={validationSchema || PasswordValidationSchema(passwordValidationRegex)}
            onSubmit={handleSubmit}
          >
            {() => {
              return children;
            }}
          </FormContainer>
        </Card.Body>
      </Card>
    </div>
  );
}
