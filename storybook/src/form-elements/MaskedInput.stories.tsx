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

import { MaskedInput } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import mdx from "./MaskedInput.mdx";

export default {
  title: "Component Library/Form-elements/MaskedInput",
  component: MaskedInput,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const name = "test";
const mask = ["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
const value = "(385)991-1346";
const error = "Test error text";
const addOn = "https://";
const inlineLeadingAddOn = "$";
const inlineTrailingAddOn = "USD";

const onChange = action("input-change");
const onBlur = action("input-blur");

export const WithMask = () => <MaskedInput name={name} mask={mask} onChange={onChange} />;

export const WithKeptCharsPositions = () => <MaskedInput name={name} mask={mask} keepCharPositions={true} />;

export const WithMaskHidden = () => <MaskedInput name={name} mask={mask} showMask={false} />;

export const WithCustomPlaceholder = () => (
  <MaskedInput
    name={name}
    mask={[/[0-9]/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
    placeholder={"MM/DD/YYYY"}
  />
);

export const WithLabel = () => (
  <MaskedInput name={name} label={<Intl name="label" />} mask={mask} onChange={onChange} onBlur={onBlur} />
);

export const WithValue = () => (
  <MaskedInput
    name={name}
    label={<Intl name="label" />}
    value={value}
    mask={mask}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const Disabled = () => (
  <MaskedInput
    name={name}
    label={<Intl name="label" />}
    disabled={true}
    mask={mask}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const WithHelp = () => (
  <MaskedInput
    name={name}
    label={<Intl name="label" />}
    help={<Intl name="help" />}
    mask={mask}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const WithError = () => (
  <MaskedInput
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    error={error}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const WithLeadingIcon = () => (
  <MaskedInput
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" />}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const WithTrailingIcon = () => (
  <MaskedInput
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" />}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const WithTrailingIconAndError = () => (
  <MaskedInput
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" />}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
  />
);

export const WithAddOn = () => (
  <MaskedInput
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    addOn={addOn}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const WithInlineLeadingAddOn = () => (
  <MaskedInput
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineLeadingAddOn={inlineLeadingAddOn}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const WithInlineTrailingAddOn = () => (
  <MaskedInput
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineTrailingAddOn={inlineTrailingAddOn}
    onChange={onChange}
    onBlur={onBlur}
  />
);

export const WithInlineLeadingAndTrailingAddOn = () => (
  <MaskedInput
    name={name}
    mask={mask}
    label={<Intl name="label" />}
    inlineLeadingAddOn={inlineLeadingAddOn}
    inlineTrailingAddOn={inlineTrailingAddOn}
    onChange={onChange}
    onBlur={onBlur}
  />
);
