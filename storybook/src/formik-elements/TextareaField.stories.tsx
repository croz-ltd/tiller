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

import { TextareaField } from "@tiller-ds/formik-elements";
import { FormikDecorator } from "../utils";
import { Tooltip } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./TextareaField.mdx";

const name = "test";
const nameWithError = "nameWithError";
const nameWithValue = "nameWithValue";

const initialValues = {
  [nameWithValue]: "test",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/TextareaField",
  component: TextareaField,
  parameters: {
    docs: {
      page: mdx,
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

const translations = storybookDictionary.translations;

export const WithLabel = () => <TextareaField name={name} label={<Intl name="label" />} />;

export const WithoutLabel = () => <TextareaField name={name} />;

export const WithValue = () => <TextareaField name={nameWithValue} label={<Intl name="label" />} />;

export const Disabled = () => <TextareaField name={nameWithValue} label={<Intl name="label" />} disabled={true} />;

export const WithPlaceholder = (args, context) => (
  <TextareaField
    name={name}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithHelp = () => <TextareaField name={name} label={<Intl name="label" />} help={<Intl name="help" />} />;

export const WithTooltip = () => (
  <TextareaField
    name={name}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
  />
);

export const WithError = () => <TextareaField name={nameWithError} label={<Intl name="label" />} />;
