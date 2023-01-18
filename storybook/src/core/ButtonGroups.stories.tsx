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

import { action } from "@storybook/addon-actions";
import { withDesign } from "storybook-addon-designs";

import { ButtonGroups } from "@tiller-ds/core";
import { InlineArrowIcon } from "@tiller-ds/icons";
import { extendedColors } from "../utils";

import mdx from "./ButtonGroups.mdx";

export default {
  title: "Component Library/Core/ButtonGroups",
  component: ButtonGroups,
  parameters: {
    docs: {
      page: mdx,
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
    tokens: { control: false },
  },
};

export const ButtonGroupsFactory = ({ children, color }) => {
  const textArray = children.split(", ");

  return (
    <ButtonGroups>
      {range(0, textArray.length).map((value) => (
        <ButtonGroups.Button onClick={action("ButtonGroups-click-years")} color={color} variant="filled">
          {textArray[value]}
        </ButtonGroups.Button>
      ))}
    </ButtonGroups>
  );
};

export const Basic = () => (
  <ButtonGroups>
    <ButtonGroups.Button onClick={action("ButtonGroups-click-years")}>Years</ButtonGroups.Button>
    <ButtonGroups.Button onClick={action("ButtonGroups-click-month")}>Month</ButtonGroups.Button>
    <ButtonGroups.Button onClick={action("ButtonGroups-click-days")}>Days</ButtonGroups.Button>
  </ButtonGroups>
);

export const IconOnly = () => (
  <ButtonGroups>
    <ButtonGroups.IconButton onClick={action("ButtonGroups-click-left")}>
      <InlineArrowIcon direction="west" />
    </ButtonGroups.IconButton>
    <ButtonGroups.IconButton onClick={action("ButtonGroups-click-right")}>
      <InlineArrowIcon direction="east" />
    </ButtonGroups.IconButton>
  </ButtonGroups>
);

export const WithIcon = () => (
  <ButtonGroups>
    <ButtonGroups.Button onClick={action("ButtonGroups-click-left")} leadingIcon={<InlineArrowIcon direction="west" />}>
      Previous
    </ButtonGroups.Button>
    <ButtonGroups.Button
      onClick={action("ButtonGroups-click-right")}
      trailingIcon={<InlineArrowIcon direction="east" />}
    >
      Next
    </ButtonGroups.Button>
  </ButtonGroups>
);

export const Custom = () => (
  <ButtonGroups>
    <ButtonGroups.Button onClick={action("ButtonGroups-click-years")} color="success" variant="filled">
      Years
    </ButtonGroups.Button>
    <ButtonGroups.Button onClick={action("ButtonGroups-click-month")} color="info" variant="filled">
      Month
    </ButtonGroups.Button>
    <ButtonGroups.Button onClick={action("ButtonGroups-click-days")} color="warning" variant="filled">
      Days
    </ButtonGroups.Button>
  </ButtonGroups>
);

ButtonGroupsFactory.args = {
  children: "Years, Month, Days",
  color: "primary",
};

ButtonGroupsFactory.parameters = {
  controls: {
    expanded: false,
  },
};

const HideControls = {
  children: { control: { disable: true } },
  tokens: { control: { disable: true } },
  color: { control: { disable: true } },
};

Basic.argTypes = HideControls;
IconOnly.argTypes = HideControls;
WithIcon.argTypes = HideControls;
Custom.argTypes = HideControls;
