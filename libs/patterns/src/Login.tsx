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

import { Form } from "formik";
import * as Yup from "yup";

import { Button, Card, Link } from "@tiller-ds/core";
import { FormLayout } from "@tiller-ds/form-elements";
import { CheckboxGroupField, FormContainer, InputField, PasswordInputField } from "@tiller-ds/formik-elements";
import { Intl } from "@tiller-ds/intl";
import { ComponentTokens, useTokens } from "@tiller-ds/theme";

type InitialValues = {
  username: string;
  password: string;
};

type InitialValuesEmail = {
  email: string;
  password: string;
};

type LoginProps = {
  /**
   * Determines the text displayed inside the button for logging in.
   */
  buttonText?: string;

  /**
   * Optional components displayed above the title.
   */
  children?: React.ReactNode;

  /**
   * Optional class name for changing the look of the login form.
   * Overrides the default container class name (tokens: Login.container).
   */
  className?: string;

  /**
   * Toggle for changing the look of the form to a use case where the
   * password is forgotten.
   * Defaults to false.
   */
  forgotPassword?: boolean;

  /**
   * Specifies the URL or navigation link to redirect the user when
   * they click on a "Forgot Password" link.
   */
  forgotPasswordLink?: string;

  /**
   * Function that handles values inputted into the component on submit.
   */
  handleSubmit: (values) => void;

  /**
   * Determines initial values for the login form. Initial values vary depending
   * on the login variant (with username / with email)
   */
  initialValues: InitialValues | InitialValuesEmail;

  /**
   * Enables the display of logo. Requires an 'svg' file.
   */
  logo?: string;

  /**
   * Toggle which determines whether the checkbox for 'Remember Me' is displayed on component render.
   * Defaults to false.
   */
  rememberMe?: boolean;

  /**
   * Title displayed centered above the input fields.
   */
  title?: string;

  /**
   * Toggle for changing the required info to email and password as opposed to username and password
   * by default.
   * Note: initialValues prop must be of 'InitialValuesEmail' type if this toggle is enabled.
   */
  useEmail?: boolean;
} & LoginTokensProps;

type LoginTokensProps = {
  tokens?: ComponentTokens<"Login">;
};

const LoginValidationSchema = Yup.object({
  username: Yup.string().required("intl:login.validation.loginValidation.username.required"),
  password: Yup.string().required("intl:login.validation.loginValidation.password.required"),
});

const LoginEmailValidationSchema = Yup.object({
  email: Yup.string().required("intl:login.validation.loginEmailValidation.email.required"),
  password: Yup.string().required("intl:login.validation.loginEmailValidation.password.required"),
});

export default function Login({
  title,
  logo,
  rememberMe,
  buttonText,
  forgotPassword,
  forgotPasswordLink,
  initialValues,
  handleSubmit,
  children,
  useEmail,
  className,
  ...props
}: LoginProps) {
  const tokens = useTokens("Login", props.tokens);

  return (
    <div className={className || tokens.container}>
      <Card>
        <Card.Body>
          <FormContainer
            initialValues={initialValues}
            validationSchema={useEmail ? LoginEmailValidationSchema : LoginValidationSchema}
            onSubmit={handleSubmit}
            validateAfterSubmit={true}
          >
            {() => {
              return (
                <Form>
                  <FormLayout.Section>
                    <div className={tokens.master}>
                      {logo && (
                        <div className={tokens.logoContainer}>
                          <img src={logo} alt="logo" className={tokens.logoSize} />
                        </div>
                      )}
                      {children}
                      <h1 className={tokens.headerContainer}>{<Intl name={title || "login.labels.header"} />}</h1>
                      <InputField
                        className={tokens.inputSpacing}
                        name={useEmail ? "email" : "username"}
                        label={useEmail ? <Intl name={"login.labels.email"} /> : <Intl name={"login.labels.username"} />}
                        autoFocus={true}
                        required={true}
                      />
                      <PasswordInputField
                        name="password"
                        className={tokens.inputSpacing}
                        label={<Intl name={"login.labels.password"} />}
                        required={true}
                      />
                      {rememberMe === true && (
                        <CheckboxGroupField name="type" label="">
                          <CheckboxGroupField.Item label={<Intl name={"login.labels.rememberMe"} />} value="remember-me" />
                        </CheckboxGroupField>
                      )}
                      <Button
                        className={`${tokens.loginButton.master} ${tokens.loginButton.margin}`}
                        variant="filled"
                        type="submit"
                      >
                        {<Intl name={buttonText || "login.labels.login"} />}
                      </Button>
                      {forgotPassword === true && (
                        <div className={tokens.link.container}>
                          <Link className={tokens.link.master} to={forgotPasswordLink ?? "/forgotten-password"}>
                            {<Intl name={"login.labels.forgotPassword"} />}
                          </Link>
                        </div>
                      )}
                    </div>
                  </FormLayout.Section>
                </Form>
              );
            }}
          </FormContainer>
        </Card.Body>
      </Card>
    </div>
  );
}
