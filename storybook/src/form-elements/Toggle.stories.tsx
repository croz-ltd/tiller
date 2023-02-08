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

import { Toggle } from "@tiller-ds/form-elements";

import mdx from "./Toggle.mdx";

export default {
  title: "Component Library/Form-elements/Toggle",
  component: Toggle,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        return source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=11686%3A14923",
    },
    decorators: [withDesign],
  },
};

const checked = true;

const error = "Test error";

export const WithLabel = () => (
  <Toggle
    checked={checked}
    onClick={() => {}}
    label={<span className="text-sm leading-5 font-medium text-gray-900">Annual billing</span>}
  />
);

export const WithLabelReversed = () => (
  <Toggle
    checked={checked}
    onClick={() => {}}
    label={<span className="text-sm leading-5 font-medium text-gray-900">Annual billing</span>}
    reverse={true}
  />
);

export const WithoutLabel = () => <Toggle checked={checked} onClick={() => {}} />;

export const WithError = () => <Toggle checked={checked} onClick={() => {}} error={error} />;

export const WithCheckedIcon = () => <Toggle checked={checked} onClick={() => {}} />;

export const WithUncheckedIcon = () => <Toggle checked={!checked} onClick={() => {}} />;

export const WithCheckedAndUncheckedIcons = () => {
  const [checked, setChecked] = React.useState(false);

  const onClick = () => {
    setChecked(!checked);
  };

  return <Toggle checked={checked} onClick={onClick} />;
};

export const Disabled = () => <Toggle checked={!checked} disabled={true} />;
