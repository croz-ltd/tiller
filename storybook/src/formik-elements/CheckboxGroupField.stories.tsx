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

import { CheckboxGroupField } from "@tiller-ds/formik-elements";

import { FormikDecorator } from "../utils";
import mdx from "./CheckboxGroupField.mdx";

const candidatesHelp = "Get notified when someones posts a comment on a posting.";
const candidatesLabel = "Candidates";
const candidatesValue = "candidates";
const commentsHelp = "Get notified when someones posts a comment on a posting.";
const commentsLabel = "Comments";
const commentsValue = "comments";
const emailHelp = "Email notifications";
const emailLabel = "By Email";
const emailName = "emailNotifications";
const offersHelp = "Get notified when a candidate accepts or rejects an offer";
const offersLabel = "Offers";
const offersValue = "offers";
const nameWithValues = "nameWithValues";
const nameWithError = "checkboxGroupWithError";

const initialValues = {
  [nameWithValues]: { comments: false, candidates: true, offers: true },
};

const initialErrors = {
  [nameWithError]: "Test error",
};

const initialTouched = {
  [nameWithError]: true,
};

export default {
  title: "Component Library/Formik-elements/CheckboxGroupField",
  component: CheckboxGroupField,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=10405%3A12253",
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

export const Simple = () => (
  <CheckboxGroupField name={emailName} label={emailLabel}>
    <CheckboxGroupField.Item label={commentsLabel} value={commentsValue} />
    <CheckboxGroupField.Item label={candidatesLabel} value={candidatesValue} />
    <CheckboxGroupField.Item label={offersLabel} value={offersValue} />
  </CheckboxGroupField>
);

export const WithValues = () => {
  /**
   * This is how CheckboxGroupField.Item values look like.
   */
  const candidatesValue = "candidates";
  const commentsValue = "comments";
  const offersValue = "offers";
  /**
   * This is how you should pass the initial values to Formik wrapper.
   */
  const initialValues = { nameWithValues: { comments: false, candidates: true, offers: true } };

  return (
    <CheckboxGroupField name={nameWithValues} label={emailLabel}>
      <CheckboxGroupField.Item label={commentsLabel} value={commentsValue} />
      <CheckboxGroupField.Item label={candidatesLabel} value={candidatesValue} />
      <CheckboxGroupField.Item label={offersLabel} value={offersValue} />
    </CheckboxGroupField>
  );
};

export const WithHelp = () => (
  <CheckboxGroupField name={emailName} label={emailLabel} help={emailHelp}>
    <CheckboxGroupField.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <CheckboxGroupField.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
    <CheckboxGroupField.Item label={offersLabel} value={offersValue} help={offersHelp} />
  </CheckboxGroupField>
);

export const WithError = () => (
  <CheckboxGroupField name={nameWithError} label={emailLabel} help={emailHelp}>
    <CheckboxGroupField.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <CheckboxGroupField.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
    <CheckboxGroupField.Item label={offersLabel} value={offersValue} help={offersHelp} />
  </CheckboxGroupField>
);

export const WithDisabledItems = () => (
  <CheckboxGroupField name={emailName} label={emailLabel} help={emailHelp}>
    <CheckboxGroupField.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <CheckboxGroupField.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} disabled={true} />
    <CheckboxGroupField.Item label={offersLabel} value={offersValue} help={offersHelp} disabled={true} />
  </CheckboxGroupField>
);

export const WithVerticalAlignment = () => (
  <CheckboxGroupField name={emailName} label={emailLabel} vertical={true}>
    <CheckboxGroupField.Item label={commentsLabel} value={commentsValue} />
    <CheckboxGroupField.Item label={candidatesLabel} value={candidatesValue} />
    <CheckboxGroupField.Item label={offersLabel} value={offersValue} />
  </CheckboxGroupField>
);

export const WithDifferentColor = () => (
  <CheckboxGroupField name={emailName} label={emailLabel}>
    <CheckboxGroupField.Item label={commentsLabel} value={commentsValue} color="info" />
    <CheckboxGroupField.Item label={candidatesLabel} value={candidatesValue} color="info" />
    <CheckboxGroupField.Item label={offersLabel} value={offersValue} color="info" />
  </CheckboxGroupField>
);
