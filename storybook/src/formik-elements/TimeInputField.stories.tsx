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
import { TimeInputField } from "@tiller-ds/formik-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";
import { beautifySource, FormikDecorator } from "../utils";

import mdx from "./TimeInputField.mdx";

const translations = storybookDictionary.translations;
const name = "time";
const localDateTime = "localDateTime";
const localTime = "localTime";
const nameWithValue = "nameWithValue";
const offsetDateTime = "offsetDateTime";
const offsetTime = "offsetTime";
const zonedDateTime = "zonedDateTime";

const nameWithError = "timeWithError";

const initialValues = {
  [nameWithValue]: "21:21",
  [localDateTime]: "2020-11-20T11:21:28.635778",
  [localTime]: "11:21:28.635803",
  [offsetTime]: "11:21:28.635970+05:00",
  [offsetDateTime]: "2020-11-20T11:21:28.63602+05:00",
  [zonedDateTime]: "2020-11-20T11:21:28.636042+01:00",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/TimeInputField",
  component: TimeInputField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "TimeInputField"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9901%3A23125",
    },
    decorators: [withDesign],
  },
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialValues={initialValues} initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),
  ],
};

export const WithLabel = () => <TimeInputField name={name} label={<Intl name="label" />} />;

export const WithoutLabel = () => <TimeInputField name={name} />;

export const WithValue = () => {
  // incl-code
  const initialValues = {
    nameWithValue: "21:21",
  };

  return <TimeInputField name="nameWithValue" label={<Intl name="label" />} />;
};

export const WithoutClearButton = () => <TimeInputField name={name} label={<Intl name="label" />} allowClear={false} />;

export const Disabled = () => <TimeInputField name={nameWithValue} label={<Intl name="label" />} disabled={true} />;

export const WithCustomPlaceholder = (args, context) => (
  <TimeInputField
    name={name}
    label={<Intl name="label" />}
    placeholder={translations[context.globals.language]["placeholder"]}
  />
);

export const WithHelp = () => <TimeInputField name={name} label={<Intl name="label" />} help={<Intl name="help" />} />;

export const WithTooltip = () => (
  <TimeInputField
    name={name}
    label={<Intl name="label" />}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
  />
);

export const WithError = () => <TimeInputField name={nameWithError} label={<Intl name="label" />} />;

export const WithLocalDateTime = () => {
  // incl-code
  const initialValues = {
    localDateTime: "2020-11-20T11:21:28.635778",
  };
  return <TimeInputField name="localDateTime" />;
};

export const WithLocalTime = () => {
  // incl-code
  const initialValues = {
    localTime: "11:21:28.635803",
  };
  return <TimeInputField name="localTime" />;
};

export const WithOffsetTime = () => {
  // incl-code
  const initialValues = {
    offsetTime: "11:21:28.635970+05:00",
  };
  return <TimeInputField name="offsetTime" withTimeZone={true} />;
};

export const WithOffsetDateTime = () => {
  // incl-code
  const initialValues = {
    offsetDateTime: "2020-11-20T11:21:28.63602+05:00",
  };
  return <TimeInputField name="offsetDateTime" withTimeZone={true} />;
};

export const WithZonedDateTime = () => {
  // incl-code
  const initialValues = {
    zonedDateTime: "2020-11-20T11:21:28.636042+01:00",
  };
  return <TimeInputField name="zonedDateTime" withTimeZone={true} />;
};

export const WithTwelveHour = () => <TimeInputField name={name} type="use12Hours" />;

export const WithTwelveHourAndValue = () => {
  // incl-code
  const initialValues = {
    nameWithValue: "21:21",
  };
  return <TimeInputField name="nameWithValue" type="use12Hours" />;
};
