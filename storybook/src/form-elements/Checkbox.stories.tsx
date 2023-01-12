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
import { withDesign } from "storybook-addon-designs";

import { Checkbox } from "@tiller-ds/form-elements";

import mdx from "./Checkbox.mdx";

export default {
  title: "Component Library/Form-elements/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      page: mdx,
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
    tokens: { control: false },
  },
};

const testLabel = "Test";

const onChange = action("checkboxGroup-onChange");

export const CheckboxFactory = ({ name, label, color, disabled }) => (
  <Checkbox name={name} color={color} label={label} disabled={disabled} />
);

CheckboxFactory.args = {
  name: "name",
  label: "Test label",
  color: "danger",
  disabled: false,
};

export const Checked = () => <Checkbox label={testLabel} onChange={onChange} checked />;

export const Unchecked = () => <Checkbox label={testLabel} onChange={onChange} />;

export const DifferentColor = () => <Checkbox label={testLabel} color="danger" onChange={onChange} checked />;

CheckboxFactory.parameters = {
  controls: {
    expanded: false,
  },
};

const HideControls = {
  name: { control: { disable: true } },
  label: { control: { disable: true } },
  color: { control: { disable: true } },
  disabled: { control: { disable: true } },
};

Checked.argTypes = HideControls;
Unchecked.argTypes = HideControls;
DifferentColor.argTypes = HideControls;
