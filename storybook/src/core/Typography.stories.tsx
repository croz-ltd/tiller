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

import { Typography } from "@tiller-ds/core";
import { Icon, iconTypes } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import mdx from "./Typography.mdx";

export default {
  title: "Component Library/Core/Typography",
  component: Typography,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39204",
    },
    decorators: [withDesign],
  },
  argTypes: {
    element: { name: "Element (HTML tag)" },
    variant: {
      name: "Variant",
      options: ["text", "title", "subtitle", "subtext"],
      control: { type: "radio" },
    },
    color: {
      name: "Color",
      options: ["text", "primary", "secondary"],
      control: { type: "radio" },
    },
    iconToggle: {
      name: "Toggle Icon (on/off)",
      control: { type: "boolean" },
      defaultValue: "true",
    },
    icon: {
      name: "Icon",
      control: { type: "select", options: iconTypes },
      defaultValue: "note-pencil",
    },
    iconPlacement: {
      name: "Icon Placement",
      options: ["trailing", "leading"],
      control: { type: "radio" },
    },
    iconVariant: {
      name: "Icon Variant",
      options: ["thin", "light", "regular", "bold", "fill"],
      control: { type: "radio" },
    },
    className: {
      control: false,
    },
    children: {
      name: "Label (children)",
      control: "text",
      defaultValue: "Typography text",
    },
    tokens: { control: false },
  },
};

export const TypographyFactory = ({
  iconToggle,
  icon,
  iconPlacement,
  iconVariant,
  variant,
  color,
  element,
  children,
}) => (
  <Typography
    variant={variant}
    icon={iconToggle && <Icon type={icon} variant={iconVariant} />}
    iconPlacement={iconToggle && iconPlacement}
    color={color}
    element={element}
  >
    {children}
  </Typography>
);

TypographyFactory.args = {
  children: "Custom Text",
  element: "h2",
  variant: "text",
  color: "text",
  iconToggle: "true",
  icon: "note-pencil",
  iconPlacement: "leading",
  iconVariant: "fill",
};

export const Example = (args) => (
  <>
    <Typography variant="title" element="h1">
      Title
    </Typography>
    <Typography variant="subtitle" element="p">
      Subtitle
    </Typography>
    <Typography variant="subtext" element="p">
      Subtext
    </Typography>
    <Typography variant="h1" element="h1">
      Heading 1
    </Typography>
    <Typography variant="h2" element="h2">
      Heading 2
    </Typography>
    <Typography variant="h3" element="h2">
      Heading 3
    </Typography>
    <Typography variant="h4" element="h3">
      Heading 4
    </Typography>
    <Typography variant="h5" element="h3">
      Heading 5
    </Typography>
    <Typography variant="h6" element="h3">
      Heading 6
    </Typography>
  </>
);

export const WithIcon = (args, context) => (
  <Typography variant="title" icon={<Icon type="envelope-simple" variant="fill" />} iconPlacement="trailing">
    <Intl name="sampleText" />
  </Typography>
);

TypographyFactory.parameters = {
  controls: {
    expanded: false,
  },
};

const HideControls = {
  element: { control: { disable: true } },
  variant: { control: { disable: true } },
  color: { control: { disable: true } },
  iconToggle: { control: { disable: true } },
  icon: { control: { disable: true } },
  iconPlacement: { control: { disable: true } },
  iconVariant: { control: { disable: true } },
  children: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

Example.argTypes = HideControls;
WithIcon.argTypes = HideControls;
