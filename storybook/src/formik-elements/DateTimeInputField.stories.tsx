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

import { DateTimeInputField } from "@tiller-ds/formik-elements";
import { FormikDecorator } from "../utils";
import { Tooltip } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";

import mdx from "./DateTimeInputField.mdx";

const translations = storybookDictionary.translations;
const name = "time";
const maxDate = new Date("2021-01-10");
const minDate = new Date("2019-01-20");
const nameWithError = "timeWithError";
const nameWithValue = "nameWithValue";
const offsetDateTime = "offsetDateTime";

const initialValues = {
  [offsetDateTime]: "2020-11-20T11:21:28.63602+05:00",
  [nameWithValue]: "2020-11-20T21:21:28",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/DateTimeInputField",
  component: DateTimeInputField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        return source
          .replace(/{name}/g, "'test'")
          .replace(/{<Intl name="label" \/>}/g, "'Test label'")
          .replace(/{<Intl name="help" \/>}/g, "'Test help content'")
          .replace(/{<Intl name="tooltip" \/>}/g, "'Test tooltip content'")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/Tiller?node-id=8780%3A11403",
    },
  },
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialValues={initialValues} initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),
    withDesign,
  ],
};

export const WithLabel = () => <DateTimeInputField name={name} label={<Intl name="label" />} />;

export const WithoutLabel = () => <DateTimeInputField name={name} />;

export const WithValue = () => <DateTimeInputField name={nameWithValue} label={<Intl name="label" />} />;

export const WithoutClearButton = () => <DateTimeInputField name={nameWithValue} allowClear={false} />;

export const Disabled = () => <DateTimeInputField name={name} label={<Intl name="label" />} disabled={true} />;

export const WithHelp = () => (
  <DateTimeInputField name={name} label={<Intl name="label" />} help={<Intl name="help" />} />
);

export const WithTooltip = () => (
  <DateTimeInputField
    name={name}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
  />
);

export const WithError = () => <DateTimeInputField name={nameWithError} label={<Intl name="label" />} />;

export const ReadOnly = () => <DateTimeInputField name={nameWithValue} label={<Intl name="label" />} readOnly={true} />;

export const WithCustomPlaceholder = (args, context) => (
  <DateTimeInputField
    name={name}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithMinAndMaxDate = () => (
  <DateTimeInputField name={name} label={<Intl name="label" />} minDate={minDate} maxDate={maxDate} />
);
export const WithMinAndMaxDateAndValue = () => (
  <DateTimeInputField name={nameWithValue} label={<Intl name="label" />} minDate={minDate} maxDate={maxDate} />
);

export const WithTwelveHours = () => <DateTimeInputField name={name} label={<Intl name="label" />} type="use12Hours" />;

export const WithTwelveHoursAndValue = () => (
  <DateTimeInputField name={nameWithValue} label={<Intl name="label" />} type="use12Hours" />
);
