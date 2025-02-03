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

import { Date as TillerDate } from "@tiller-ds/date";

import mdx from "./Date.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Date/Date",
  component: TillerDate,
  parameters: {
    docs: {
      page: mdx,
      transformSource: (source) => {
        const correctedSource = source.replace(/<TillerDate/g, "<Date").replace(/<\/TillerDate>/g, "</Date>");
        return beautifySource(correctedSource, "Date");
      },
    },
    decorators: [withDesign],
  },
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Example = () => <TillerDate>2020-02-25</TillerDate>;
