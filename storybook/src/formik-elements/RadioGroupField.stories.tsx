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

import { RadioGroupField } from "@tiller-ds/formik-elements";
import { beautifySource, FormikDecorator } from "../utils";

import mdx from "./RadioGroupField.mdx";

const candidatesHelp = "Get notified when a candidate applies for a job.";
const candidatesLabel = "Candidates";
const candidatesValue = "candidates";
const commentsHelp = "Get notified when someones posts a comment on a posting.";
const commentsLabel = "Comments";
const commentsValue = "comments";
const help = "Email notification";
const nameWithError = "radioGroupWithError";
const label = "By Email";
const name = "emailNotifications";
const nameWithValue = "nameWithValue";
const offersHelp = "Get notified when a candidate accepts or rejects an offer.";
const offersLabel = "Offers";
const offersValue = "offers";

const initialValues = {
  [nameWithValue]: "comments",
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/RadioGroupField",
  component: RadioGroupField,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) =>
        beautifySource(source.replace(/RadioGroupFieldItem/g, "RadioGroupField.Item"), "RadioGroupField"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=10405%3A12877",
    },
    decorators: [withDesign],
  },
  // eslint-disable-next-line react/display-name
  decorators: [
    (storyFn: () => React.ReactNode) => (
      <FormikDecorator initialValues={initialValues} initialErrors={initialErrors} initialTouched={initialTouched}>
        {storyFn()}
      </FormikDecorator>
    ),
  ],
};

export const Simple = (args) => (
  <RadioGroupField name={name} label={label} className="flex space-x-4">
    <RadioGroupField.Item label={commentsLabel} value={commentsValue} />
    <RadioGroupField.Item label={candidatesLabel} value={candidatesValue} />
    <RadioGroupField.Item label={offersLabel} value={offersValue} />
  </RadioGroupField>
);

export const WithValue = () => {
  // incl-code
  // initial value passed as initialValues prop of Formik
  const initialValues = {
    nameWithValue: "comments",
  };

  return (
    <RadioGroupField name="nameWithValue" label="By Email">
      <RadioGroupField.Item
        label="Comments"
        value="comments"
        help="Get notified when someones posts a comment on a posting."
      />
      <RadioGroupField.Item
        label="Candidates"
        value="candidates"
        help="Get notified when a candidate applies for a job."
      />
      <RadioGroupField.Item
        label="Offers"
        value="offers"
        help="Get notified when a candidate accepts or rejects an offer."
      />
    </RadioGroupField>
  );
};

export const WithHelp = (args) => (
  <RadioGroupField name={name} label={label} help={help}>
    <RadioGroupField.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <RadioGroupField.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
    <RadioGroupField.Item label={offersLabel} value={offersValue} help={offersHelp} />
  </RadioGroupField>
);

export const WithError = (args) => (
  <RadioGroupField name={nameWithError} label={label} help={help}>
    <RadioGroupField.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <RadioGroupField.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
    <RadioGroupField.Item label={offersLabel} value={offersValue} help={offersHelp} />
  </RadioGroupField>
);

export const WithDisabledItems = (args) => (
  <RadioGroupField name={name} label={label} help={help}>
    <RadioGroupField.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <RadioGroupField.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} disabled={true} />
    <RadioGroupField.Item label={offersLabel} value={offersValue} help={offersHelp} disabled={true} />
  </RadioGroupField>
);

export const WithVerticalAlignment = (args) => (
  <RadioGroupField name={name} label={label} vertical={true}>
    <RadioGroupField.Item label={commentsLabel} value={commentsValue} />
    <RadioGroupField.Item label={candidatesLabel} value={candidatesValue} />
    <RadioGroupField.Item label={offersLabel} value={offersValue} />
  </RadioGroupField>
);

export const WithDifferentColor = (args) => (
  <RadioGroupField name={name} label={label}>
    <RadioGroupField.Item label={commentsLabel} value={commentsValue} color="secondary" />
    <RadioGroupField.Item label={candidatesLabel} value={candidatesValue} color="secondary" />
    <RadioGroupField.Item label={offersLabel} value={offersValue} color="secondary" />
  </RadioGroupField>
);
