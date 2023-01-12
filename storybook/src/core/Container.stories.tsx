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

import { Container } from "@tiller-ds/core";

import mdx from "./Container.mdx";

export default {
  title: "Component Library/Core/Container",
  component: Container,
  parameters: {
    docs: {
      page: mdx,
    },
    decorators: [withDesign],
  },
};

const Placeholder = () => (
  <svg
    className={`border-2 border-dashed border-gray-300 rounded bg-white w-full h-48 text-gray-200`}
    preserveAspectRatio="none"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 200 200"
  >
    <path vectorEffect="non-scaling-stroke" strokeWidth="2" d="M0 0l200 200M0 200L200 0" />
  </svg>
);

export const Max = () => {
  return (
    <Container>
      <Placeholder />
    </Container>
  );
};

export const ConstrainedPadded = () => {
  return (
    <Container variant="constrainedPadded">
      <Placeholder />
    </Container>
  );
};

export const NarrowConstrained = () => {
  return (
    <Container variant="narrowConstrained">
      <Placeholder />
    </Container>
  );
};

export const FullWidth = () => {
  return (
    <Container variant="fullWidth">
      <Placeholder />
    </Container>
  );
};

export const FullWidthContainer = () => {
  return (
    <Container variant="fullWidthContainer">
      <Placeholder />
    </Container>
  );
};
