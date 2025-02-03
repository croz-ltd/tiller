/*
 *    Copyright 2025 CROZ d.o.o, the original author or authors.
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

import { TreeSelectField } from "@tiller-ds/formik-elements";
import { Intl } from "@tiller-ds/intl";

import { beautifySource, FormikDecorator, TreeItem, treeItems } from "../utils";

import mdx from "./TreeSelectField.mdx";
import storybookDictionary from "../intl/storybookDictionary";

const translations = storybookDictionary.translations;
const name = "test";
const nameWithError = "nameWithError";
const nameWithTreeItem = "nameWithTreeItem";

const initialValues = {
  [nameWithTreeItem]: { name: "TM 2", code: "U010105" },
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/TreeSelectField",
  component: TreeSelectField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "TreeSelectField"),
    },
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
};

const commonProps = {
  name,
  options: treeItems,
  // eslint-disable-next-line react/display-name
  getOptionLabel: (option: TreeItem) => <>{option.name}</>,
  getItems: (option: TreeItem) => option.items || [],
  itemToString: (option: TreeItem) => option.name,
};

const complexProps = {
  ...commonProps,
  getOptionValue: (option: TreeItem) => ({ id: option.code, name: option.name }),
};

export const WithLabel = () => <TreeSelectField {...commonProps} label={<Intl name="label" />} />;

export const WithoutLabel = () => <TreeSelectField {...commonProps} />;

export const WithValue = () => {
  // incl-code
  const initialValues = {
    nameWithTreeItem: { name: "TM 2", code: "U010105" },
  };

  return <TreeSelectField label={<Intl name="label" />} {...commonProps} name="nameWithTreeItem" />;
};

export const Disabled = () => (
  <TreeSelectField label={<Intl name="label" />} disabled={true} {...commonProps} name="nameWithTreeItem" />
);

export const WithPlaceholder = (args, context) => (
  <TreeSelectField
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
    {...commonProps}
  />
);

export const WithHelp = () => <TreeSelectField label={<Intl name="label" />} help={<Intl name="help" />} {...commonProps} />;

export const WithError = () => <TreeSelectField label={<Intl name="label" />} {...commonProps} name={nameWithError} />;

export const WithOptionValue = () => <TreeSelectField {...complexProps} />;

export const WithValueLabel = () => (
  <TreeSelectField
    {...commonProps}
    name="nameWithTreeItem"
    getValueLabel={(item) => (
      <>
        {item.code} {item.name}
      </>
    )}
  />
);

export const WithCustomFiltering = () => (
  <TreeSelectField
    {...commonProps}
    filter={(name: string, option) =>
      option.name.toLowerCase().includes(name.toLowerCase()) ||
      Boolean(option.code && option.code.toLowerCase().includes(name.toLowerCase()))
    }
  />
);
