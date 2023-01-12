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
import { DeepPartial } from "tsdef";

import { withDesign } from "storybook-addon-designs";

import { DescriptionList } from "@tiller-ds/data-display";
import { defaultThemeConfig, Theme } from "@tiller-ds/theme";

import mdx from "./DescriptionList.mdx";

export default {
  title: "Component Library/Data-display/DescriptionList",
  component: DescriptionList,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9750%3A14987",
    },
    decorators: [withDesign],
  },
  argTypes: {
    type: { name: "Type", control: "radio" },
    sameColumn: { name: "Same Column", control: "boolean" },
    rowQuantity: { name: "Number of Rows", control: { type: "number", min: 2 } },
    tokens: { control: "object" },
    showTokens: { name: "Show Tokens?", control: "boolean" },
    children: { control: false },
  },
};

export const DescriptionListFactory = ({ type, sameColumn, rowQuantity, tokens, showTokens }) => {
  const customDescriptionListTokens: DeepPartial<Theme["component"]["DescriptionList"]> = tokens;

  return (
    <DescriptionList type={type} tokens={showTokens && customDescriptionListTokens}>
      {range(0, rowQuantity).map((value, index) => {
        switch (index) {
          case 0:
          case 5:
            return (
              <DescriptionList.Item label="Full name" type={sameColumn ? "same-column" : undefined}>
                Margot Foster
              </DescriptionList.Item>
            );
          case 1:
          case 6:
            return (
              <DescriptionList.Item label="Application for" type={sameColumn ? "same-column" : undefined}>
                Backend Developer
              </DescriptionList.Item>
            );
          case 2:
          case 7:
            return (
              <DescriptionList.Item label="Email address" type={sameColumn ? "same-column" : undefined}>
                margotfoster@example
              </DescriptionList.Item>
            );
          case 3:
          case 8:
            return (
              <DescriptionList.Item label="Salary expectation" type={sameColumn ? "same-column" : undefined}>
                $120,000
              </DescriptionList.Item>
            );
          case 4:
          case 9:
            return (
              <DescriptionList.Item label="About" type={sameColumn ? "same-column" : undefined}>
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
              </DescriptionList.Item>
            );
          default:
            return (
              <DescriptionList.Item label="Full name" type={sameColumn ? "same-column" : undefined}>
                Margot Foster
              </DescriptionList.Item>
            );
        }
      })}
    </DescriptionList>
  );
};

DescriptionListFactory.args = {
  type: "default",
  sameColumn: false,
  rowQuantity: 5,
  showTokens: false,
  tokens: defaultThemeConfig.component["DescriptionList"],
};

export const Default = () => (
  <DescriptionList>
    <DescriptionList.Item label="Full name">Margot Foster</DescriptionList.Item>
    <DescriptionList.Item label="Application for">Backend Developer</DescriptionList.Item>
    <DescriptionList.Item label="Email address">margotfoster@example</DescriptionList.Item>
    <DescriptionList.Item label="Salary expectation">$120,000</DescriptionList.Item>
    <DescriptionList.Item label="About">
      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum
      aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit
      ad adipisicing reprehenderit deserunt qui eu.
    </DescriptionList.Item>
    <DescriptionList.Item label="Crimes">Triple homicide in Reno, Nevada.</DescriptionList.Item>
    <DescriptionList.Item label="Guns used">.357 Magnum, Tactical knife, flashbang</DescriptionList.Item>
  </DescriptionList>
);

export const SameColumn = () => (
  <DescriptionList>
    <DescriptionList.Item label="Full name" type="same-column">
      Margot Foster
    </DescriptionList.Item>
    <DescriptionList.Item label="Application for" type="same-column">
      Backend Developer
    </DescriptionList.Item>
    <DescriptionList.Item label="Email address" type="same-column">
      margotfoster@example
    </DescriptionList.Item>
    <DescriptionList.Item label="Salary expectation" type="same-column">
      $120,000
    </DescriptionList.Item>
    {null}
    {false}
    {undefined}
    <DescriptionList.Item label="About" type="same-column">
      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum
      aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit
      ad adipisicing reprehenderit deserunt qui eu.
    </DescriptionList.Item>
    <DescriptionList.Item label="Crimes" type="same-column">
      Triple homicide in Reno, Nevada.
    </DescriptionList.Item>
    <DescriptionList.Item label="Guns used" type="same-column">
      .357 Magnum, Tactical knife, flashbang
    </DescriptionList.Item>
  </DescriptionList>
);

export const Striped = () => (
  <DescriptionList type="striped">
    <DescriptionList.Item label="Full name">Margot Foster</DescriptionList.Item>
    <DescriptionList.Item label="Application for">Backend Developer</DescriptionList.Item>
    <DescriptionList.Item label="Email address">margotfoster@example</DescriptionList.Item>
    <DescriptionList.Item label="Salary expectation">$120,000</DescriptionList.Item>
    <DescriptionList.Item label="About">
      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum
      aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit
      ad adipisicing reprehenderit deserunt qui eu.
    </DescriptionList.Item>
    <DescriptionList.Item label="Crimes">Triple homicide in Reno, Nevada.</DescriptionList.Item>
    <DescriptionList.Item label="Guns used">.357 Magnum, Tactical knife, flashbang</DescriptionList.Item>
  </DescriptionList>
);

export const Clean = () => (
  <DescriptionList type="clean">
    <DescriptionList.Item label="Full name">Margot Foster</DescriptionList.Item>
    <DescriptionList.Item label="Application for">Backend Developer</DescriptionList.Item>
    <DescriptionList.Item label="Email address">margotfoster@example</DescriptionList.Item>
    <DescriptionList.Item label="Salary expectation">$120,000</DescriptionList.Item>
    <DescriptionList.Item label="About">
      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum
      aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit
      ad adipisicing reprehenderit deserunt qui eu.
    </DescriptionList.Item>
    <DescriptionList.Item label="Crimes">Triple homicide in Reno, Nevada.</DescriptionList.Item>
    <DescriptionList.Item label="Guns used">.357 Magnum, Tactical knife, flashbang</DescriptionList.Item>
  </DescriptionList>
);

DescriptionListFactory.parameters = {
  controls: {
    expanded: false,
  },
};

const HideControls = {
  type: { control: { disable: true } },
  sameColumn: { control: { disable: true } },
  rowQuantity: { control: { disable: true } },
  tokens: { control: { disable: true } },
  showTokens: { control: { disable: true } },
};

Default.argTypes = HideControls;
SameColumn.argTypes = HideControls;
Striped.argTypes = HideControls;
Clean.argTypes = HideControls;
