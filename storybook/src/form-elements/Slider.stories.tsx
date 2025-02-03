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

import { Slider } from "@tiller-ds/form-elements";

import mdx from "./Slider.mdx";
import { useState } from "react";
import { beautifySource } from "../utils";

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
      source: { type: "auto", excludeDecorators: true },
      transformSource: beautifySource,
    },
  },
};

export const Simple = () => {
  // incl-code
  const [value, setValue] = useState<number | undefined>(90);

  return (
    <Slider
      name="slider"
      from={0}
      to={600}
      step={30}
      value={value}
      getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
      onChange={setValue}
    />
  );
};

export const WithHelp = () => {
  // incl-code
  const [value, setValue] = useState<number | undefined>(90);

  return (
    <Slider
      name="slider"
      from={0}
      to={600}
      step={30}
      value={value}
      getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
      onChange={setValue}
      help="Default: Help!"
    />
  );
};

export const MarkerColor = () => {
  // incl-code
  const [value, setValue] = useState<number | undefined>(90);

  return (
    <Slider
      name="slider"
      from={0}
      to={600}
      step={30}
      value={value}
      getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
      onChange={setValue}
      markerClassName="border-red-500 bg-red-400"
    />
  );
};

export const MultipleValues = () => {
  // incl-code
  const [value, setValue] = useState<number | number[] | undefined>([240, 270]);

  return (
    <Slider
      name="slider"
      from={0}
      to={600}
      step={30}
      value={value}
      getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
      onChange={setValue}
      markerClassName={["border-red-500 bg-red-400", "border-green-500 bg-green-400"]}
    />
  );
};

export const MultipleValuesStacked = () => {
  // incl-code
  const [value, setValue] = useState<number | number[] | undefined>([240, 30]);

  return (
    <Slider
      name="slider"
      from={0}
      to={600}
      step={30}
      value={value}
      getOptionLabel={(value) => (value % 60 === 0 ? value / 60 : null)}
      onChange={setValue}
      markerClassName={["border-red-500 bg-red-400", "border-green-500 bg-green-400"]}
      stacked={true}
    />
  );
};
