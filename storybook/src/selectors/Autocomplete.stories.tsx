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
import { Autocomplete } from "@tiller-ds/selectors";
import { defaultThemeConfig } from "@tiller-ds/theme";

import storybookDictionary from "../intl/storybookDictionary";
import { getTokensFromSource, Item, items, promiseTimeout, showFactoryDecorator, simpleItems } from "../utils";

import mdx from "./Autocomplete.mdx";

export default {
  title: "Component Library/Selectors/Autocomplete",
  component: Autocomplete,
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => <div className="m-4">{storyFn()}</div>,
  ],
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const tokensConfig = { Select: "selectTokens", Autocomplete: "autocompleteTokens" };
        const correctedSource = source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getTokensFromSource(correctedSource, tokensConfig);
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8642%3A11075",
    },
    decorators: [withDesign],
  },
  argTypes: {
    name: { name: "Name (accessor)", control: "text" },
    label: { name: "Label", control: "text" },
    help: { name: "Help", control: "text" },
    placeholder: { name: "Placeholder", control: "text" },
    tooltipText: { name: "Tooltip Text (on hover)", control: "text" },
    tooltipToggle: {
      name: "Toggle Tooltip (on/off)",
      control: { type: "boolean" },
    },
    tooltipIcon: {
      name: "Tooltip Icon",
      control: { type: "select", options: iconTypes },
    },
    iconVariant: {
      name: "Tooltip Icon Variant",
      options: ["thin", "light", "regular", "bold", "fill"],
      control: { type: "radio" },
    },
    maxItems: { name: "Max Shown Items", control: "number", if: { arg: "allowMultiple", truthy: false } },
    allowMultiple: { name: "Allow Multiple Selection", control: { type: "boolean" } },
    multipleSelectionLabel: { name: "Show Selected Labels", control: { type: "boolean" } },
    fetchFrontend: { name: "Fetch on Frontend", control: { type: "boolean" } },
    required: { name: "Required", control: { type: "boolean" } },
    disabled: { name: "Disabled" },
    tags: { name: "Tags", control: "boolean", if: { arg: "allowMultiple" } },
    tagsContained: {
      name: "Contained tags",
      control: "boolean",
      if: { arg: "tags" },
    },
    sendOptionValue: { name: "Send option value (on submit)", control: "boolean" },
    onAddCustomTag: { name: "Enable adding custom tag", control: "boolean", if: { arg: "tags" } },
    className: { name: "Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    autocompleteTokens: { name: "Autocomplete Tokens", control: "object" },
    selectTokens: { name: "Select Tokens", control: "object" },
    error: { control: false },
    tooltip: { control: false },
    value: { control: false },
  },
};

const translations = storybookDictionary.translations;
const name = "test";
const nameWithError = "testWithError";
const value = items[1];
const values = items.slice(0, 2);
const error = "Test error text";

const commonProps = {
  name,
  onChange: () => {},
  onBlur: () => {},
  itemToString: (item: Item) => `${item.name} ${item.surname}`,
  sort: (items: Item[]) => items.sort((a, b) => a.name.localeCompare(b.name)),
};

const commonSimpleProps = {
  name,
  onChange: () => {},
  onBlur: () => {},
  itemToString: (item: string) => `${item}`,
  sort: (items: string[]) => items.sort((a, b) => a.slice(1).localeCompare(b.slice(1))),
};

const complexProps = {
  name,
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

const backendProps = {
  ...commonProps,
  options: (query: string) =>
    promiseTimeout(
      Promise.resolve(
        query.length > 0
          ? items.filter(
              (item) =>
                item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.surname.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.username.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.name
                  .concat(" " + item.surname)
                  .toLowerCase()
                  .indexOf(query.toLowerCase()) !== -1
            )
          : items
      ),
      500
    ),
  getOptionValue: (item: Item) => item.username,
};

const backendSimpleProps = {
  ...commonSimpleProps,
  options: (query: string) =>
    promiseTimeout(
      Promise.resolve(
        query.length > 0
          ? simpleItems.filter(
              (item) =>
                item.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                item.toLowerCase().indexOf(query.toLowerCase()) !== -1
            )
          : simpleItems
      ),
      500
    ),
};

const frontendProps = {
  ...commonProps,
  options: items,
  getOptionValue: (item: Item) => item.username,
  filter: (name: string, option) =>
    (option.name.toLowerCase() + " " + option.surname.toLowerCase()).includes(name.toLowerCase()),
};

const frontendSimpleProps = {
  ...commonSimpleProps,
  options: simpleItems,
  filter: (name: string, option) => (option.toLowerCase() + " " + option.toLowerCase()).includes(name.toLowerCase()),
};

export const AutocompleteFactory = ({
  name,
  label,
  help,
  tooltipText,
  tooltipToggle,
  tooltipIcon,
  iconVariant,
  placeholder,
  maxItems,
  allowMultiple,
  multipleSelectionLabel,
  fetchFrontend,
  required,
  disabled,
  tags,
  tagsContained,
  sendOptionValue,
  onAddCustomTag,
  className,
  useTokens,
  autocompleteTokens,
  selectTokens,
}) => (
  <Autocomplete
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
    required={required}
    maxItems={maxItems}
    allowMultiple={allowMultiple ? allowMultiple : undefined}
    disabled={disabled}
    getMultipleSelectedLabel={
      multipleSelectionLabel && !tags
        ? (items: Item[]) => items.map((item) => `${item.name} ${item.surname}`).join(", ")
        : undefined
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    filter={
      fetchFrontend
        ? tags
          ? (name: string, option: string) =>
              (option.toLowerCase() + " " + option.toLowerCase()).includes(name.toLowerCase())
          : (name: string, option) =>
              (option.name.toLowerCase() + " " + option.surname.toLowerCase()).includes(name.toLowerCase())
        : undefined
    }
    tags={tags}
    tagsContained={tagsContained}
    sendOptionValue={sendOptionValue}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onAddCustomTag={tags && onAddCustomTag ? (tagName) => "#" + tagName : undefined}
    className={className}
    autocompleteTokens={useTokens && autocompleteTokens}
    selectTokens={useTokens && selectTokens}
    {...(fetchFrontend ? (tags ? frontendSimpleProps : frontendProps) : tags ? backendSimpleProps : backendProps)}
  />
);

AutocompleteFactory.args = {
  name: "name",
  label: "Test Label",
  help: "",
  placeholder: "Test placeholder content",
  tooltipToggle: false,
  tooltipText: "Test tooltip content",
  tooltipIcon: "info",
  iconVariant: "regular",
  allowMultiple: false,
  maxItems: 5,
  multipleSelectionLabel: false,
  tags: false,
  tagsContained: false,
  onAddCustomTag: true,
  sendOptionValue: true,
  fetchFrontend: false,
  required: false,
  disabled: false,
  className: "",
  useTokens: false,
  autocompleteTokens: defaultThemeConfig.component["Autocomplete"],
  selectTokens: defaultThemeConfig.component["Select"],
};

AutocompleteFactory.parameters = {
  controls: {
    expanded: false,
  },
};

AutocompleteFactory.decorators = showFactoryDecorator();

export const WithLabel = () => <Autocomplete label={<Intl name="label" />} {...backendProps} />;

export const WithoutLabel = () => <Autocomplete {...backendProps} />;

export const WithValue = () => (
  <Autocomplete {...backendProps} label={<Intl name="label" />} name={name} value={value} />
);

export const Disabled = () => (
  <Autocomplete label={<Intl name="label" />} disabled={true} {...backendProps} name={name} />
);

export const WithPlaceholder = (args, context) => (
  <Autocomplete
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
    {...backendProps}
  />
);

export const WithHelp = () => (
  <Autocomplete label={<Intl name="label" />} help={<Intl name="label" />} {...backendProps} />
);

export const WithTooltip = () => (
  <Autocomplete
    tooltip={
      <Tooltip label={<Intl name="label" />}>
        <Icon type="info" />
      </Tooltip>
    }
    label={<Intl name="label" />}
    {...backendProps}
  />
);

export const WithError = () => (
  <Autocomplete
    label={<Intl name="label" />}
    {...backendProps}
    help={<Intl name="label" />}
    name={nameWithError}
    error={error}
  />
);

export const WithComplexDisplay = () => (
  <Autocomplete label={<Intl name="label" />} {...backendProps} {...complexProps} allowMultiple={true} />
);

export const WithMultipleSelection = () => (
  <Autocomplete label={<Intl name="label" />} {...backendProps} allowMultiple={true} />
);

export const WithMultipleSelectionAndValues = () => (
  <Autocomplete label={<Intl name="label" />} {...backendProps} allowMultiple={true} name={name} value={values} />
);

export const WithMultipleSelectionAndVisibleLabels = () => (
  <Autocomplete
    label={<Intl name="label" />}
    {...backendProps}
    allowMultiple={true}
    getMultipleSelectedLabel={(items: Item[]) => items.map((item) => `${item.name} ${item.surname}`).join(", ")}
    name={name}
    value={values}
  />
);

export const WithTags = () => (
  <Autocomplete
    label={<Intl name="label" />}
    {...frontendSimpleProps}
    tags={true}
    allowMultiple={true}
    onAddCustomTag={(tag) => "#" + tag}
  />
);

export const WithComplexTags = () => (
  <Autocomplete
    label={<Intl name="label" />}
    {...frontendProps}
    tags={true}
    allowMultiple={true}
    onAddCustomTag={(tag) => ({
      name: tag.split(" ")[0],
      surname: tag.split(" ")[1] ?? "",
      username: tag.split(" ")[1] ? tag[0].toLowerCase() + tag.split(" ")[1].toLowerCase() : tag[0].toLowerCase() ?? "",
    })}
  />
);

export const WithContainedTags = () => (
  <Autocomplete
    label={<Intl name="label" />}
    {...frontendSimpleProps}
    tags={true}
    tagsContained={true}
    onAddCustomTag={(tag) => "#" + tag}
    allowMultiple={true}
  />
);

export const WithFilteringOnFrontend = () => (
  <Autocomplete label={<Intl name="label" />} {...frontendProps} name={name} allowMultiple={true} />
);

export const WithMisusedProps = () => <Autocomplete {...backendProps} label={<Intl name="label" />} name={name} />;

const HideControls = {
  name: { control: { disable: true } },
  label: { control: { disable: true } },
  help: { control: { disable: true } },
  placeholder: { control: { disable: true } },
  tooltipText: { control: { disable: true } },
  tooltipToggle: { control: { disable: true } },
  tooltipIcon: { control: { disable: true } },
  iconVariant: { control: { disable: true } },
  allowMultiple: { control: { disable: true } },
  multipleSelectionLabel: { control: { disable: true } },
  maxItems: { control: { disable: true } },
  fetchFrontend: { control: { disable: true } },
  required: { control: { disable: true } },
  disabled: { control: { disable: true } },
  tags: { control: { disable: true } },
  tagsContained: { control: { disable: true } },
  sendOptionValue: { control: { disable: true } },
  onAddCustomTag: { control: { disable: true } },
  className: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  autocompleteTokens: { control: { disable: true } },
  selectTokens: { control: { disable: true } },
};

WithLabel.argTypes = HideControls;
WithoutLabel.argTypes = HideControls;
WithValue.argTypes = HideControls;
Disabled.argTypes = HideControls;
WithPlaceholder.argTypes = HideControls;
WithHelp.argTypes = HideControls;
WithTooltip.argTypes = HideControls;
WithError.argTypes = HideControls;
WithFilteringOnFrontend.argTypes = HideControls;
WithMultipleSelection.argTypes = HideControls;
WithMultipleSelectionAndVisibleLabels.argTypes = HideControls;
WithMisusedProps.argTypes = HideControls;
WithTags.argTypes = HideControls;
WithComplexTags.argTypes = HideControls;
WithContainedTags.argTypes = HideControls;
