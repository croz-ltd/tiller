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

import { DateInputField } from "@tiller-ds/formik-elements";
import { Tooltip } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";
import { beautifySource, FormikDecorator } from "../utils";

import mdx from "./DateInputField.mdx";

const translations = storybookDictionary.translations;
const name = "date";

const initialValues = {
  dateWithValue: "2020-01-01",
  dateWithDateValue: new Date(),
};

const initialErrors = {
  dateWithError: "Test error",
};

const initialTouched = {
  dateWithError: true,
};

export default {
  title: "Component Library/Formik-elements/DateInputField",
  component: DateInputField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "DateInputField"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8780%3A11403",
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

export const WithLabel = () => <DateInputField name={name} label={<Intl name="label" />} />;

export const WithoutLabel = () => <DateInputField name={name} />;

export const WithValue = () => {
  // incl-code
  const initialValues = {
    dateWithValue: "2020-01-01",
  };
  return <DateInputField name="dateWithValue" label={<Intl name="label" />} />;
};

export const WithDateValue = () => {
  // incl-code
  const initialValues = {
    dateWithDateValue: new Date(),
  };
  return <DateInputField name="dateWithDateValue" label={<Intl name="label" />} />;
};

export const Disabled = () => <DateInputField name={name} label={<Intl name="label" />} disabled={true} />;

export const ReadOnly = () => <DateInputField name="dateWithValue" label={<Intl name="label" />} readOnly={true} />;

export const WithoutClearButton = () => <DateInputField name={name} label={<Intl name="label" />} allowClear={false} />;

export const WithCustomPlaceholder = (args, context) => (
  <DateInputField
    name={name}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithHelp = () => <DateInputField name={name} label={<Intl name="label" />} help={<Intl name="help" />} />;

export const WithTooltip = () => (
  <DateInputField
    name={name}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
  />
);

export const WithError = () => <DateInputField name="dateWithError" label={<Intl name="label" />} />;

export const WithMinAndMaxDate = () => (
  <DateInputField
    name={name}
    label={<Intl name="label" />}
    minDate={new Date("2019-01-20")}
    maxDate={new Date("2020-02-25")}
  />
);

export const WithMinAndMaxDateAndValue = () => {
  // incl-code
  const initialValues = {
    dateWithValue: "2020-01-01",
  };
  return (
    <DateInputField
      name="dateWithValue"
      label={<Intl name="label" />}
      minDate={new Date("2019-01-20")}
      maxDate={new Date("2020-02-25")}
    />
  );
};

export const WithHighlightedCurrentDate = () => (
  <DateInputField name={name} label={<Intl name="label" />} highlightToday={true} />
);
