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
import { useState } from "react";

import { withDesign } from "storybook-addon-designs";

import { CheckboxGroup } from "@tiller-ds/form-elements";

import mdx from "./CheckboxGroup.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Form-elements/CheckboxGroup",
  component: CheckboxGroup,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source.replace(/CheckboxGroupItem/g, "CheckboxGroup.Item");
        return beautifySource(correctedSource, "CheckboxGroup");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=10405%3A12253",
    },
    decorators: [withDesign],
  },
};

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

export const Simple = () => {
  // incl-code
  const [value, setValue] = useState<Record<string, boolean>>(valuesNone);

  return (
    <CheckboxGroup
      name="emailNotifications"
      label="By Email"
      value={value}
      onChange={setValue}
      className="flex space-x-4"
    >
      <CheckboxGroup.Item label="Comments" value="comments" />
      <CheckboxGroup.Item label="Candidates" value="candidates" />
      <CheckboxGroup.Item label="Offers" value="offers" />
    </CheckboxGroup>
  );
};

export const WithValue = () => {
  // incl-code
  const [value, setValue] = useState<Record<string, boolean>>(values);

  return (
    <CheckboxGroup
      name="emailNotifications"
      label="By Email"
      value={value}
      onChange={setValue}
      className="flex space-x-4"
    >
      <CheckboxGroup.Item label="Comments" value="comments" />
      <CheckboxGroup.Item label="Candidates" value="candidates" />
      <CheckboxGroup.Item label="Offers" value="offers" />
    </CheckboxGroup>
  );
};

export const WithHelp = () => {
  // incl-code
  const [value, setValue] = useState<Record<string, boolean>>(valuesNone);

  return (
    <CheckboxGroup
      name="emailNotifications"
      label="By Email"
      value={value}
      help="Email notifications"
      onChange={setValue}
      className="flex space-x-4"
    >
      <CheckboxGroup.Item
        label="Comments"
        value="comments"
        help="Get notified when someones posts a comment on a posting."
      />
      <CheckboxGroup.Item
        label="Candidates"
        value="candidates"
        help="Get notified when someones posts a comment on a posting."
      />
      <CheckboxGroup.Item
        label="Offers"
        value="offers"
        help="Get notified when a candidate accepts or rejects an offer"
      />
    </CheckboxGroup>
  );
};

export const WithError = () => {
  // incl-code
  const [value, setValue] = useState<Record<string, boolean>>(valuesNone);

  return (
    <CheckboxGroup
      name="emailNotifications"
      label="By Email"
      value={value}
      help="Email notifications"
      error="Test error text"
      onChange={setValue}
      className="flex space-x-4"
    >
      <CheckboxGroup.Item
        label="Comments"
        value="comments"
        help="Get notified when someones posts a comment on a posting."
      />
      <CheckboxGroup.Item
        label="Candidates"
        value="candidates"
        help="Get notified when someones posts a comment on a posting."
      />
      <CheckboxGroup.Item
        label="Offers"
        value="offers"
        help="Get notified when a candidate accepts or rejects an offer"
      />
    </CheckboxGroup>
  );
};

export const WithDisabledItems = () => {
  // incl-code
  const [value, setValue] = useState<Record<string, boolean>>(valuesNone);

  return (
    <CheckboxGroup
      name="emailNotifications"
      label="By Email"
      value={value}
      help="Email notifications"
      onChange={setValue}
      className="flex space-x-4"
    >
      <CheckboxGroup.Item
        label="Comments"
        value="comments"
        help="Get notified when someones posts a comment on a posting."
      />
      <CheckboxGroup.Item
        label="Candidates"
        value="candidates"
        help="Get notified when someones posts a comment on a posting."
        disabled={true}
      />
      <CheckboxGroup.Item
        label="Offers"
        value="offers"
        help="Get notified when a candidate accepts or rejects an offer"
        disabled={true}
      />
    </CheckboxGroup>
  );
};

export const WithVerticalAlignment = () => {
  // incl-code
  const [value, setValue] = useState<Record<string, boolean>>(valuesNone);

  return (
    <CheckboxGroup
      name="emailNotifications"
      label="By Email"
      value={value}
      help="Email notifications"
      onChange={setValue}
      vertical={true}
    >
      <CheckboxGroup.Item
        label="Comments"
        value="comments"
        help="Get notified when someones posts a comment on a posting."
      />
      <CheckboxGroup.Item
        label="Candidates"
        value="candidates"
        help="Get notified when someones posts a comment on a posting."
      />
      <CheckboxGroup.Item
        label="Offers"
        value="offers"
        help="Get notified when a candidate accepts or rejects an offer"
      />
    </CheckboxGroup>
  );
};
