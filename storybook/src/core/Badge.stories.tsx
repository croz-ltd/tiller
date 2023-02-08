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

import { Badge } from "@tiller-ds/core";
import { Intl } from "@tiller-ds/intl";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { extendedColors, getTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./Badge.mdx";

export default {
  title: "Component Library/Core/Badge",
  component: Badge,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic" },
      transformSource: (source) => {
        const correctedSource = source.replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getTokensFromSource(correctedSource, "Badge");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8597%3A11030",
    },
    decorators: [withDesign],
  },
  argTypes: {
    children: { name: "Label (children)", control: "text", defaultValue: "Button text" },
    variant: { name: "Variant" },
    color: {
      name: "Color",
      control: {
        type: "select",
        options: extendedColors,
      },
    },
    dot: {
      name: "Dot",
      control: { type: "boolean" },
      defaultValue: false,
    },
    small: {
      name: "Small",
      control: { type: "boolean" },
      defaultValue: false,
    },
    removeButton: {
      name: "Show Remove Button",
      control: { type: "boolean" },
      defaultValue: false,
    },
    testId: { control: false },
    className: { name: "Container Class Name", control: "text" },
    outlined: { control: false },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
  },
};

export const BadgeFactory = ({ children, color, dot, small, variant, removeButton, className, useTokens, tokens }) => (
  <Badge
    color={color}
    dot={dot}
    small={small}
    className={className}
    variant={variant}
    onRemoveButtonClick={removeButton ? () => {} : undefined}
    tokens={useTokens && tokens}
  >
    {children}
  </Badge>
);

BadgeFactory.args = {
  children: "Custom Label",
  variant: "outlined",
  color: "primary",
  small: false,
  dot: false,
  removeButton: false,
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["Badge"],
};

BadgeFactory.parameters = {
  controls: {
    expanded: false,
  },
};

BadgeFactory.decorators = showFactoryDecorator(true);

export const Basic = () => (
  <Badge color="primary" onClick={() => {}}>
    <Intl name="badgeContent" />
  </Badge>
);
export const Small = () => (
  <Badge color="primary" small={true} onClick={() => {}}>
    <Intl name="badgeContent" />
  </Badge>
);
export const WithDot = () => (
  <Badge color="primary" dot={true} onClick={() => {}}>
    <Intl name="badgeContent" />
  </Badge>
);
export const WithRemoveButton = () => (
  <Badge color="primary" onClick={() => {}} onRemoveButtonClick={() => {}}>
    <Intl name="badgeContent" />
  </Badge>
);
export const Outlined = () => (
  <Badge color="primary" onClick={() => {}} variant="outlined">
    <Intl name="badgeContent" />
  </Badge>
);

export const AllColors = () => (
  <div className="flex flex-col space-y-2">
    <div className="flex flex-row flex-wrap">
      <Badge color="primary" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="secondary" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="tertiary" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="info" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="success" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="danger" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="warning" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="white" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
    </div>
    <div className="flex flex-row flex-wrap">
      <Badge color="primary" variant="outlined" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="secondary" variant="outlined" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="tertiary" variant="outlined" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="info" variant="outlined" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="success" variant="outlined" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="danger" variant="outlined" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="warning" variant="outlined" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
      <Badge color="white" variant="outlined" onClick={() => {}}>
        <Intl name="badgeContent" />
      </Badge>
    </div>
  </div>
);

const HideControls = {
  children: { control: { disable: true } },
  color: { control: { disable: true } },
  dot: { control: { disable: true } },
  small: { control: { disable: true } },
  variant: { control: { disable: true } },
  removeButton: { control: { disable: true } },
  className: { control: { disable: true } },
  outlined: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

Basic.argTypes = HideControls;
Small.argTypes = HideControls;
WithDot.argTypes = HideControls;
WithRemoveButton.argTypes = HideControls;
Outlined.argTypes = HideControls;
AllColors.argTypes = HideControls;
