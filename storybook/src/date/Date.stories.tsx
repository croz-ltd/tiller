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

import { Date } from "@tiller-ds/date";

import mdx from "./Date.mdx";

export default {
  title: "Component Library/Date/Date",
  component: Date,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
    },
    decorators: [withDesign],
  },
};

export const WithIntl = () => <Date>2020-02-25</Date>;

export const WithoutIntl = () => (
  <Date formatFrom="yyyy-MM-dd" formatTo="MM/dd/yyyy">
    2020-02-25
  </Date>
);
