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

import { Icon } from "@tiller-ds/icons";

import { extendedColors, showFactoryDecorator } from "../utils";

import mdx from "./Icon.mdx";

export default {
  title: "Component Library/Icons/Icon",
  component: Icon,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9657%3A13249",
    },
    decorators: [withDesign],
  },
  argTypes: {
    variant: { name: "Variant", control: "radio" },
    color: { name: "Color", control: "select", options: extendedColors },
    size: { name: "Size", control: { type: "range", min: 1, max: 13, step: 1 } },
    type: { name: "Type", control: "select" },
    className: { name: "Class Name", control: "text" },
  },
};

export const IconFactory = ({ color, size, type, variant, className }) => {
  return <Icon type={type} className={"text-" + color + " " + className} variant={variant} size={size} />;
};

IconFactory.args = {
  variant: "fill",
  color: "primary",
  size: 4,
  type: "star",
  className: "",
};

IconFactory.parameters = {
  controls: {
    expanded: false,
  },
};

IconFactory.decorators = showFactoryDecorator();

export const Simple = () => <Icon type="dog" variant="fill" />;

export const WithVariant = () => <Icon type="star" variant="regular" />;

export const WithColor = () => <Icon type="star" className="text-red-500" />;

export const WithPrimaryColor = () => <Icon type="star" className="text-primary" />;

export const WithCustomSize = () => <Icon type="star" variant="regular" size={8} />;

export const WithArbitrarySize = () => <Icon type="star" variant="regular" style={{ fontSize: "200px" }} />;

const HideControls = {
  variant: { control: { disable: true } },
  color: { control: { disable: true } },
  size: { control: { disable: true } },
  type: { control: { disable: true } },
  className: { control: { disable: true } },
};

Simple.argTypes = HideControls;
WithVariant.argTypes = HideControls;
WithColor.argTypes = HideControls;
WithPrimaryColor.argTypes = HideControls;
WithCustomSize.argTypes = HideControls;
WithArbitrarySize.argTypes = HideControls;
WithArbitrarySize.argTypes = HideControls;
