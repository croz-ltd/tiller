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

import { Tooltip } from "@tiller-ds/core";
import { Input, Textarea } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./Textarea.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Form-elements/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "Textarea"),
    },
  },
};

const translations = storybookDictionary.translations;
const name = "test";

export const WithLabel = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("");

  return (
    <Textarea
      name={name}
      value={value}
      label={<Intl name="label" />}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const WithoutLabel = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("");

  return (
    <Textarea
      name={name}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const WithValue = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("Test value");

  return (
    <Textarea
      name={name}
      value={value}
      label={<Intl name="label" />}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const Disabled = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("Test value");

  return (
    <Textarea
      name={name}
      value={value}
      label={<Intl name="label" />}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      disabled={true}
    />
  );
};

export const WithPlaceholder = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("Test value");

  return (
    <Textarea
      name={name}
      value={value}
      label={<Intl name="label" />}
      placeholder="Test placeholder"
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const WithHelp = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("");

  return (
    <Textarea
      name={name}
      value={value}
      help={<Intl name="help" />}
      label={<Intl name="label" />}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const WithTooltip = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("");

  return (
    <Textarea
      name={name}
      value={value}
      tooltip={
        <Tooltip label={<Intl name="tooltip" />}>
          <Icon type="info" variant="regular" />
        </Tooltip>
      }
      label={<Intl name="label" />}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const WithError = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("");

  return (
    <Textarea
      name={name}
      value={value}
      error={<Intl name="error" />}
      label={<Intl name="label" />}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const WithCustomHeight = () => {
  // incl-code
  // state with stored string value
  const [value, setValue] = React.useState<string>("");

  return (
    <Textarea
      name={name}
      value={value}
      label={<Intl name="label" />}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      textareaClassName="h-40"
    />
  );
};
