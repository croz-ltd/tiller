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

import { Tooltip } from "@tiller-ds/core";
import { PasswordInputField } from "@tiller-ds/formik-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import { beautifySource, FormikDecorator } from "../utils";
import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./PasswordInputField.mdx";

const translations = storybookDictionary.translations;
const name = "test";
const nameWithError = "nameWithError";
const nameWithValue = "nameWithValue";

const initialValues = {
  [nameWithValue]: "Password123#",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/PasswordInputField",
  component: PasswordInputField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "PasswordInputField"),
    },
  },
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialValues={initialValues} initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),
  ],
};

export const WithLabel = (args) => <PasswordInputField name={name} label={<Intl name="label" />} />;

export const WithoutLabel = (args) => <PasswordInputField name={name} />;

export const WithValue = () => {
  // incl-code
  // initial value passed as initialValues prop of Formik
  const initialValues = {
    nameWithValue: "Password123#",
  };

  return <PasswordInputField name="nameWithvalue" label={<Intl name="label" />} />;
};

export const Disabled = (args) => (
  <PasswordInputField name={nameWithValue} label={<Intl name="label" />} disabled={true} />
);

export const WithPlaceholder = (args, context) => (
  <PasswordInputField
    name={name}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithCustomCapsLockAlert = (args) => (
  <PasswordInputField name={name} label={<Intl name="label" />} help={<Intl name="help" />} />
);

export const WithTooltip = (args) => (
  <PasswordInputField
    name={name}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" className="ml-1.5" />
      </Tooltip>
    }
  />
);

export const WithError = (args) => <PasswordInputField name={nameWithError} label={<Intl name="label" />} />;
