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
import { beautifySource } from "../utils";

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
      transformSource: (source: string) => beautifySource(source),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/Tiller?node-id=8780%3A11403",
    },
    decorators: [withDesign],
  },
};

export const WithLabel = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      label={<Intl name="label" />}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
    />
  );
};

export const WithoutLabel = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
    />
  );
};

export const WithValue = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(new Date("2020-11-20T11:21:28.635778"));

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
    />
  );
};

export const Disabled = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(new Date("2020-11-20T11:21:28.635778"));

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      disabled
    />
  );
};

export const WithHelp = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      help={<Intl name="help" />}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
    />
  );
};

export const WithTooltip = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      tooltip={
        <Tooltip label={<Intl name="tooltip" />}>
          <Icon type="info" />
        </Tooltip>
      }
    />
  );
};

export const WithError = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      error={error}
    />
  );
};

export const ReadOnly = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(new Date("2020-11-20T11:21:28.635778"));

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      readOnly={true}
    />
  );
};

export const WithCustomPlaceholder = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      placeholder="Test placeholder"
    />
  );
};

export const WithMinAndMaxDate = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      minDate={new Date("2019-01-20")}
      maxDate={new Date("2021-01-10")}
    />
  );
};

export const WithMinAndMaxDateAndValue = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(new Date("2020-11-20T11:21:28.635778"));

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      minDate={new Date("2019-01-20")}
      maxDate={new Date("2021-01-10")}
    />
  );
};

export const WithTwelveHours = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      type="use12Hours"
    />
  );
};

export const WithTwelveHoursAndValue = () => {
  // incl-code
  const [dateTime, setDateTime] = React.useState<Date | null>(new Date("2020-11-20T11:21:28.635778"));

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      type="use12Hours"
    />
  );
};

export const WithHighlightedCurrentDate = () => {
  const name = "example";
  const [dateTime, setDateTime] = React.useState<Date | null>(null);

  return (
    <DateTimeInput
      name={name}
      value={dateTime}
      onChange={(newDate) => setDateTime(newDate)}
      onReset={() => setDateTime(null)}
      highlightToday={true}
    />
  );
};
