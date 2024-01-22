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

import { Input } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { Tooltip } from "@tiller-ds/core";

import mdx from "./Input.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Form-elements/Input",
  component: Input,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "Input"),
    },
  },
  design: {
    type: "figma",
    url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39201",
  },
  decorators: [withDesign],
};

const name = "test";

export const WithLabel = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithoutLabel = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return <Input name={name} value={value} onChange={(e) => setValue(e.target.value)} onBlur={() => {}} />;
};

export const WithValue = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("Test value");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const Disabled = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("Test value");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
      disabled={true}
    />
  );
};

export const WithPlaceholder = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      label={<Intl name="label" />}
      placeholder="Test placeholder"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithHelp = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      help={<Intl name="help" />}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithTooltip = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      tooltip={
        <Tooltip label={<Intl name="tooltip" />}>
          <Icon type="info" variant="regular" />
        </Tooltip>
      }
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithError = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      error={<Intl name="error" />}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithLeadingIcon = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" onClick={() => {}} />}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithTrailingIcon = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      inlineTrailingIcon={<Icon type="question" variant="fill" onClick={() => {}} />}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithTrailingIconAndError = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      inlineTrailingIcon={<Icon type="question" variant="fill" />}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
      error={<Intl name="error" />}
    />
  );
};

export const WithAddOn = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      addOn="https://"
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithInlineLeadingAddOn = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      inlineLeadingAddOn="$"
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithInlineTrailingAddOn = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      inlineTrailingAddOn="USD"
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithInlineTrailingAddOnAndError = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      error={<Intl name="error" />}
      inlineTrailingAddOn="USD"
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithInlineLeadingAndTrailingAddOn = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      inlineLeadingAddOn="$"
      inlineTrailingAddOn="USD"
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithClearButton = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("Test value");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      onChange={(e) => setValue(e.target.value)}
      onReset={() => setValue("")}
      allowClear
    />
  );
};

export const WithNumber = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <Input
      name={name}
      value={value}
      label={<Intl name="label" />}
      type="number"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
