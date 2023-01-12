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
import { AutocompleteField } from "@tiller-ds/formik-elements";
import { Icon, iconTypes } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";
import { FormikDecorator, Item, items, lessItems, lessSimpleItems, promiseTimeout, simpleItems } from "../utils";

import mdx from "./AutocompleteField.mdx";

const translations = storybookDictionary.translations;
const name = "test";
const nameWithValue = "testWithValue";
const nameWithMultipleValues = "testWithMultipleValue";
const nameWithSimpleValue = "testWithSimpleValue";
const nameWithMultipleSimpleValues = "testWithMultipleSimpleValue";
const nameWithError = "testWithError";

const initialValues = {
  [nameWithValue]: items[1],
  [nameWithMultipleValues]: lessItems,
  [nameWithSimpleValue]: simpleItems[1],
  [nameWithMultipleSimpleValues]: lessSimpleItems,
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/AutocompleteField",
  component: AutocompleteField,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8642%3A11075",
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
      options: ["solid", "outline"],
      control: { type: "radio" },
    },
    maxItems: { name: "Max Shown Items", control: "number" },
    allowMultiple: { name: "Allow Multiple Selection", control: { type: "boolean" } },
    multipleSelectionLabel: { name: "Show Selected Labels", control: { type: "boolean" } },
    fetchFrontend: { name: "Fetch on Frontend", control: { type: "boolean" } },
    required: { name: "Required", control: { type: "boolean" } },
    disabled: { name: "Disabled" },
    tags: { name: "Tags", control: "boolean" },
    tagsContained: { name: "Contained tags (requires tags)", control: "boolean" },
    sendOptionValue: { name: "Send option value (on submit)", control: "boolean" },
    onAddCustomTag: { name: "Enable adding custom tag", control: "boolean" },
  },
};

const commonProps = {
  name,
  itemToString: (item: Item) => `${item.name} ${item.surname}`,
  sort: (items: Item[]) => items.sort((a, b) => a.name.localeCompare(b.name)),
};

const commonSimpleProps = {
  name,
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

export const AutocompleteFieldFactory = ({
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
}) => (
  <AutocompleteField
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
    {...(fetchFrontend ? (tags ? frontendSimpleProps : frontendProps) : tags ? backendSimpleProps : backendProps)}
  />
);

AutocompleteFieldFactory.args = {
  name: "name",
  label: "Test Label",
  help: "",
  placeholder: "Test placeholder content",
  tooltipToggle: false,
  tooltipText: "Test tooltip content",
  tooltipIcon: "info",
  iconVariant: "solid",
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
};

export const WithLabel = () => <AutocompleteField label={<Intl name="label" />} {...backendProps} />;

export const WithoutLabel = () => <AutocompleteField {...backendProps} />;

export const WithValue = () => (
  <AutocompleteField {...backendProps} label={<Intl name="label" />} name={nameWithValue} />
);

export const Disabled = () => (
  <AutocompleteField label={<Intl name="label" />} disabled={true} {...backendProps} name={nameWithValue} />
);

export const WithPlaceholder = (args, context) => (
  <AutocompleteField
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
    {...backendProps}
  />
);

export const WithHelp = () => (
  <AutocompleteField label={<Intl name="label" />} help={<Intl name="help" />} {...backendProps} />
);

export const WithTooltip = () => (
  <AutocompleteField
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
    label={<Intl name="label" />}
    {...backendProps}
  />
);

export const WithError = () => (
  <AutocompleteField label={<Intl name="label" />} {...backendProps} name={nameWithError} />
);

export const WithComplexDisplay = () => (
  <AutocompleteField label={<Intl name="label" />} {...backendProps} {...complexProps} allowMultiple={true} />
);

export const WithMultipleSelection = () => (
  <AutocompleteField label={<Intl name="label" />} {...backendProps} allowMultiple={true} />
);

export const WithMultipleSelectionAndValues = () => (
  <AutocompleteField
    label={<Intl name="label" />}
    {...backendProps}
    allowMultiple={true}
    name={nameWithMultipleValues}
  />
);

export const WithMultipleSelectionAndVisibleLabels = () => (
  <AutocompleteField
    label={<Intl name="label" />}
    {...backendProps}
    allowMultiple={true}
    getMultipleSelectedLabel={(items: Item[]) => items.map((item) => `${item.name} ${item.surname}`).join(", ")}
    name={nameWithMultipleValues}
  />
);

export const WithTags = () => (
  <AutocompleteField
    label={<Intl name="label" />}
    {...frontendSimpleProps}
    tags={true}
    allowMultiple={true}
    onAddCustomTag={(tag) => "#" + tag}
  />
);

export const WithComplexTags = () => (
  <AutocompleteField
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
  <AutocompleteField
    label={<Intl name="label" />}
    {...frontendSimpleProps}
    tags={true}
    tagsContained={true}
    onAddCustomTag={(tag) => "#" + tag}
    allowMultiple={true}
  />
);

export const WithFilteringOnFrontend = () => (
  <AutocompleteField label={<Intl name="label" />} {...frontendProps} name={nameWithMultipleValues} allowMultiple={true} />
);

export const WithMisusedProps = () => (
  <AutocompleteField {...backendProps} label={<Intl name="label" />} name={nameWithMultipleValues} />
);

AutocompleteFieldFactory.parameters = {
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
