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

import { MaskedInput } from "@tiller-ds/form-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import mdx from "./MaskedInput.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Form-elements/MaskedInput",
  component: MaskedInput,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "MaskedInput"),
    },
  },
};

const name = "test";

export const WithMask = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithKeptCharsPositions = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      value={value}
      keepCharPositions={true}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithMaskHidden = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      value={value}
      showMask={false}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithCustomPlaceholder = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={[/[0-9]/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
      value={value}
      placeholder="MM/DD/YYYY"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const WithLabel = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      label={<Intl name="label" />}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithValue = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("(385)991-1346");

  return (
    <MaskedInput
      name={name}
      label={<Intl name="label" />}
      value={value}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const Disabled = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      label={<Intl name="label" />}
      disabled={true}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
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
    <MaskedInput
      name={name}
      label={<Intl name="label" />}
      help={<Intl name="help" />}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithError = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      label={<Intl name="label" />}
      error={<Intl name="error" />}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithLeadingIcon = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      label={<Intl name="label" />}
      inlineLeadingIcon={<Icon type="envelope-simple" variant="fill" />}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithTrailingIcon = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      label={<Intl name="label" />}
      inlineTrailingIcon={<Icon type="question" variant="fill" />}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithTrailingIconAndError = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      label={<Intl name="label" />}
      inlineTrailingIcon={<Icon type="question" variant="fill" />}
      value={value}
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
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      label={<Intl name="label" />}
      addOn="https://"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithInlineLeadingAddOn = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      label={<Intl name="label" />}
      inlineLeadingAddOn="$"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithInlineTrailingAddOn = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      label={<Intl name="label" />}
      inlineTrailingAddOn="USD"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};

export const WithInlineLeadingAndTrailingAddOn = () => {
  // incl-code
  const [value, setValue] = React.useState<string>("");

  return (
    <MaskedInput
      name={name}
      mask={["(", /[1-9]/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
      label={<Intl name="label" />}
      inlineLeadingAddOn="$"
      inlineTrailingAddOn="USD"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => {}}
    />
  );
};
