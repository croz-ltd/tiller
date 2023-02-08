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

import { RadioGroup } from "@tiller-ds/form-elements";

import mdx from "./RadioGroup.mdx";

const candidatesHelp = "Get notified when a candidate applies for a job.";
const candidatesLabel = "Candidates";
const candidatesValue = "candidates";
const commentsHelp = "Get notified when someones posts a comment on a posting.";
const commentsLabel = "Comments";
const commentsValue = "comments";
const help = "Email notification";
const error = "Test error text";
const label = "By Email";
const name = "emailNotifications";
const offersHelp = "Get notified when a candidate accepts or rejects an offer.";
const offersLabel = "Offers";
const offersValue = "offers";
const value = "comments";

export default {
  title: "Component Library/Form-elements/RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        return source
          .replace(/RadioGroupItem/g, "RadioGroup.Item")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=10405%3A12877",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => (
  <RadioGroup name={name} label={label} onChange={() => {}} value={""}>
    <RadioGroup.Item label={commentsLabel} value={commentsValue} />
    <RadioGroup.Item label={candidatesLabel} value={candidatesValue} />
    <RadioGroup.Item label={offersLabel} value={offersValue} />
  </RadioGroup>
);

export const WithValue = () => (
  <RadioGroup name={name} label={label} onChange={() => {}} value={value}>
    <RadioGroup.Item label={commentsLabel} value={commentsValue} />
    <RadioGroup.Item label={candidatesLabel} value={candidatesValue} />
    <RadioGroup.Item label={offersLabel} value={offersValue} />
  </RadioGroup>
);

export const WithHelp = () => (
  <RadioGroup name={name} label={label} help={help} onChange={() => {}} value={""}>
    <RadioGroup.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <RadioGroup.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
    <RadioGroup.Item label={offersLabel} value={offersValue} help={offersHelp} />
  </RadioGroup>
);

export const WithError = () => (
  <RadioGroup name={name} label={label} help={help} onChange={() => {}} value={""} error={error}>
    <RadioGroup.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <RadioGroup.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} />
    <RadioGroup.Item label={offersLabel} value={offersValue} help={offersHelp} />
  </RadioGroup>
);

export const WithDisabledItems = () => (
  <RadioGroup name={name} label={label} help={help} onChange={() => {}} value={""}>
    <RadioGroup.Item label={commentsLabel} value={commentsValue} help={commentsHelp} />
    <RadioGroup.Item label={candidatesLabel} value={candidatesValue} help={candidatesHelp} disabled={true} />
    <RadioGroup.Item label={offersLabel} value={offersValue} help={offersHelp} disabled={true} />
  </RadioGroup>
);

export const WithVerticalAlignment = () => (
  <RadioGroup name={name} label={label} help={help} onChange={() => {}} value={""} vertical={true}>
    <RadioGroup.Item label={commentsLabel} value={commentsValue} />
    <RadioGroup.Item label={candidatesLabel} value={candidatesValue} />
    <RadioGroup.Item label={offersLabel} value={offersValue} />
  </RadioGroup>
);
