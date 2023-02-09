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

import { Checkbox } from "@tiller-ds/form-elements";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { getChangedTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./Checkbox.mdx";

export default {
  title: "Component Library/Form-elements/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getChangedTokensFromSource(correctedSource, { Checkbox: "checkboxTokens" });
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39202",
    },
    decorators: [withDesign],
  },
  argTypes: {
    name: { name: "Name (accessor)", control: "text", defaultValue: "CheckboxField Text" },
    label: { name: "Label", control: "text", defaultValue: "CheckboxField Label" },
    color: {
      name: "Color (when checked)",
      control: {
        type: "select",
        options: ["primary", "secondary", "tertiary", "info", "success", "warning", "danger"],
      },
    },
    disabled: { name: "Disabled" },
    className: { name: "Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    checkboxTokens: { name: "Tokens", control: "object" },
  },
};

const testLabel = "Test";

export const CheckboxFactory = ({ name, label, color, disabled, className, useTokens, checkboxTokens }) => (
  <Checkbox
    name={name}
    color={color}
    label={label}
    disabled={disabled}
    className={className}
    checkboxTokens={useTokens && checkboxTokens}
  />
);

CheckboxFactory.args = {
  name: "name",
  label: "Test label",
  color: "primary",
  disabled: false,
  className: "",
  useTokens: false,
  checkboxTokens: defaultThemeConfig.component["Checkbox"],
};

CheckboxFactory.parameters = {
  controls: {
    expanded: false,
  },
};

CheckboxFactory.decorators = showFactoryDecorator();

export const Checked = () => <Checkbox label={testLabel} onChange={() => {}} checked />;

export const Unchecked = () => <Checkbox label={testLabel} onChange={() => {}} />;

export const DifferentColor = () => <Checkbox label={testLabel} color="danger" onChange={() => {}} checked />;

const HideControls = {
  name: { control: { disable: true } },
  label: { control: { disable: true } },
  color: { control: { disable: true } },
  disabled: { control: { disable: true } },
  className: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  checkboxTokens: { control: { disable: true } },
};

Checked.argTypes = HideControls;
Unchecked.argTypes = HideControls;
DifferentColor.argTypes = HideControls;
