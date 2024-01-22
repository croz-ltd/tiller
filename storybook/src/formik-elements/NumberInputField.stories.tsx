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
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { NumberInputField } from "@tiller-ds/formik-elements";
import { beautifySource, FormikDecorator } from "../utils";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./NumberInputField.mdx";

const nameWithError = "nameWithError";
const nameWithValue = "nameWithValue";

const initialValues = {
  [nameWithValue]: "230000.45",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/NumberInputField",
  component: NumberInputField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "NumberInputField"),
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
const name = "test";
const addOn = "https://";
const inlineLeadingAddOn = "$";
const inlineTrailingAddOn = "USD";

export const WithLabel = (args) => <NumberInputField name={name} label={<Intl name="label" />} />;

export const WithoutLabel = (args) => <NumberInputField name={name} />;

export const WithValue = () => {
  // incl-code
  const initialValues = {
    nameWithValue: "230000.45",
  };

  return <NumberInputField name="nameWithValue" label={<Intl name="label" />} />;
};

export const Disabled = (args) => (
  <NumberInputField name={nameWithValue} label={<Intl name="label" />} disabled={true} />
);

export const WithPlaceholder = (args, context) => (
  <NumberInputField
    name={name}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithHelp = (args) => (
  <NumberInputField name={name} label={<Intl name="label" />} help={<Intl name="help" />} />
);

export const WithTooltip = (args) => (
  <NumberInputField
    name={name}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
  />
);

export const WithError = (args) => <NumberInputField name={nameWithError} label={<Intl name="label" />} />;

export const WithNegative = (args) => <NumberInputField name={name} allowNegative={true} />;

export const WithDecimalScale = (args) => <NumberInputField name={name} decimalScale={3} />;

export const WithFixedDecimalScale = (args) => (
  <NumberInputField name={name} decimalScale={3} fixedDecimalScale={true} />
);

export const WithLeadingZeros = (args) => <NumberInputField name={name} allowLeadingZeros={true} />;

export const WithLeadingIcon = (args) => (
  <NumberInputField
    name={name}
    label={<Intl name="label" />}
    inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={() => {}} />}
  />
);

export const WithTrailingIcon = (args) => (
  <NumberInputField
    name={name}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" onClick={() => {}} />}
  />
);

export const WithTrailingIconAndError = (args) => (
  <NumberInputField
    name={nameWithError}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" />}
  />
);

export const WithWithAddOn = (args) => <NumberInputField name={name} label={<Intl name="label" />} addOn={addOn} />;

export const WithInlineLeadingAddOn = (args) => (
  <NumberInputField name={name} label={<Intl name="label" />} inlineLeadingAddOn={inlineLeadingAddOn} />
);

export const WithInlineTrailingAddOn = (args) => (
  <NumberInputField name={name} label={<Intl name="label" />} inlineTrailingAddOn={inlineTrailingAddOn} />
);

export const WithInlineLeadingAndTrailingAddOn = (args) => (
  <NumberInputField
    name={name}
    label={<Intl name="label" />}
    inlineLeadingAddOn={inlineLeadingAddOn}
    inlineTrailingAddOn={inlineTrailingAddOn}
  />
);

export const WithoutIntlProvider = (args) => (
  <NumberInputField name={name} decimalSeparator="," thousandSeparator="." />
);
