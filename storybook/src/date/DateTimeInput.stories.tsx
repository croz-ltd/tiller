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
import { DateTimeInput } from "@tiller-ds/date";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";
import { beautifyDateSource } from "../utils";

import mdx from "./DateTimeInput.mdx";

const translations = storybookDictionary.translations;
const name = "datetimeinput";
const error = "Test error";

export default {
  title: "Component Library/Date/DateTimeInput",
  component: DateTimeInput,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source: string) => beautifyDateSource(source),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/Tiller?node-id=8780%3A11403",
    },
    decorators: [withDesign],
  },
};

export const WithState = () => {
  // incl-code
  // date state with stored Date or null value
  const [dateTime, setDateTime] = React.useState<Date | null>(null);
  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      label={<Intl name="label" />}
      onChange={(newDate) => {
        setDateTime(newDate);
      }}
      onReset={() => {
        setDateTime(null);
      }}
    />
  );
};

export const WithLabel = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={null}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const WithoutLabel = () => (
  <DateTimeInput name={name} value={null} onChange={() => {}} onReset={() => {}} onBlur={() => {}} />
);

export const WithValue = () => (
  <DateTimeInput
    name={name}
    value={new Date("2020-11-20T11:21:28.635778")}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
  />
);

export const Disabled = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={new Date("2020-11-20T11:21:28.635778")}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    disabled
  />
);

export const WithHelp = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={null}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    help={<Intl name="help" />}
  />
);

export const WithTooltip = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={null}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
  />
);

export const WithError = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={null}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    error={error}
  />
);

export const ReadOnly = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={new Date("2020-11-20T11:21:28.635778")}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    readOnly={true}
  />
);

export const WithCustomPlaceholder = (args, context) => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={null}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithMinAndMaxDate = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={null}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    minDate={new Date("2019-01-20")}
    maxDate={new Date("2021-01-10")}
  />
);

export const WithMinAndMaxDateAndValue = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={new Date("2020-11-20T11:21:28.635778")}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    minDate={new Date("2019-01-20")}
    maxDate={new Date("2021-01-10")}
  />
);

export const WithTwelveHours = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={null}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    type="use12Hours"
  />
);

export const WithTwelveHoursAndValue = () => (
  <DateTimeInput
    name={name}
    label={<Intl name="label" />}
    value={new Date("2020-11-20T11:21:28.635778")}
    onChange={() => {}}
    onReset={() => {}}
    onBlur={() => {}}
    type="use12Hours"
  />
);
