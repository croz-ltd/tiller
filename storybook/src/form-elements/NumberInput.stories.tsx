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
import { NumberInput } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./NumberInput.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Form-elements/NumberInput",
  component: NumberInput,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "NumberInput"),
    },
  },
};

const name = "test";
const value = "2300000.123";
const addOn = "https://";
const inlineLeadingAddOn = "$";
const inlineTrailingAddOn = "USD";

export const WithLabel = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithoutLabel = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithValue = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>(2300000.123);

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const Disabled = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      disabled={true}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithPlaceholder = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      placeholder="Test placeholder"
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithHelp = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      help={<Intl name="help" />}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithTooltip = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      tooltip={
        <Tooltip label={<Intl name="tooltip" />}>
          <Icon type="info" />
        </Tooltip>
      }
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithError = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      error={<Intl name="error" />}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithNegative = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      allowNegative={true}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithDecimalScale = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      decimalScale={3}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithFixedDecimalScale = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      decimalScale={3}
      fixedDecimalScale={true}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithLeadingZeros = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      allowLeadingZeros={true}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithLeadingIcon = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={() => {}} />}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithTrailingIcon = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      inlineTrailingIcon={<Icon type="question" variant="fill" onClick={() => {}} />}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithTrailingIconAndError = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      error={<Intl name="error" />}
      label={<Intl name="label" />}
      inlineTrailingIcon={<Icon type="question" variant="fill" />}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithWithAddOn = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();
  const addOn = "https://";

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      addOn={addOn}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithInlineLeadingAddOn = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();
  const inlineLeadingAddOn = "$";

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      inlineLeadingAddOn={inlineLeadingAddOn}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithInlineTrailingAddOn = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();
  const inlineTrailingAddOn = "USD";

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      inlineTrailingAddOn={inlineTrailingAddOn}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithInlineLeadingAndTrailingAddOn = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();
  const inlineLeadingAddOn = "$";
  const inlineTrailingAddOn = "USD";

  return (
    <NumberInput
      name={name}
      label={<Intl name="label" />}
      inlineLeadingAddOn={inlineLeadingAddOn}
      inlineTrailingAddOn={inlineTrailingAddOn}
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const WithoutIntlProvider = () => {
  // incl-code
  // state with stored number value
  const [value, setValue] = React.useState<number | undefined>();

  return (
    <NumberInput
      name={name}
      decimalSeparator=","
      thousandSeparator="."
      value={value !== undefined ? String(value) : undefined}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};
