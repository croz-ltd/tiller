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
import { Textarea } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./Textarea.mdx";

export default {
  title: "Component Library/Form-elements/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        return source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
      },
    },
  },
};

const translations = storybookDictionary.translations;
const name = "test";

export const WithLabel = () => (
  <Textarea name={name} value="" label={<Intl name="label" />} onChange={() => {}} onBlur={() => {}} />
);

export const WithoutLabel = () => <Textarea name={name} value="" onChange={() => {}} onBlur={() => {}} />;

export const WithValue = (args, context) => (
  <Textarea
    name={name}
    value={translations[context.globals.language]["value"]}
    label={<Intl name="label" />}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const Disabled = (args, context) => (
  <Textarea
    name={name}
    value={translations[context.globals.language]["value"]}
    label={<Intl name="label" />}
    disabled={true}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithPlaceholder = (args, context) => (
  <Textarea
    name={name}
    value=""
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithHelp = () => (
  <Textarea
    name={name}
    value=""
    label={<Intl name="label" />}
    help={<Intl name="help" />}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithTooltip = () => (
  <Textarea
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
  <Textarea
    name={name}
    value=""
    label={<Intl name="label" />}
    error={<Intl name="error" />}
    onChange={() => {}}
    onBlur={() => {}}
  />
);

export const WithCustomHeight = () => (
  <Textarea
    name={name}
    value=""
    label={<Intl name="label" />}
    textareaClassName="h-40"
    onChange={() => {}}
    onBlur={() => {}}
  />
);
