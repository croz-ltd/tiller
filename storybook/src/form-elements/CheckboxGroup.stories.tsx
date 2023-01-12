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

import { CheckboxGroup } from "@tiller-ds/form-elements";

import mdx from "./CheckboxGroup.mdx";

export default {
  title: "Component Library/Form-elements/CheckboxGroup",
  component: CheckboxGroup,
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
};

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
const error = "Test error text";

const onChange = action("checkboxGroup-onChange");

const valuesNone = {
  comments: false,
  candidates: false,
  offers: false,
};

const values = {
  comments: false,
  candidates: true,
  offers: true,
};

export const Simple = () => (
  <CheckboxGroup name={emailName} label={emailLabel} value={valuesNone} onChange={onChange} className="flex space-x-4">
    <CheckboxGroup.Item label={commentsLabel} value={commentsValue} />
    <CheckboxGroup.Item label={candidatesLabel} value={candidatesValue} />
    <CheckboxGroup.Item label={offersLabel} value={offersValue} />
  </CheckboxGroup>
);

export const WithValue = () => (
  <CheckboxGroup name={emailName} label={emailLabel} value={values} onChange={onChange}>
    <CheckboxGroup.Item label={commentsLabel} value={commentsValue} />
    <CheckboxGroup.Item label={candidatesLabel} value={candidatesValue} />
    <CheckboxGroup.Item label={offersLabel} value={offersValue} />
  </CheckboxGroup>
);

export const WithHelp = () => (
  <CheckboxGroup name={emailName} label={emailLabel} help={emailHelp} value={valuesNone} onChange={onChange}>
    <CheckboxGroup.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <CheckboxGroup.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
    <CheckboxGroup.Item label={offersLabel} value={offersValue} help={offersHelp} />
  </CheckboxGroup>
);

export const WithError = () => (
  <CheckboxGroup
    name={emailName}
    label={emailLabel}
    help={emailHelp}
    value={valuesNone}
    error={error}
    onChange={onChange}
  >
    <CheckboxGroup.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <CheckboxGroup.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
    <CheckboxGroup.Item label={offersLabel} value={offersValue} help={offersHelp} />
  </CheckboxGroup>
);

export const WithDisabledItems = () => (
  <CheckboxGroup name={emailName} label={emailLabel} help={emailHelp} value={valuesNone} onChange={onChange}>
    <CheckboxGroup.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <CheckboxGroup.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} disabled={true} />
    <CheckboxGroup.Item label={offersLabel} value={offersValue} help={offersHelp} disabled={true} />
  </CheckboxGroup>
);

export const WithVerticalAlignment = () => (
  <CheckboxGroup name={emailName} label={emailLabel} value={valuesNone} onChange={onChange} vertical={true}>
    <CheckboxGroup.Item label={commentsLabel} value={commentsValue} />
    <CheckboxGroup.Item label={candidatesLabel} value={candidatesValue} />
    <CheckboxGroup.Item label={offersLabel} value={offersValue} />
  </CheckboxGroup>
);
