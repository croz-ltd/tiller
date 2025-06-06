/*
 *    Copyright 2025 CROZ d.o.o, the original author or authors.
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

import { RadioGroup } from "@tiller-ds/form-elements";

import mdx from "./RadioGroup.mdx";
import { beautifySource } from "../utils";

const name = "emailNotifications";
export default {
  title: "Component Library/Form-elements/RadioGroup",
  component: RadioGroup,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => {
        return beautifySource(source.replace(/RadioGroupItem/g, "RadioGroup.Item"), "RadioGroup");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=10405%3A12877",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => {
  // incl-code
  const [state, setState] = useState<string | boolean | null>(null);

  return (
    <RadioGroup name={name} label="By Email" onChange={setState} value={state}>
      <RadioGroup.Item label="Comments" value="comments" />
      <RadioGroup.Item label="Candidates" value="candidates" />
      <RadioGroup.Item label="Offers" value="offers" />
    </RadioGroup>
  );
};

export const WithValue = () => {
  // incl-code
  const [state, setState] = useState<string | boolean | null>("comments");

  return (
    <RadioGroup name={name} label="By Email" onChange={setState} value={state}>
      <RadioGroup.Item label="Comments" value="comments" />
      <RadioGroup.Item label="Candidates" value="candidates" />
      <RadioGroup.Item label="Offers" value="offers" />
    </RadioGroup>
  );
};

export const WithHelp = () => {
  // incl-code
  const [state, setState] = useState<string | boolean | null>("");

  return (
    <RadioGroup name={name} label="By Email" help="Email notification" onChange={setState} value={state}>
      <RadioGroup.Item label="Comments" value="comments" help="Get notified when someones posts a comment on a posting." />
      <RadioGroup.Item label="Candidates" value="candidates" help="Get notified when a candidate applies for a job." />
      <RadioGroup.Item label="Offers" value="offers" help="Get notified when a candidate accepts or rejects an offer." />
    </RadioGroup>
  );
};

export const WithError = () => {
  // incl-code
  const [state, setState] = useState<string | boolean | null>("");

  return (
    <RadioGroup name={name} label="By Email" help="Email notification" onChange={setState} value={state} error="Test error text">
      <RadioGroup.Item label="Comments" value="comments" help="Get notified when someones posts a comment on a posting." />
      <RadioGroup.Item label="Candidates" value="candidates" help="Get notified when a candidate applies for a job." />
      <RadioGroup.Item label="Offers" value="offers" help="Get notified when a candidate accepts or rejects an offer." />
    </RadioGroup>
  );
};

export const WithDisabledItems = () => {
  // incl-code
  const [state, setState] = useState<string | boolean | null>("");

  return (
    <RadioGroup name={name} label="By Email" help="Email notification" onChange={setState} value={state}>
      <RadioGroup.Item label="Comments" value="comments" help="Get notified when someones posts a comment on a posting." />
      <RadioGroup.Item
        label="Candidates"
        value="candidates"
        help="Get notified when a candidate applies for a job."
        disabled={true}
      />
      <RadioGroup.Item
        label="Offers"
        value="offers"
        help="Get notified when a candidate accepts or rejects an offer."
        disabled={true}
      />
    </RadioGroup>
  );
};

export const WithVerticalAlignment = () => {
  // incl-code
  const [state, setState] = useState<string | boolean | null>("");

  return (
    <RadioGroup name={name} label="By Email" help="Email notification" onChange={setState} value={state} vertical={true}>
      <RadioGroup.Item label="Comments" value="comments" />
      <RadioGroup.Item label="Candidates" value="candidates" />
      <RadioGroup.Item label="Offers" value="offers" />
    </RadioGroup>
  );
};
