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

import { withDesign } from "storybook-addon-designs";

import { Tooltip } from "@tiller-ds/core";
import { DateInput } from "@tiller-ds/date";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import { beautifySource } from "../utils";

import mdx from "./DateInput.mdx";

export default {
  title: "Component Library/Date/DateInput",
  component: DateInput,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: beautifySource,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8780%3A11403",
    },
    decorators: [withDesign],
  },
};

const name = "test";

export const WithLabel = () => {
  // incl-code
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

export const WithoutLabel = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DateInput
      name={name}
      value={date}
      onChange={(newDate) => {
        setDate(newDate);
      }}
      onReset={() => {
        setDate(null);
      }}
    />
  );
};

export const WithValue = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(new Date("2020-01-01"));

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

export const Disabled = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(new Date("2020-01-01"));

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
      disabled={true}
    />
  );
};

export const ReadOnly = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(new Date("2020-01-01"));

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
      readOnly={true}
    />
  );
};

export const WithCustomPlaceholder = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DateInput
      name={name}
      value={date}
      label={<Intl name="label" />}
      placeholder="Text placeholder"
      onChange={(newDate) => {
        setDate(newDate);
      }}
      onReset={() => {
        setDate(null);
      }}
    />
  );
};

export const WithHelp = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DateInput
      name={name}
      value={date}
      label={<Intl name="label" />}
      help={<Intl name="help" />}
      onChange={(newDate) => {
        setDate(newDate);
      }}
      onReset={() => {
        setDate(null);
      }}
    />
  );
};

export const WithTooltip = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DateInput
      name={name}
      value={date}
      label={<Intl name="label" />}
      tooltip={
        <Tooltip label={<Intl name="tooltip" />}>
          <Icon type="info" />
        </Tooltip>
      }
      onChange={(newDate) => {
        setDate(newDate);
      }}
      onReset={() => {
        setDate(null);
      }}
    />
  );
};

export const WithError = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(null);

  return (
    <DateInput
      name={name}
      value={date}
      label={<Intl name="label" />}
      error="Test error text"
      onChange={(newDate) => {
        setDate(newDate);
      }}
      onReset={() => {
        setDate(null);
      }}
    />
  );
};

export const WithMinAndMaxDate = () => {
  // incl-code
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
      minDate={new Date("2019-01-20")}
      maxDate={new Date("2020-02-25")}
    />
  );
};

export const WithMinAndMaxDateAndValue = () => {
  // incl-code
  const [date, setDate] = React.useState<Date | null>(new Date("2020-01-01"));

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
      minDate={new Date("2019-01-20")}
      maxDate={new Date("2020-02-25")}
    />
  );
};

export const WithHighlightedCurrentDate = () => {
  // incl-code
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
      highlightToday={true}
    />
  );
};
