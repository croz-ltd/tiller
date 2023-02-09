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
import { Icon, iconTypes } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { Select } from "@tiller-ds/selectors";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { getChangedTokensFromSource, Item, items, showFactoryDecorator } from "../utils";

import mdx from "./Select.mdx";

export default {
  title: "Component Library/Selectors/Select",
  component: Select,
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => <div className="m-4">{storyFn()}</div>,
  ],
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const tokensConfig = { Input: "inputTokens", Select: "selectTokens" };
        const correctedSource = source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getChangedTokensFromSource(correctedSource, tokensConfig);
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8707%3A11083",
    },
    decorators: [withDesign],
  },
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
    error: { control: false },
    hideClearButton: { control: false },
    loading: { control: false },
    noResultsPlaceholder: { control: false },
    options: { control: false },
    required: { control: false },
    tooltip: { control: false },
    value: { control: false },
  },
};

const name = "test";
const nameWithArray = "nameWithArray";
const nameWithError = "nameWithError";
const nameWithMissingValue = "nameWithMissingValue";
const nameWithValue = "nameWithValue";
const value = items[1];
const missingValue = {
  username: "VladL201",
  name: "Vladimir",
  surname: "Lem",
};

const complexProps = {
  name,
  onBlur: () => {},
  onChange: () => {},
  options: items,
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

export const SelectFactory = ({
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
  <Select
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

SelectFactory.args = {
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

SelectFactory.parameters = {
  controls: {
    expanded: false,
  },
};

SelectFactory.decorators = showFactoryDecorator();

export const WithLabel = () => <Select {...commonProps} label={<Intl name="label" />} />;

export const WithoutLabel = () => <Select {...commonProps} />;

export const WithValue = () => (
  <Select value={value} {...commonProps} name={nameWithValue} label={<Intl name="label" />} />
);

export const Disabled = () => (
  <Select value={value} {...commonProps} name={nameWithValue} label={<Intl name="label" />} disabled={true} />
);

export const DisabledItems = () => (
  <Select
    {...commonProps}
    label={<Intl name="label" />}
    isItemDisabled={(item: Item) => {
      return item.name === "Pero";
    }}
  />
);

export const WithPlaceholder = () => (
  <Select {...commonProps} label={<Intl name="label" />} placeholder={<Intl name="placeholder" />} />
);

export const WithHelp = () => <Select {...commonProps} label={<Intl name="label" />} help={<Intl name="help" />} />;

export const WithTooltip = () => (
  <Select
    {...commonProps}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" variant="regular" className="ml-1.5" />
      </Tooltip>
    }
  />
);

export const WithError = () => (
  <Select {...commonProps} error={<Intl name="error" />} name={nameWithError} label={<Intl name="label" />} />
);

export const WithLoadingIcon = () => (
  <Select {...commonProps} name={name} loading={true} label={<Intl name="label" />} />
);

export const WithMultipleSelection = () => (
  <Select
    value={[items[0], items[2]]}
    {...commonProps}
    name={nameWithArray}
    allowMultiple={true}
    label={<Intl name="label" />}
  />
);

export const WithMultipleSelectionAndVisibleLabels = () => (
  <Select
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
  <Select value={missingValue} {...commonProps} label={<Intl name="label" />} name={nameWithMissingValue} />
);

export const WithNoOptions = () => (
  <Select label={<Intl name="label" />} name={name} onChange={() => {}} onBlur={() => {}} options={[]} />
);

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
