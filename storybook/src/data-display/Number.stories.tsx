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

import { Number } from "@tiller-ds/data-display";

import mdx from "./Number.mdx";

export default {
  title: "Component Library/Data-display/Number",
  component: Number,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
    },
    decorators: [withDesign],
  },
};

export const WithChildren = () => <Number>12</Number>;
export const WithZero = () => <Number>0</Number>;
export const WithLessThanThousand = () => <Number>123</Number>;
export const WithLessThanMillion = () => <Number>34500</Number>;
export const WithMoreThanMillion = () => <Number>34500000</Number>;
export const WithMinOneFractionDigit = () => <Number minimumFractionDigits={1}>3</Number>;
export const WithMinTwoFractionDigits = () => <Number minimumFractionDigits={2}>3.1</Number>;
export const WithMinThreeFractionDigits = () => <Number minimumFractionDigits={3}>3.1</Number>;
export const WithMaxTwoFractionDigits = () => <Number maximumFractionDigits={2}>3.1234</Number>;
