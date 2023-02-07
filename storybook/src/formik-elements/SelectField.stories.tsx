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

import { Tooltip } from "@tiller-ds/core";
import { SelectField } from "@tiller-ds/formik-elements";
import { Icon, iconTypes } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { FormikDecorator, getTokensFromSource, Item, items } from "../utils";

import mdx from "./SelectField.mdx";

const name = "test";
const nameWithArray = "nameWithArray";
const nameWithError = "nameWithError";
const nameWithMissingValue = "nameWithMissingValue";
const nameWithValue = "nameWithValue";

const missingValue: Item = {
  username: "VladL201",
  name: "Vladimir",
  surname: "Lem",
};

const initialValues = {
  [nameWithValue]: items[1].username,
  [nameWithMissingValue]: missingValue,
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/SelectField",
  component: SelectField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const tokensConfig = { Input: "inputTokens", Select: "selectTokens" };
        const correctedSource = source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getTokensFromSource(correctedSource, tokensConfig);
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8707%3A11083",
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

    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => <div className="m-4">{storyFn()}</div>,
  ],
  argTypes: {
    allowMultiple: { name: "Allow Multiple" },
    multipleSelectionLabel: { name: "Show Selected Labels", control: { type: "boolean" } },
    disabled: { name: "Disabled" },
    help: { name: "Help", control: "text" },
    iconVariant: {
      name: "Tooltip Icon Variant",
      options: ["thin", "light", "regular", "bold", "fill"],
      control: { type: "radio" },
    },
    label: { name: "Label", control: "text" },
    name: { name: "Name (accessor)", control: "text" },
    placeholder: { name: "Placeholder", control: "text" },
    tooltipIcon: {
      control: { type: "select", options: iconTypes },
      defaultValue: "info",
      name: "Tooltip Icon",
    },
    tooltipText: { name: "Tooltip Text (on hover)", control: "text" },
    tooltipToggle: {
      control: { type: "boolean" },
      defaultValue: "true",
      name: "Toggle Tooltip (on/off)",
    },
    className: { name: "Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    selectTokens: { name: "Select Tokens", control: "object" },
    inputTokens: { name: "Input Tokens (only 'error' applies)", control: "object" },
  },
};

const complexProps = {
  name,
  options: items,
  // eslint-disable-next-line react/display-name
  getOptionLabel: (item: Item) => (
    <div className="flex items-center justify-between flex-wrap">
      <div>
        {item.name} {item.surname}
      </div>
      <div className="flex-shrink-0 text-sm leading-5 text-gray-500">@{item.username}</div>
    </div>
  ),
  sort: (items: Item[]) => items.sort((a, b) => a.name.localeCompare(b.name)),
};

const commonProps = {
  ...complexProps,
  getOptionValue: (item: Item) => item.username,
};

export const SelectFieldFactory = ({
  name,
  label,
  help,
  tooltipText,
  tooltipToggle,
  tooltipIcon,
  iconVariant,
  placeholder,
  allowMultiple,
  multipleSelectionLabel,
  disabled,
  className,
  useTokens,
  selectTokens,
  inputTokens,
}) => (
  <SelectField
    name={name}
    label={label}
    help={help}
    tooltip={
      tooltipToggle && (
        <Tooltip label={tooltipText}>
          <Icon type={tooltipIcon} variant={iconVariant} />
        </Tooltip>
      )
    }
    placeholder={placeholder}
    allowMultiple={allowMultiple}
    getMultipleSelectedLabel={
      multipleSelectionLabel
        ? (items: Item[]) => (
            <>{items.map((item, index) => (index === 0 ? "" : ", ") + item.name + " " + item.surname)}</>
          )
        : undefined
    }
    disabled={disabled}
    className={className}
    selectTokens={useTokens && selectTokens}
    inputTokens={useTokens && inputTokens}
    {...commonProps}
  />
);

SelectFieldFactory.args = {
  name: "name",
  label: "Test Label",
  help: "",
  placeholder: "Test placeholder content",
  tooltipToggle: false,
  tooltipText: "Test tooltip content",
  tooltipIcon: "info",
  iconVariant: "regular",
  allowMultiple: false,
  multipleSelectionLabel: false,
  disabled: false,
  className: "",
  useTokens: false,
  selectTokens: defaultThemeConfig.component["Select"],
  inputTokens: defaultThemeConfig.component["Input"],
};

export const WithLabel = () => <SelectField {...commonProps} label={<Intl name="label" />} />;

export const WithoutLabel = () => <SelectField {...commonProps} />;

export const WithValue = () => <SelectField {...commonProps} name={nameWithValue} label={<Intl name="label" />} />;

export const Disabled = () => (
  <SelectField {...commonProps} name={nameWithValue} label={<Intl name="label" />} disabled={true} />
);

export const DisabledItems = () => (
  <SelectField
    {...commonProps}
    label={<Intl name="label" />}
    isItemDisabled={(item: Item) => {
      return item.name === "Pero";
    }}
  />
);

export const WithPlaceholder = () => (
  <SelectField {...commonProps} label={<Intl name="label" />} placeholder={<Intl name="placeholder" />} />
);

export const WithHelp = () => (
  <SelectField {...commonProps} label={<Intl name="label" />} help={<Intl name="help" />} />
);

export const WithTooltip = () => (
  <SelectField
    {...commonProps}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" variant="regular" className="ml-1.5" />
      </Tooltip>
    }
  />
);

export const WithError = () => <SelectField {...commonProps} name={nameWithError} label={<Intl name="label" />} />;

export const WithLoadingIcon = () => (
  <SelectField {...commonProps} name={name} loading={true} label={<Intl name="label" />} />
);

export const WithMultipleSelection = () => (
  <SelectField {...commonProps} name={nameWithArray} allowMultiple={true} label={<Intl name="label" />} />
);

export const WithMultipleSelectionAndVisibleLabels = () => (
  <SelectField
    {...commonProps}
    name={nameWithArray}
    allowMultiple={true}
    label={<Intl name="label" />}
    getMultipleSelectedLabel={(items: Item[]) => (
      <>{items.map((item, index) => (index === 0 ? "" : ", ") + item.name + " " + item.surname)}</>
    )}
  />
);

export const WithMissingOption = () => (
  <SelectField {...commonProps} label={<Intl name="label" />} name={nameWithMissingValue} />
);

export const WithNoOptions = () => <SelectField label={<Intl name="label" />} name={name} options={[]} />;

SelectFieldFactory.parameters = {
  controls: {
    expanded: false,
  },
};

const HideControls = {
  name: { control: { disable: true } },
  label: { control: { disable: true } },
  help: { control: { disable: true } },
  placeholder: { control: { disable: true } },
  tooltipText: { control: { disable: true } },
  tooltipToggle: { control: { disable: true } },
  tooltipIcon: { control: { disable: true } },
  allowMultiple: { control: { disable: true } },
  multipleSelectionLabel: { control: { disable: true } },
  iconVariant: { control: { disable: true } },
  disabled: { control: { disable: true } },
  className: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  selectTokens: { control: { disable: true } },
  inputTokens: { control: { disable: true } },
};

WithLabel.argTypes = HideControls;
WithoutLabel.argTypes = HideControls;
WithValue.argTypes = HideControls;
Disabled.argTypes = HideControls;
WithPlaceholder.argTypes = HideControls;
WithHelp.argTypes = HideControls;
WithTooltip.argTypes = HideControls;
WithError.argTypes = HideControls;
WithMultipleSelection.argTypes = HideControls;
WithMultipleSelectionAndVisibleLabels.argTypes = HideControls;
WithMissingOption.argTypes = HideControls;
WithNoOptions.argTypes = HideControls;
