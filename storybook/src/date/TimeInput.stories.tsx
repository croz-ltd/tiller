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
import { TimeInput } from "@tiller-ds/date";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import storybookDictionary from "../intl/storybookDictionary";
import { beautifySource } from "../utils";

import mdx from "./TimeInput.mdx";

export default {
  title: "Component Library/Date/TimeInput",
  component: TimeInput,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: beautifySource,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9901%3A23125",
    },
    decorators: [withDesign],
  },
};

const translations = storybookDictionary.translations;
const name = "test";

export const WithState = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);
  return (
    <TimeInput
      name={name}
      value={time}
      label={<Intl name="label" />}
      onChange={(newDate) => {
        setTime(newDate);
      }}
      onReset={() => {
        setTime(null);
      }}
    />
  );
};
export const WithLabel = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <TimeInput
      name={name}
      value={time}
      label={<Intl name="label" />}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      onBlur={() => {}}
    />
  );
};

export const WithoutLabel = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);

  return <TimeInput name={name} value={time} onChange={(newTime) => setTime(newTime)} onReset={() => setTime(null)} />;
};

export const WithValue = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>("21:30");

  return <TimeInput name={name} value={time} onChange={(newTime) => setTime(newTime)} onReset={() => setTime(null)} />;
};

export const Disabled = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      disabled={true}
    />
  );
};

export const WithCustomPlaceholder = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <TimeInput
      name={name}
      value={time}
      label={<Intl name="label" />}
      placeholder="Test placeholder"
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
    />
  );
};

export const WithHelp = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      help={<Intl name="help" />}
    />
  );
};

export const WithTooltip = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
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
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      error={<Intl name="error" />}
    />
  );
};

export const WithLocalDateTime = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>("2020-11-20T11:21:28.635778");

  return <TimeInput name={name} value={time} onChange={(newTime) => setTime(newTime)} onReset={() => setTime(null)} />;
};

export const WithLocalTime = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>("11:21:28.635803");

  return (
    <TimeInput name={name} value={time} onChange={(newTime) => setTime(newTime)} onReset={() => {}} onBlur={() => {}} />
  );
};

export const WithOffsetTime = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>("11:21:28.635970+01:00");

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      withTimeZone={true}
    />
  );
};

export const WithOffsetDateTime = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>("2020-11-20T11:21:28.63602+05:00");

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      withTimeZone={true}
    />
  );
};

export const WithZonedDateTime = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>("2020-11-20T11:21:28.636042+01:00");

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      withTimeZone={true}
    />
  );
};

export const WithTwelveHour = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>(null);

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      withTimeZone={true}
      type="use12Hours"
    />
  );
};

export const WithTwelveHourAndValue = () => {
  // incl-code
  // state with stored string or null value
  const [time, setTime] = React.useState<string | null>("11:21:28.635970+05:00");

  return (
    <TimeInput
      name={name}
      value={time}
      onChange={(newTime) => setTime(newTime)}
      onReset={() => setTime(null)}
      withTimeZone={true}
      type="use12Hours"
    />
  );
};
