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

import { withDesign } from "storybook-addon-designs";

import { Tooltip } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";

import mdx from "./Tooltip.mdx";

export default {
  title: "Component Library/Core/Tooltip",
  component: Tooltip,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic" },
    },
    decorators: [withDesign],
  },
};

const labelItem1 = "This is a tooltip";
const labelItem2 = "First line\nSecond line";
const customLabelItem = <Icon type="graduation-cap" variant="fill" />;

export const OneLineTooltip = () => (
  <Tooltip label={labelItem1}>
    <p>Hover on me</p>
  </Tooltip>
);

export const MultiLineTooltip = () => (
  <Tooltip label={labelItem2}>
    <p>Hover on me</p>
  </Tooltip>
);

export const LightTooltip = () => (
  <Tooltip label={labelItem1} color="light">
    <p>Hover on me</p>
  </Tooltip>
);

export const CustomTooltip = () => (
  <Tooltip label={customLabelItem}>
    <p>Hover on me</p>
  </Tooltip>
);
