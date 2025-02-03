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

import { Card, ProgressBar } from "@tiller-ds/core";

import mdx from "./ProgressBar.mdx";

export default {
  title: "Component Library/Core/Progress Bar",
  component: ProgressBar,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        return source.replace(/Step/g, "ProgressBar.Step");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8998%3A11715",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => {
  return (
    <Card>
      <ProgressBar>
        <ProgressBar.Step active={true}>
          <span>Preparing</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Proposed</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Created</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Reviewed</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Approved</span>
        </ProgressBar.Step>
      </ProgressBar>
    </Card>
  );
};

export const Checked = () => {
  return (
    <Card>
      <ProgressBar>
        <ProgressBar.Step>
          <span>Preparing</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Proposed</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Created</span>
        </ProgressBar.Step>
        <ProgressBar.Step active={true}>
          <span>Reviewed</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Approved</span>
        </ProgressBar.Step>
      </ProgressBar>
    </Card>
  );
};

export const Completed = () => {
  return (
    <Card>
      <ProgressBar completed={true}>
        <ProgressBar.Step>
          <span>Preparing</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Proposed</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Created</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Reviewed</span>
        </ProgressBar.Step>
        <ProgressBar.Step>
          <span>Approved</span>
        </ProgressBar.Step>
      </ProgressBar>
    </Card>
  );
};

export const Inactive = () => {
  return (
    <Card>
      <ProgressBar>
        <ProgressBar.Step>Preparing</ProgressBar.Step>
        <ProgressBar.Step>Proposed</ProgressBar.Step>
        <ProgressBar.Step>Created</ProgressBar.Step>
        <ProgressBar.Step>Reviewed</ProgressBar.Step>
        <ProgressBar.Step>Approved</ProgressBar.Step>
      </ProgressBar>
    </Card>
  );
};
