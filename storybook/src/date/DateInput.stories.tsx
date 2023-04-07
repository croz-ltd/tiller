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
import { DateInput } from "@tiller-ds/date";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";
import { beautifySource } from "../utils";

import mdx from "./DateInput.mdx";

export default {
  title: "Component Library/Date/DateInput",
  component: DateInput,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source: string) => beautifySource(source),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8780%3A11403",
    },
    decorators: [withDesign],
  },
};

const translations = storybookDictionary.translations;
const name = "test";

export const WithState = () => {
  // incl-code
  // state with stored Date or null value
  const [date, setDate] = React.useState<Date | null>(null);
  return (
    <DateInput
      name={name}
      value={date}
      label={<Intl name="label" />}
      onChange={(newDate) => {
        setDate(newDate);
      }}
      onReset={() => {
        setDate(null);
      }}
    />
  );
};

export const WithLabel = () => (
  <DateInput
    name={name}
    value={null}
    label={<Intl name="label" />}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const WithoutLabel = () => (
  <DateInput name={name} value={null} onChange={() => {}} onReset={() => {}} onBlur={() => {}} />
);

export const WithValue = () => (
  <DateInput
    name={name}
    value={new Date("2020-01-01")}
    label={<Intl name="label" />}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const Disabled = () => (
  <DateInput
    name={name}
    value={new Date("2020-01-01")}
    label={<Intl name="label" />}
    disabled={true}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const ReadOnly = () => (
  <DateInput
    name={name}
    value={new Date("2020-01-01")}
    label={<Intl name="label" />}
    readOnly={true}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const WithCustomPlaceholder = (args, context) => (
  <DateInput
    name={name}
    value={null}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const WithHelp = () => (
  <DateInput
    name={name}
    value={null}
    label={<Intl name="label" />}
    help={<Intl name="help" />}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const WithTooltip = () => (
  <DateInput
    name={name}
    value={null}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const WithError = () => (
  <DateInput
    name={name}
    value={null}
    label={<Intl name="label" />}
    error={"Test error text"}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const WithMinAndMaxDate = () => (
  <DateInput
    name={name}
    value={null}
    label={<Intl name="label" />}
    minDate={new Date("2019-01-20")}
    maxDate={new Date("2020-02-25")}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);
export const WithMinAndMaxDateAndValue = () => (
  <DateInput
    name={name}
    value={new Date("2020-01-01")}
    label={<Intl name="label" />}
    minDate={new Date("2019-01-20")}
    maxDate={new Date("2020-02-25")}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const WithHighlightedCurrentDate = () => (
  <DateInput
    name={name}
    value={null}
    label={<Intl name="label" />}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    highlightToday={true}
  />
);
