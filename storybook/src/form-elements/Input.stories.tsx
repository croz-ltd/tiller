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

import { Input } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { Tooltip } from "@tiller-ds/core";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./Input.mdx";

export default {
  title: "Component Library/Form-elements/Input",
  component: Input,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return correctedSource;
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39201",
    },
    decorators: [withDesign],
  },
};

const translations = storybookDictionary.translations;
const name = "test";
const addOn = "https://";
const inlineLeadingAddOn = "$";
const inlineTrailingAddOn = "USD";

export const WithLabel = () => (
  <Input name={name} value="" label={<Intl name="label" />} onChange={() => {}} onBlur={() => {}} />
);

export const WithoutLabel = () => <Input name={name} value="" onChange={() => {}} onBlur={() => {}} />;

export const WithValue = (args, context) => (
  <Input
    name={name}
    value={translations[context.globals.language]["value"]}
    label={<Intl name="label" />}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const Disabled = (args, context) => (
  <Input
    name={name}
    value={translations[context.globals.language]["value"]}
    label={<Intl name="label" />}
    disabled={true}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithPlaceholder = (args, context) => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithHelp = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    help={<Intl name="help" />}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithTooltip = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" variant="regular" />
      </Tooltip>
    }
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithError = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    error={<Intl name="error" />}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithLeadingIcon = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={() => {}} />}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithTrailingIcon = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" onClick={() => {}} />}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithTrailingIconAndError = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" />}
    onChange={() => {}}
    onBlur={() => {}}
    error={<Intl name="error" />}
  />
);

export const WithAddOn = () => (
  <Input name={name} value="" label={<Intl name="label" />} addOn={addOn} onChange={() => {}} onBlur={() => {}} />
);

export const WithInlineLeadingAddOn = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    inlineLeadingAddOn={inlineLeadingAddOn}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithInlineTrailingAddOn = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    inlineTrailingAddOn={inlineTrailingAddOn}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithInlineTrailingAddOnAndError = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    error={<Intl name="error" />}
    inlineTrailingAddOn={inlineTrailingAddOn}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithInlineLeadingAndTrailingAddOn = () => (
  <Input
    name={name}
    value=""
    label={<Intl name="label" />}
    inlineLeadingAddOn={inlineLeadingAddOn}
    inlineTrailingAddOn={inlineTrailingAddOn}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithClearButton = (args, context) => (
  <Input
    name={name}
    value={translations[context.globals.language]["value"]}
    label={<Intl name="label" />}
    allowClear
    onReset={() => {}}
  />
);

export const WithNumber = () => <Input name={name} type="number" />;
