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

import { withDesign } from "storybook-addon-designs";

import { ToggleField } from "@tiller-ds/formik-elements";

import { beautifySource, FormikDecorator } from "../utils";

import mdx from "./ToggleField.mdx";

const nameWithError = "nameWithError";
const nameWithValue = "nameWithValue";
const label = (
  <span>
    <span className="text-sm leading-5 font-medium text-gray-900">Annual billing</span>
  </span>
);

const name = "toggle";

const initialValues = {
  [nameWithValue]: true,
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/Toggle Field",
  component: ToggleField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "ToggleField"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=11686%3A14923",
    },
    decorators: [withDesign],
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

export const WithValue = () => {
  // incl-code
  // initial value passed as initialValues prop of Formik
  const initialValues = {
    nameWithValue: true,
  };

  return <ToggleField name="nameWithValue" />;
};

export const WithoutValue = () => <ToggleField name={name} />;

export const WithError = () => <ToggleField name={nameWithError} />;

export const WithHelp = () => <ToggleField name={nameWithValue} />;

export const WithHint = () => <ToggleField name={nameWithValue} />;

export const WithLabel = (args) => <ToggleField name={name} label={label} />;

export const WithCheckedIcon = (args) => <ToggleField name={name} label={label} />;

export const WithUncheckedIcon = (args) => <ToggleField name={name} label={label} />;

export const WithBothIcons = (args) => <ToggleField name={name} label={label} />;

export const Disabled = (args) => <ToggleField name={name} label={label} disabled={true} />;
