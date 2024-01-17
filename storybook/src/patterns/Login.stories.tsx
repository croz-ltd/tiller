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

import { BrowserRouter } from "react-router-dom";
import { withDesign } from "storybook-addon-designs";

import { Alert } from "@tiller-ds/alert";
import { Intl } from "@tiller-ds/intl";

import { Login, ForgottenPassword, EmailForm, PasswordResetForm } from "@tiller-ds/patterns";

import logo from "../../../libs/patterns/src/img/logo.svg";
import mdx from "./Login.mdx";
import { beautifySource } from "../utils";
import * as Yup from "yup";

export default {
  title: "Patterns/Login",
  component: Login,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=300%3A17085",
    },
    decorators: [withDesign],
  },
  argTypes: {
    onClick: { action: true },
  },
};

const title = "Welcome!";
const buttonText = "Log Me In";

export const Simple = () => {
  // incl-code
  // initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    // alert('data', values);
  };

  return <Login initialValues={initialValues} handleSubmit={handleSubmit} />;
};

export const Basic = () => {
  // incl-code
  // initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    // alert("data", values);
  };

  return (
    <BrowserRouter>
      <Login rememberMe forgotPassword initialValues={initialValues} handleSubmit={handleSubmit} />
    </BrowserRouter>
  );
};

export const WithEmail = () => {
  // incl-code
  // initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    // alert('data', values);
  };

  return <Login useEmail={true} initialValues={initialValues} handleSubmit={handleSubmit} />;
};

export const WithCustomText = () => {
  // incl-code
  // initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    // alert("data", values);
  };

  return (
    <BrowserRouter>
      <Login
        rememberMe
        buttonText={buttonText}
        title={title}
        forgotPassword
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      />
    </BrowserRouter>
  );
};

export const WithLogo = () => {
  // incl-code
  // initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    // alert("data", values);
  };

  return (
    <BrowserRouter>
      <Login rememberMe logo={logo} forgotPassword initialValues={initialValues} handleSubmit={handleSubmit} />
    </BrowserRouter>
  );
};

export const ForgotPassword = () => {
  // incl-code
  // initial form values
  const initialValues = {
    email: "",
  };

  const handleSubmit = (values) => {
    // alert("data", values);
  };

  const EmailValidationSchema = Yup.object({
    email: Yup.string()
      .email("intl:login.validation.emailValidation.email.validity")
      .max(255)
      .required("intl:login.validation.emailValidation.email.required"),
  });

  return (
    <BrowserRouter>
      <ForgottenPassword
        validationSchema={EmailValidationSchema}
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      >
        <EmailForm />
      </ForgottenPassword>
    </BrowserRouter>
  );
};

export const EmailConfirmation = () => {
  // incl-code
  // initial form values
  const initialValues = {
    email: "",
  };

  const handleSubmit = (values) => {
    // alert("data", values);
  };

  const EmailValidationSchema = Yup.object({
    email: Yup.string()
      .email("intl:login.validation.emailValidation.email.validity")
      .max(255)
      .required("intl:login.validation.emailValidation.email.required"),
  });

  return (
    <BrowserRouter>
      <ForgottenPassword
        validationSchema={EmailValidationSchema}
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      >
        <EmailForm>
          <Alert className="my-2">
            <Intl name="login.labels.checkEmailNotification" />
          </Alert>
        </EmailForm>
      </ForgottenPassword>
    </BrowserRouter>
  );
};

export const ResetPassword = () => {
  // incl-code
  // initial form values
  const initialValues = {
    newPassword: "",
    repeatPassword: "",
  };

  const handleSubmit = (values) => {
    // alert("data", values);
  };

  const defaultPasswordValidationRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const PasswordValidationSchema = Yup.object({
    newPassword: Yup.string()
      .required("intl:login.validation.passwordValidation.newPassword.required")
      .matches(defaultPasswordValidationRegex, "intl:login.validation.passwordValidation.newPassword.regex"),
    repeatPassword: Yup.string()
      .required("intl:login.validation.passwordValidation.repeatPassword.required")
      .oneOf([Yup.ref("newPassword"), null], "intl:login.validation.passwordValidation.repeatPassword.oneOf"),
  });

  return (
    <BrowserRouter>
      <ForgottenPassword
        validationSchema={PasswordValidationSchema}
        initialValues={initialValues}
        handleSubmit={handleSubmit}
      >
        <PasswordResetForm />
      </ForgottenPassword>
    </BrowserRouter>
  );
};

export const SuccessPasswordChange = () => {
  // incl-code
  // initial form values
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log("data", values);
  };

  return (
    <BrowserRouter>
      <Login initialValues={initialValues} handleSubmit={handleSubmit} rememberMe forgotPassword>
        <div className="mb-5">
          <Alert variant="success" className="justify-center">
            <Intl name="login.labels.passwordChangeNotification" />
          </Alert>
        </div>
      </Login>
    </BrowserRouter>
  );
};
