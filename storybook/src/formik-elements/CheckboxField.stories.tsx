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

import { CheckboxField } from "@tiller-ds/formik-elements";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { FormikDecorator, getChangedTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./CheckboxField.mdx";

const name = "name";
const nameWithValue = "nameWithValue";
const label = "Test label";

const initialValues = {
  nameWithValue: true,
};

export default {
  title: "Component Library/Formik-elements/CheckboxField",
  component: CheckboxField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const tokensConfig = { CheckboxField: "checkboxFieldTokens", Checkbox: "checkboxTokens" };
        const correctedSource = source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getChangedTokensFromSource(correctedSource, tokensConfig);
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39202",
    },
    decorators: [withDesign],
  },

  // eslint-disable-next-line react/display-name
  decorators: [
    (storyFn: () => React.ReactNode) => <FormikDecorator initialValues={initialValues}>{storyFn()}</FormikDecorator>,
    withDesign,
  ],
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
    containerClassName: { name: "Container Class Name", control: "text" },
    className: { name: "Checkbox Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    checkboxFieldTokens: { name: "Checkbox Field Tokens", control: "object" },
    checkboxTokens: { name: "Checkbox Tokens", control: "object" },
  },
};

export const CheckboxFieldFactory = ({
  name,
  label,
  color,
  disabled,
  containerClassName,
  className,
  useTokens,
  checkboxFieldTokens,
  checkboxTokens,
}) => (
  <CheckboxField
    name={name}
    color={color}
    label={label}
    disabled={disabled}
    containerClassName={containerClassName}
    className={className}
    checkboxFieldTokens={useTokens && checkboxFieldTokens}
    checkboxTokens={useTokens && checkboxTokens}
  />
);

CheckboxFieldFactory.args = {
  name: "name",
  label: "Test label",
  color: "primary",
  disabled: false,
  containerClassName: "",
  className: "",
  useTokens: false,
  checkboxFieldTokens: defaultThemeConfig.component["CheckboxField"],
  checkboxTokens: defaultThemeConfig.component["Checkbox"],
};

CheckboxFieldFactory.parameters = {
  controls: {
    expanded: false,
  },
};

CheckboxFieldFactory.decorators = showFactoryDecorator();

export const Simple = () => <CheckboxField name={name} />;

export const WithValue = () => <CheckboxField name={nameWithValue} />;

export const WithLabel = () => <CheckboxField name={name} label={label} />;

export const WithNonPrimaryColor = () => <CheckboxField name={name} color="info" />;

const HideControls = {
  name: { control: { disable: true } },
  label: { control: { disable: true } },
  color: { control: { disable: true } },
  disabled: { control: { disable: true } },
  className: { control: { disable: true } },
  containerClassName: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  checkboxTokens: { control: { disable: true } },
  checkboxFieldTokens: { control: { disable: true } },
};

Simple.argTypes = HideControls;
WithValue.argTypes = HideControls;
WithLabel.argTypes = HideControls;
WithNonPrimaryColor.argTypes = HideControls;
