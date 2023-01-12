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
import { TimeInput } from "@tiller-ds/date";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import mdx from "./TimeInput.mdx";

export default {
  title: "Component Library/Date/TimeInput",
  component: TimeInput,
  parameters: {
    docs: {
      source: { type: "dynamic" },
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9901%3A23125",
    },
    decorators: [withDesign],
  },
};

const name = "test";
const localDateTime = "2020-11-20T11:21:28.635778";
const localTime = "11:21:28.635803";
const value = "21:30";
const offsetDateTime = "2020-11-20T11:21:28.63602+05:00";
const offsetTime = "11:21:28.635970+05:00";
const zonedDateTime = "2020-11-20T11:21:28.636042+01:00";

const onBlur = action("time-input-blur");
const onChange = action("time-input-change");
const onReset = action("time-input-reset");

export const WithLabel = () => (
  <TimeInput name={name} label={<Intl name="label" />} value="" onChange={onChange} onBlur={onBlur} />
);

export const WithoutLabel = () => <TimeInput name={name} value="" onChange={onChange} onBlur={onBlur} />;

export const WithValue = () => <TimeInput name={name} value={value} onChange={onChange} onBlur={onBlur} />;

export const Disabled = () => <TimeInput name={name} value="" onChange={onChange} onBlur={onBlur} disabled={true} />;

export const WithHelp = () => (
  <TimeInput name={name} value="" onChange={onChange} onBlur={onBlur} help={<Intl name="help" />} />
);

export const WithTooltip = () => (
  <TimeInput
    name={name}
    value=""
    onChange={onChange}
    onBlur={onBlur}
    tooltip={
      <Tooltip label={<Intl name="tooltip" />}>
        <Icon type="info" />
      </Tooltip>
    }
  />
);

export const WithError = () => (
  <TimeInput name={name} value="" onChange={onChange} onReset={onReset} onBlur={onBlur} error={<Intl name="error" />} />
);

export const WithLocalDateTime = () => (
  <TimeInput name={name} value={localDateTime} onChange={onChange} onReset={onReset} onBlur={onBlur} />
);

export const WithLocalTime = () => (
  <TimeInput name={name} value={localTime} onChange={onChange} onReset={onReset} onBlur={onBlur} />
);

export const WithOffsetTime = () => (
  <TimeInput name={name} value={offsetTime} onChange={onChange} onReset={onReset} onBlur={onBlur} withTimeZone={true} />
);

export const WithOffsetDateTime = () => (
  <TimeInput
    name={name}
    value={offsetDateTime}
    onChange={onChange}
    onReset={onReset}
    onBlur={onBlur}
    withTimeZone={true}
  />
);

export const WithZonedDateTime = () => (
  <TimeInput
    name={name}
    value={zonedDateTime}
    onChange={onChange}
    onReset={onReset}
    onBlur={onBlur}
    withTimeZone={true}
  />
);

export const WithTwelveHour = () => (
  <TimeInput
    name={name}
    value={""}
    onChange={onChange}
    onReset={onReset}
    onBlur={onBlur}
    withTimeZone={true}
    type="use12Hours"
  />
);

export const WithTwelveHourAndValue = () => (
  <TimeInput
    name={name}
    value={offsetTime}
    onChange={onChange}
    onReset={onReset}
    onBlur={onBlur}
    withTimeZone={true}
    type="use12Hours"
  />
);
