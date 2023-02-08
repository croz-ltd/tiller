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

import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { MaskedInputField } from "@tiller-ds/formik-elements";
import { FormikDecorator } from "../utils";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./MaskedInputField.mdx";

const translations = storybookDictionary.translations;
const name = "test";
const nameWithError = "nameWithError";
const nameWithValue = "nameWithValue";
const addOn = "https://";
const inlineLeadingAddOn = "$";
const inlineTrailingAddOn = "USD";
const mask = ["(", /[1-9]/, /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

const initialValues = {
  [nameWithValue]: "(385)991-1346",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/MaskedInputField",
  component: MaskedInputField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
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

export const WithMask = () => <MaskedInputField name={name} mask={mask} />;

export const WithKeptCharsPositions = () => <MaskedInputField name={name} mask={mask} keepCharPositions={true} />;

export const WithMaskHidden = () => <MaskedInputField name={name} mask={mask} showMask={false} />;

export const WithCustomPlaceholder = () => (
  <MaskedInputField
    name={name}
    mask={[/[0-9]/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
    placeholder={"MM/DD/YYYY"}
  />
);

export const WithLabel = () => <MaskedInputField name={name} mask={mask} label={<Intl name="label" />} />;

export const WithValue = () => <MaskedInputField name={nameWithValue} mask={mask} label={<Intl name="label" />} />;

export const Disabled = () => (
  <MaskedInputField name={name} mask={mask} label={<Intl name="label" />} disabled={true} />
);

export const WithPlaceholder = (args, context) => (
  <MaskedInputField
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithHelp = () => (
  <MaskedInputField name={name} mask={mask} label={<Intl name="label" />} help={<Intl name="help" />} />
);

export const WithError = () => <MaskedInputField name={nameWithError} mask={mask} label={<Intl name="label" />} />;

export const WithLeadingIcon = () => (
  <MaskedInputField
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" />}
  />
);

export const WithTrailingIcon = () => (
  <MaskedInputField
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" />}
  />
);

export const WithTrailingIconAndError = () => (
  <MaskedInputField
    name={nameWithError}
    mask={mask}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" />}
  />
);

export const WithAddOn = () => <MaskedInputField name={name} mask={mask} label={<Intl name="label" />} addOn={addOn} />;

export const WithInlineLeadingAddOn = () => (
  <MaskedInputField name={name} mask={mask} label={<Intl name="label" />} inlineLeadingAddOn={inlineLeadingAddOn} />
);

export const WithInlineTrailingAddOn = () => (
  <MaskedInputField name={name} mask={mask} label={<Intl name="label" />} inlineTrailingAddOn={inlineTrailingAddOn} />
);

export const WithInlineLeadingAndTrailingAddOn = () => (
  <MaskedInputField
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineLeadingAddOn={inlineLeadingAddOn}
    inlineTrailingAddOn={inlineTrailingAddOn}
  />
);
