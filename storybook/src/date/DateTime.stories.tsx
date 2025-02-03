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

import { DateTime } from "@tiller-ds/date";

import mdx from "./DateTime.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Date/DateTime",
  component: DateTime,
  parameters: {
    docs: {
      source: { type: "code" },
      page: mdx,
      transformSource: (source) => beautifySource(source, "DateTime"),
    },
    decorators: [withDesign],
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Example = () => <DateTime>{Date.parse("2020-08-17T14:41:54.365582Z")}</DateTime>;
