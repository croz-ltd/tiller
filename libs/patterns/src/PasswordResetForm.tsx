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

import { Form } from "formik";

import { Button } from "@tiller-ds/core";
import { FormLayout } from "@tiller-ds/form-elements";
import { PasswordInputField } from "@tiller-ds/formik-elements";
import { Intl } from "@tiller-ds/intl";
import { ComponentTokens, useTokens } from "@tiller-ds/theme";

type PasswordResetFormProps = {
  buttonText?: string;
  subtitle?: string;
  title?: string;
} & LoginTokensProps;

type LoginTokensProps = {
  tokens?: ComponentTokens<"Login">;
};
export default function PasswordResetForm({ title, subtitle, buttonText, ...props }: PasswordResetFormProps) {
  const tokens = useTokens("Login", props.tokens);
  return (
    <Form>
      <FormLayout.Section>
        <div className={tokens.passwordResetForm.master}>
          <h1 className={tokens.passwordResetForm.headerContainer}>
            {<Intl name={title || "login.labels.resetPasswordTitle"} />}
          </h1>
          <p className={tokens.passwordResetForm.description}>
            {<Intl name={subtitle || "login.labels.forgottenPasswordDescription"} />}
          </p>
          <PasswordInputField
            name="newPassword"
            label={<Intl name="login.labels.newPassword" />}
            className={tokens.passwordResetForm.inputSpacing}
            autoFocus={true}
            required={true}
          />
          <PasswordInputField
            name="repeatPassword"
            label={<Intl name="login.labels.newPasswordRepeat" />}
            className={tokens.passwordResetForm.inputSpacing}
            required={true}
          />
          <Button
            data-testid="submit"
            className={`${tokens.passwordResetForm.resetButton.master} ${tokens.passwordResetForm.resetButton.margin}`}
            variant="filled"
            type="submit"
          >
            {<Intl name={buttonText || "login.labels.resetPassword"} />}
          </Button>
        </div>
      </FormLayout.Section>
    </Form>
  );
}
