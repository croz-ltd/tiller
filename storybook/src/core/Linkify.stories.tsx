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

import { Linkify } from "@tiller-ds/core";

import mdx from "./Linkify.mdx";

export default {
  title: "Component Library/Core/Linkify",
  component: Linkify,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic" },
    },
    decorators: [withDesign],
  },
};

const example = (
  <div>
    <div>example text</div>
    <div>https://gitlab.croz.net/</div>
    <div>example text</div>
  </div>
);

const secondaryExample = (
  <div>
    <div>secondary example text</div>
    <div>https://gitlab.croz.net/</div>
    <div>secondary example text</div>
  </div>
);

const exampleWithoutProtocol = (
  <div>
    <div>example without protocol</div>
    <div>gitlab.croz.net/</div>
    <div>example without protocol</div>
  </div>
);

const exampleEmail = (
  <div>
    <div>email example</div>
    <div>example.mail@coz.net</div>
    <div>email example</div>
  </div>
);

const withNewLineBreak = (
  <div>
    <div>with line break example</div>
    <div>{"first line\nhttps://gitlab.croz.net/\nThird line"}</div>
    <div>with line break example</div>
  </div>
);

export const Example = () => (
  <>
    <Linkify>{example}</Linkify>
    <br />
    <Linkify variant="secondary">{secondaryExample}</Linkify>
    <br />
    <Linkify>{exampleWithoutProtocol}</Linkify>
    <br />
    <Linkify>{exampleEmail}</Linkify>
    <br />
    <Linkify>{withNewLineBreak}</Linkify>
  </>
);
