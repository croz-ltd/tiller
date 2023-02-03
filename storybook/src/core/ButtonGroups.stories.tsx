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

import { range } from "lodash";

import { withDesign } from "storybook-addon-designs";

import { ButtonGroups } from "@tiller-ds/core";
import { InlineArrowIcon } from "@tiller-ds/icons";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { extendedColors, getTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./ButtonGroups.mdx";

export default {
  title: "Component Library/Core/ButtonGroups",
  component: ButtonGroups,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source
          .replace(/<ButtonGroupsButton/g, "<ButtonGroups.Button")
          .replace(/<\/ButtonGroupsButton>/g, "</ButtonGroups.Button>")
          .replace(/<ButtonGroupsIconButton/g, "<ButtonGroups.IconButton")
          .replace(/<\/ButtonGroupsIconButton>/g, "</ButtonGroups.IconButton>")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getTokensFromSource(correctedSource, "ButtonGroups");
      },
    },
    decorators: [withDesign],
  },
  argTypes: {
    children: { name: "Buttons Content (separated by comma)", control: "text" },
    color: {
      name: "Color",
      control: {
        type: "select",
        options: extendedColors,
      },
    },
    className: { name: "Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
  },
};

export const ButtonGroupsFactory = ({ children, color, className, useTokens, tokens }) => {
  const textArray = children.split(", ");

  return (
    <ButtonGroups className={className} tokens={useTokens && tokens}>
      {range(0, textArray.length).map((value) => (
        <ButtonGroups.Button onClick={() => {}} color={color} variant="filled">
          {textArray[value]}
        </ButtonGroups.Button>
      ))}
    </ButtonGroups>
  );
};

ButtonGroupsFactory.args = {
  children: "Years, Month, Days",
  color: "primary",
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["ButtonGroups"],
};

ButtonGroupsFactory.parameters = {
  controls: {
    expanded: false,
  },
};

ButtonGroupsFactory.decorators = showFactoryDecorator();

export const Basic = () => (
  <ButtonGroups>
    <ButtonGroups.Button onClick={() => {}}>Years</ButtonGroups.Button>
    <ButtonGroups.Button onClick={() => {}}>Month</ButtonGroups.Button>
    <ButtonGroups.Button onClick={() => {}}>Days</ButtonGroups.Button>
  </ButtonGroups>
);

export const IconOnly = () => (
  <ButtonGroups>
    <ButtonGroups.IconButton onClick={() => {}}>
      <InlineArrowIcon direction="west" />
    </ButtonGroups.IconButton>
    <ButtonGroups.IconButton onClick={() => {}}>
      <InlineArrowIcon direction="east" />
    </ButtonGroups.IconButton>
  </ButtonGroups>
);

export const WithIcon = () => (
  <ButtonGroups>
    <ButtonGroups.Button onClick={() => {}} leadingIcon={<InlineArrowIcon direction="west" />}>
      Previous
    </ButtonGroups.Button>
    <ButtonGroups.Button onClick={() => {}} trailingIcon={<InlineArrowIcon direction="east" />}>
      Next
    </ButtonGroups.Button>
  </ButtonGroups>
);

export const Custom = () => (
  <ButtonGroups>
    <ButtonGroups.Button onClick={() => {}} color="success" variant="filled">
      Years
    </ButtonGroups.Button>
    <ButtonGroups.Button onClick={() => {}} color="info" variant="filled">
      Month
    </ButtonGroups.Button>
    <ButtonGroups.Button onClick={() => {}} color="warning" variant="filled">
      Days
    </ButtonGroups.Button>
  </ButtonGroups>
);

const HideControls = {
  children: { control: { disable: true } },
  tokens: { control: { disable: true } },
  color: { control: { disable: true } },
  className: { control: { disable: true } },
  useTokens: { control: { disable: true } },
};

Basic.argTypes = HideControls;
IconOnly.argTypes = HideControls;
WithIcon.argTypes = HideControls;
Custom.argTypes = HideControls;
