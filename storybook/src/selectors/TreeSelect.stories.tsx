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

import { TreeSelect } from "@tiller-ds/selectors";
import { Intl } from "@tiller-ds/intl";

import { TreeItem, treeItems } from "../utils";

import mdx from "./TreeSelect.mdx";

export default {
  title: "Component Library/Selectors/TreeSelect",
  component: TreeSelect,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const name = "test";
const value = treeItems[1]?.items?.[0]?.items?.[0]?.items?.[1];

const commonProps = {
  name,
  onChange: () => {},
  onBlur: () => {},
  options: treeItems,
  // eslint-disable-next-line react/display-name
  getOptionLabel: (option: TreeItem) => <>{option.name}</>,
  getItems: (option: TreeItem) => option.items || [],
};

export const WithLabel = () => <TreeSelect {...commonProps} label={<Intl name="label" />} />;

export const WithoutLabel = () => <TreeSelect {...commonProps} />;

export const WithValue = () => <TreeSelect value={value} label={<Intl name="label" />} {...commonProps} />;

export const Disabled = () => (
  <TreeSelect value={value} label={<Intl name="label" />} disabled={true} {...commonProps} />
);

export const WithPlaceholder = () => (
  <TreeSelect label={<Intl name="label" />} placeholder={<Intl name="placeholder" />} {...commonProps} />
);

export const WithHelp = () => <TreeSelect label={<Intl name="label" />} help={<Intl name="help" />} {...commonProps} />;

export const WithError = () => (
  <TreeSelect label={<Intl name="label" />} error={<Intl name="error" />} {...commonProps} />
);

export const WithValueLabel = () => (
  <TreeSelect
    {...commonProps}
    value={value}
    getValueLabel={(item) => (
      <>
        {item.code} {item.name}
      </>
    )}
  />
);
