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

import { action } from "@storybook/addon-actions";
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

const onChange = action("daterange-change");

export default {
  title: "Component Library/Date/DateRangeInput",
  component: DateRangeInput,
  parameters: {
    docs: {
      source: { type: "dynamic" },
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/Tiller?node-id=8780%3A11403",
    },
    decorators: [withDesign],
  },
};

export const WithLabel = () => <DateRangeInput name={name} label={<Intl name="label" />} onChange={onChange} />;

export const WithoutLabel = () => <DateRangeInput name={name} onChange={onChange} />;

export const WithValue = () => (
  <DateRangeInput
    name={name}
    start={startWithValue}
    end={endWithValue}
    label={<Intl name="label" />}
    onChange={onChange}
  />
);

export const Disabled = () => (
  <DateRangeInput name={name} label={<Intl name="label" />} disabled={true} onChange={onChange} />
);

export const ReadOnly = () => (
  <DateRangeInput name={name} label={<Intl name="label" />} readOnly={true} onChange={onChange} />
);

export const WithPlaceholder = (args, context) => (
  <DateRangeInput name={name} placeholder={translations[context.globals.language]["placeholder"]} onChange={onChange} />
);

export const WithHelp = () => <DateRangeInput name={name} help={<Intl name="help" />} onChange={onChange} />;

export const WithTooltip = () => (
  <DateRangeInput
    name={name}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
    onChange={onChange}
  />
);

export const WithError = () => <DateRangeInput name={name} onChange={onChange} error={error} />;

export const WithMinAndMaxDate = () => (
  <DateRangeInput name={name} minDate={minDate} maxDate={maxDate} onChange={onChange} />
);
