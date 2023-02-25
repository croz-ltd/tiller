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

import mdx from "./DateRangeInput.mdx";

const translations = storybookDictionary.translations;
const name = "daterange";
const startWithValue = new Date("2020-01-01");
const endWithValue = new Date("2020-01-15");
const error = "date-error";
const minDate = new Date("2020-10-05");
const maxDate = new Date("2020-11-20");

export default {
  title: "Component Library/Date/DateRangeInput",
  component: DateRangeInput,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source: string) => {
        const correctedSource = source
          .replace(/{name}/g, "'test'")
          .replace(/{<Intl name="label" \/>}/g, "'Test label'")
          .replace(/{<Intl name="help" \/>}/g, "'Test help content'")
          .replace(/{<Intl name="tooltip" \/>}/g, "'Test tooltip content'")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        if (correctedSource.indexOf("incl-code") === -1) {
          return correctedSource.substring(correctedSource.indexOf("<"), correctedSource.lastIndexOf("/>") + 2);
        }
        return correctedSource.substring(correctedSource.indexOf("incl-code") + "incl-code".length);
      },
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
  const [firstDate, setFirstDate] = React.useState<Date | null>(null);
  const [secondDate, setSecondDate] = React.useState<Date | null>(null);
  return (
    <DateRangeInput
      name={name}
      label={<Intl name="label" />}
      start={firstDate}
      end={secondDate}
      onChange={(firstDate, secondDate) => {
        setFirstDate(firstDate);
        setSecondDate(secondDate);
      }}
      onReset={() => {
        setFirstDate(null);
        setSecondDate(null);
      }}
    />
  );
};

export const WithoutLabel = () => <DateRangeInput name={name} onChange={() => {}} />;

export const WithValue = () => (
  <DateRangeInput
    name={name}
    start={startWithValue}
    end={endWithValue}
    label={<Intl name="label" />}
    onChange={() => {}}
  />
);

export const Disabled = () => (
  <DateRangeInput name={name} label={<Intl name="label" />} disabled={true} onChange={() => {}} />
);

export const ReadOnly = () => (
  <DateRangeInput
    name={name}
    start={startWithValue}
    end={endWithValue}
    label={<Intl name="label" />}
    readOnly={true}
    onChange={() => {}}
  />
);

export const WithPlaceholder = (args, context) => (
  <DateRangeInput name={name} placeholder={translations[context.globals.language]["placeholder"]} onChange={() => {}} />
);

export const WithHelp = () => <DateRangeInput name={name} help={<Intl name="help" />} onChange={() => {}} />;

export const WithTooltip = () => (
  <DateRangeInput
    name={name}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
    onChange={() => {}}
  />
);

export const WithError = () => <DateRangeInput name={name} onChange={() => {}} error={error} />;

export const WithMinAndMaxDate = () => (
  <DateRangeInput name={name} minDate={minDate} maxDate={maxDate} onChange={() => {}} />
);
