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
import { DateRangeInput } from "@tiller-ds/date";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";
import { beautifySource } from "../utils";

import mdx from "./DateRangeInput.mdx";

const translations = storybookDictionary.translations;
const name = "daterange";
const error = "date-error";

export default {
  title: "Component Library/Date/DateRangeInput",
  component: DateRangeInput,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: beautifySource,
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
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      label={<Intl name="label" />}
      start={startDate}
      end={endDate}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const WithoutLabel = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const WithValue = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(new Date("2020-01-01"));
  const [endDate, setEndDate] = React.useState<Date | null>(new Date("2020-01-15"));

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      label={<Intl name="label" />}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const Disabled = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      label={<Intl name="label" />}
      disabled={true}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const ReadOnly = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(new Date("2020-01-01"));
  const [endDate, setEndDate] = React.useState<Date | null>(new Date("2020-01-15"));

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      label={<Intl name="label" />}
      readOnly={true}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const WithCustomPlaceholder = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      placeholder="Test placeholder"
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const WithHelp = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      label={<Intl name="label" />}
      help={<Intl name="help" />}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const WithTooltip = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      tooltip={
        <Tooltip label={<Intl name="tooltip" />}>
          <Icon type="info" />
        </Tooltip>
      }
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const WithError = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
      error={error}
    />
  );
};

export const WithMinAndMaxDate = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      minDate={new Date("2020-10-05")}
      maxDate={new Date("2020-11-20")}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
    />
  );
};

export const WithHighlightedCurrentDate = () => {
  // incl-code
  // start date and end date states with stored Date or null values
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  return (
    <DateRangeInput
      name={name}
      start={startDate}
      end={endDate}
      label={<Intl name="label" />}
      onChange={(firstDate, secondDate) => {
        setStartDate(firstDate);
        setEndDate(secondDate);
      }}
      highlightToday={true}
    />
  );
};
