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

import mdx from "./RichTextEditor.mdx";

import { RichTextEditor } from "@tiller-ds/form-elements-advanced";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Form-elements-advanced/RichTextEditor",
  component: RichTextEditor,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "RichTextEditor"),
    },
    decorators: [withDesign],
  },
};

export const Default = () => {
  // incl-code
  const initialHtml =
    "<h3>Lorem ipsum dolor sit amet, </h3><p>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>";

  return <RichTextEditor initialHtml={initialHtml} onHtmlChange={(html) => console.log(html)} />;
};
