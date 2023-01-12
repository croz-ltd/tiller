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

import { Form } from "formik";
import * as Yup from "yup";

import { Button, Link } from "@tiller-ds/core";
import { FormLayout } from "@tiller-ds/form-elements";
import { InputField } from "@tiller-ds/formik-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { ComponentTokens, useTokens } from "@tiller-ds/theme";

type EmailFormProps = {
  backToLogin?: string;
  buttonText?: string;
  children?: React.ReactNode;
  subtitle?: string;
  title?: string;
} & LoginTokensProps;

type LoginTokensProps = {
  tokens?: ComponentTokens<"Login">;
};

export const EmailValidationSchema = Yup.object({
  email: Yup.string()
    .email("intl:login.validation.emailValidation.email.validity")
    .max(255)
    .required("intl:login.validation.emailValidation.email.required"),
});

export default function EmailForm({ title, subtitle, buttonText, backToLogin, children, ...props }: EmailFormProps) {
  const tokens = useTokens("Login", props.tokens);
  return (
    <Form>
      <FormLayout.Section>
        <div className={tokens.emailForm.master}>
          <h1 className={tokens.emailForm.headerContainer}>
            <Intl name={title || "login.labels.forgottenPassword"} />
          </h1>
          <p className="mb-5 text-center">
            <Intl name={subtitle || "login.labels.forgottenPasswordDescription"} />
          </p>
          {children}
          <InputField
            data-testid="email"
            className={tokens.emailForm.inputSpacing}
            name="email"
            label={<Intl name="login.labels.email" />}
            autoFocus={true}
            required={true}
          />
          <Button
            data-testid="submit"
            className={`${tokens.emailForm.submitButton.master} ${tokens.emailForm.submitButton.margin}`}
            variant="filled"
            type="submit"
          >
            {<Intl name={buttonText || "login.labels.sendEmail"} />}
          </Button>
          <div className={tokens.emailForm.link.container}>
            <Icon type="arrow-left" className={tokens.emailForm.link.icon} />
            <Link className={tokens.emailForm.link.master} to="/login">
              <Intl name={backToLogin || "login.labels.backToLogin"} />
            </Link>
          </div>
        </div>
      </FormLayout.Section>
    </Form>
  );
}
