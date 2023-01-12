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

import { Slider } from "@tiller-ds/form-elements";

import mdx from "./Slider.mdx";

export default {
  title: "Component Library/Form-elements/Slider",
  component: Slider,
  decorators: [
    // eslint-disable-next-line react/display-name
    (storyFn: () => React.ReactNode) => <div className="m-4">{storyFn()}</div>,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Simple = () => (
  <Slider
    name="slider"
    from={0}
    to={600}
    step={30}
    value={90}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
  />
);

export const WithHelp = () => (
  <Slider
    name="slider"
    from={0}
    to={600}
    step={30}
    value={90}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
    help="Default: Help!"
  />
);

export const MarkerColor = () => (
  <Slider
    name="slider"
    from={0}
    to={600}
    step={30}
    value={90}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
    markerClassName="border-red-500 bg-red-400"
  />
);

export const MultipleValues = () => (
  <Slider
    name="slider"
    from={0}
    to={600}
    step={30}
    value={[240, 270]}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
    markerClassName={["border-red-500 bg-red-400", "border-green-500 bg-green-400"]}
  />
);

export const MultipleValuesStacked = () => (
  <Slider
    name="slider"
    from={0}
    to={600}
    step={30}
    value={[240, 30]}
    stacked={true}
    getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
    markerClassName={["border-red-500 bg-red-400", "border-green-500 bg-green-400"]}
  />
);
