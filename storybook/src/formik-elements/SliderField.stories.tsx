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

import { SliderField } from "@tiller-ds/formik-elements";
import { Intl } from "@tiller-ds/intl";

import { FormikDecorator } from "../utils";

import mdx from "./SliderField.mdx";

const name = "test";
const nameWithError = "nameWithError";
const nameWithValue = "nameWithValue";
const nameWithMultipleValues = "nameWithMultipleValues";
const nameWithMultipleValuesStacked = "nameWithMultipleValuesStacked";
const nameWithMultipleValuesResetOtherValue = "nameWithMultipleValuesResetOtherValue";

const initialValues = {
  [nameWithValue]: 90,
  [nameWithMultipleValues]: [90, 120],
  [nameWithMultipleValuesStacked]: [90, 30],
  [nameWithMultipleValuesResetOtherValue]: [90, 120],
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/SliderField",
  component: SliderField,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => <div className="m-4">{storyFn()}</div>,

    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialValues={initialValues} initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),
  ],
};

export const WithLabel = () => (
  <SliderField
    name={name}
    label={<Intl name="label" />}
    from={0}
    to={600}
    step={30}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
  />
);

export const WithHint = () => (
  <SliderField
    name={name}
    label={<Intl name="label" />}
    from={0}
    to={600}
    step={30}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
  />
);

export const WithHelp = () => (
  <SliderField
    name={name}
    label={<Intl name="label" />}
    help={<Intl name="help" />}
    from={0}
    to={600}
    step={30}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
  />
);

export const WithError = () => (
  <SliderField
    name={nameWithError}
    label={<Intl name="label" />}
    from={0}
    to={600}
    step={30}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
  />
);

export const WithValue = () => (
  <SliderField
    name={nameWithValue}
    from={0}
    to={600}
    step={30}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
  />
);

export const WithMultipleValues = () => {
  const [index] = React.useState(0);

  return (
    <SliderField
      name={nameWithMultipleValues}
      label={<Intl name="label" />}
      from={0}
      to={600}
      step={30}
      getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
      markerClassName={["border-green-500 bg-green-400", "border-red-500 bg-red-400"]}
      index={index}
    />
  );
};

export const WithMultipleValuesStacked = () => {
  const [index] = React.useState(0);

  return (
    <SliderField
      name={nameWithMultipleValuesStacked}
      label={<Intl name="label" />}
      from={0}
      to={600}
      step={30}
      getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
      stacked={true}
      markerClassName={["border-green-500 bg-green-400", "border-red-500 bg-red-400"]}
      index={index}
    />
  );
};

export const WithMultipleValuesResetOtherValue = () => {
  const [index] = React.useState(0);

  return (
    <SliderField
      name={nameWithMultipleValuesResetOtherValue}
      label={<Intl name="label" />}
      from={0}
      to={600}
      step={30}
      resetAllSubsequent={true}
      stacked={true}
      getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
      markerClassName={["border-green-500 bg-green-400", "border-red-500 bg-red-400"]}
      index={index}
    />
  );
};
