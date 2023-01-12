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

import { action } from "@storybook/addon-actions";

import { Tooltip } from "@tiller-ds/core";
import { NumberInput } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./NumberInput.mdx";

export default {
  title: "Component Library/Form-elements/NumberInput",
  component: NumberInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const translations = storybookDictionary.translations;
const name = "test";
const value = "2300000.123";
const addOn = "https://";
const inlineLeadingAddOn = "$";
const inlineTrailingAddOn = "USD";

const onClick = action("icon-click");

export const WithLabel = () => <NumberInput name={name} label={<Intl name="label" />} />;

export const WithoutLabel = () => <NumberInput name={name} />;

export const WithValue = () => <NumberInput name={name} value={value} label={<Intl name="label" />} />;

export const Disabled = () => <NumberInput name={name} disabled={true} />;

export const WithPlaceholder = (args, context) => (
  <NumberInput name={name} placeholder={translations[context.globals.language]["placeholder"]} />
);

export const WithHelp = () => <NumberInput name={name} help={<Intl name="help" />} />;

export const WithTooltip = () => (
  <NumberInput
    name={name}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
  />
);

export const WithError = () => <NumberInput name={name} error={<Intl name="error" />} />;

export const WithNegative = () => <NumberInput name={name} allowNegative={true} />;

export const WithDecimalScale = () => <NumberInput name={name} decimalScale={3} />;

export const WithFixedDecimalScale = () => <NumberInput name={name} decimalScale={3} fixedDecimalScale={true} />;

export const WithLeadingZeros = () => <NumberInput name={name} allowLeadingZeros={true} />;

export const WithLeadingIcon = () => (
  <NumberInput
    name={name}
    label={<Intl name="label" />}
    inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={onClick} />}
  />
);

export const WithTrailingIcon = () => (
  <NumberInput
    name={name}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" onClick={onClick} />}
  />
);

export const WithTrailingIconAndError = () => (
  <NumberInput
    name={name}
    error={<Intl name="error" />}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" />}
  />
);

export const WithWithAddOn = () => <NumberInput name={name} label={<Intl name="label" />} addOn={addOn} />;

export const WithInlineLeadingAddOn = () => (
  <NumberInput name={name} label={<Intl name="label" />} inlineLeadingAddOn={inlineLeadingAddOn} />
);

export const WithInlineTrailingAddOn = () => (
  <NumberInput name={name} label={<Intl name="label" />} inlineTrailingAddOn={inlineTrailingAddOn} />
);

export const WithInlineLeadingAndTrailingAddOn = () => (
  <NumberInput
    name={name}
    label={<Intl name="label" />}
    inlineLeadingAddOn={inlineLeadingAddOn}
    inlineTrailingAddOn={inlineTrailingAddOn}
  />
);
