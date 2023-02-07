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

import { Tooltip } from "@tiller-ds/core";
import { InputField } from "@tiller-ds/formik-elements";
import { Icon, iconTypes } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { defaultThemeConfig } from "@tiller-ds/theme";

import storybookDictionary from "../intl/storybookDictionary";
import { FormikDecorator, getTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./InputField.mdx";

const translations = storybookDictionary.translations;
const name = "test";
const nameWithError = "nameWithError";
const nameWithValue = "nameWithValue";
const addOn = "https://";
const inlineLeadingAddOn = "$";
const inlineTrailingAddOn = "USD";

const onClick = action("icon-click");

const initialValues = {
  [nameWithValue]: "test",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/InputField",
  component: InputField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getTokensFromSource(correctedSource, "Input");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39201",
    },
    decorators: [withDesign],
  },
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialValues={initialValues} initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),
  ],
  argTypes: {
    name: { name: "Name (accessor)", control: "text" },
    label: { name: "Label", control: "text" },
    help: { name: "Help", control: "text" },
    placeholder: { name: "Placeholder", control: "text" },
    tooltipText: { name: "Tooltip Text (on hover)", control: "text" },
    tooltipToggle: { name: "Toggle Tooltip (on/off)", control: { type: "boolean" } },
    tooltipIcon: { name: "Tooltip Icon", control: { type: "select", options: iconTypes } },
    iconVariant: {
      name: "Tooltip Icon Variant",
      options: ["thin", "light", "regular", "bold", "fill"],
      control: { type: "radio" },
    },
    disabled: { name: "Disabled" },
    inlineIcon: { name: "Inline Icon", control: { type: "select", options: iconTypes } },
    iconType: { name: "Inline Icon Type", options: ["trailing", "leading", "none"], control: { type: "radio" } },
    autoTrim: { name: "Auto trim", control: { type: "boolean" } },
    allowClear: { name: "Allow Clear", control: { type: "boolean" } },
    className: { name: "Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
  },
};

export const InputFieldFactory = ({
  name,
  label,
  help,
  placeholder,
  tooltipText,
  tooltipToggle,
  tooltipIcon,
  iconVariant,
  allowClear,
  disabled,
  autoTrim,
  inlineIcon,
  iconType,
  className,
  useTokens,
  tokens,
}) => (
  <InputField
    name={name}
    label={label}
    help={help}
    placeholder={placeholder}
    tooltip={
      tooltipToggle && (
        <Tooltip label={tooltipText}>
          <Icon type={tooltipIcon} variant={iconVariant} />
        </Tooltip>
      )
    }
    inlineTrailingIcon={iconType === "trailing" && <Icon type={inlineIcon} />}
    inlineLeadingIcon={iconType === "leading" && <Icon type={inlineIcon} />}
    disabled={disabled}
    autoTrim={autoTrim}
    allowClear={allowClear}
    className={className}
    tokens={useTokens && tokens}
  />
);

InputFieldFactory.args = {
  name: "name",
  label: "Test Label",
  help: "",
  placeholder: "Test placeholder",
  tooltipToggle: false,
  tooltipText: "Test tooltip content",
  tooltipIcon: "info",
  iconVariant: "regular",
  iconType: "none",
  inlineIcon: "pencil-alt",
  allowClear: false,
  autoTrim: true,
  disabled: false,
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["Input"],
};

InputFieldFactory.parameters = {
  controls: {
    expanded: false,
  },
};

InputFieldFactory.decorators = showFactoryDecorator();

export const WithLabel = () => (
  <InputField name={name} label={<Intl name="label" />} allowClear={true} required={true} />
);

export const WithoutLabel = () => <InputField name={name} />;

export const WithValue = () => <InputField name={nameWithValue} label={<Intl name="label" />} />;

export const Disabled = () => <InputField name={nameWithValue} label={<Intl name="label" />} disabled={true} />;

export const WithPlaceholder = (args, context) => (
  <InputField
    name={name}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithHelp = () => <InputField name={name} label={<Intl name="label" />} help={<Intl name="help" />} />;

export const WithTooltip = () => (
  <InputField
    name={name}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" variant="regular" className="ml-1.5" />
      </Tooltip>
    }
    required={true}
  />
);

export const WithError = () => <InputField name={nameWithError} label={<Intl name="label" />} />;

export const WithLeadingIcon = () => (
  <InputField
    name={name}
    label={<Intl name="label" />}
    inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={onClick} />}
  />
);

export const WithTrailingIcon = () => (
  <InputField
    name={name}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" onClick={onClick} />}
  />
);

export const WithTrailingIconAndError = () => (
  <InputField
    name={nameWithError}
    label={<Intl name="label" />}
    inlineTrailingIcon={<Icon type="question" variant="fill" />}
  />
);

export const WithAddOn = () => <InputField name={name} label={<Intl name="label" />} addOn={addOn} />;

export const WithInlineLeadingAddOn = () => (
  <InputField name={name} label={<Intl name="label" />} inlineLeadingAddOn={inlineLeadingAddOn} />
);

export const WithInlineTrailingAddOn = () => (
  <InputField name={name} label={<Intl name="label" />} inlineTrailingAddOn={inlineTrailingAddOn} />
);

export const WithInlineLeadingAndTrailingAddOn = () => (
  <InputField
    name={name}
    label={<Intl name="label" />}
    inlineLeadingAddOn={inlineLeadingAddOn}
    inlineTrailingAddOn={inlineTrailingAddOn}
  />
);

export const WithNumber = () => <InputField name={name} label={<Intl name="label" />} type="number" />;

const HideControls = {
  name: { control: { disable: true } },
  label: { control: { disable: true } },
  help: { control: { disable: true } },
  placeholder: { control: { disable: true } },
  disabled: { control: { disable: true } },
  inlineIcon: { control: { disable: true } },
  iconType: { control: { disable: true } },
  autoTrim: { control: { disable: true } },
  tooltipText: { control: { disable: true } },
  tooltipIcon: { control: { disable: true } },
  tooltipToggle: { control: { disable: true } },
  iconVariant: { control: { disable: true } },
  allowClear: { control: { disable: true } },
  className: { control: { disable: true } },
  containerClassName: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

WithLabel.argTypes = HideControls;
WithoutLabel.argTypes = HideControls;
WithValue.argTypes = HideControls;
Disabled.argTypes = HideControls;
WithPlaceholder.argTypes = HideControls;
WithHelp.argTypes = HideControls;
WithTooltip.argTypes = HideControls;
WithError.argTypes = HideControls;
WithLeadingIcon.argTypes = HideControls;
WithTrailingIcon.argTypes = HideControls;
WithTrailingIconAndError.argTypes = HideControls;
WithAddOn.argTypes = HideControls;
WithInlineLeadingAddOn.argTypes = HideControls;
WithInlineTrailingAddOn.argTypes = HideControls;
WithInlineLeadingAndTrailingAddOn.argTypes = HideControls;
WithNumber.argTypes = HideControls;
