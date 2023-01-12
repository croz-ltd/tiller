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

import { Breadcrumbs } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";

import mdx from "./Breadcrumbs.mdx";

export default {
  title: "Component Library/Core/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9470%3A12914",
    },
    decorators: [withDesign],
  },
  argTypes: {
    children: { name: "Items (separated by comma)", control: "text" },
    tokens: { control: false },
  },
};

const projects = "Projects";
const offices = "Offices";
const members = "Members";

export const BreadcrumbsFactory = ({ type, children }) => (
  <Breadcrumbs icon={<Icon type={type} className="text-gray-500" />}>
    {children.split(", ").map((item) => (
      <Breadcrumbs.Breadcrumb>{item}</Breadcrumbs.Breadcrumb>
    ))}
  </Breadcrumbs>
);

BreadcrumbsFactory.args = {
  type: "caret-right",
  children: projects + ", " + offices + ", " + members,
};

export const Simple = () => (
  <Breadcrumbs>
    <Breadcrumbs.Breadcrumb>{projects}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{offices}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{members}</Breadcrumbs.Breadcrumb>
  </Breadcrumbs>
);

export const WithSolid = () => (
  <Breadcrumbs icon={<Icon type="caret-right" variant="bold" className="text-gray-500" />}>
    <Breadcrumbs.Breadcrumb>{projects}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{offices}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{members}</Breadcrumbs.Breadcrumb>
  </Breadcrumbs>
);

export const WithSlash = () => (
  <Breadcrumbs icon={<Icon type="minus" className="text-gray-500 -rotate-45" />}>
    <Breadcrumbs.Breadcrumb>{projects}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{offices}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{members}</Breadcrumbs.Breadcrumb>
  </Breadcrumbs>
);

export const WithBigChevron = () => (
  <Breadcrumbs icon={<Icon type="caret-double-right" variant="bold" className="text-gray-500" />}>
    <Breadcrumbs.Breadcrumb>{projects}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{offices}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{members}</Breadcrumbs.Breadcrumb>
  </Breadcrumbs>
);

export const WithNone = () => (
  <Breadcrumbs icon={<Icon type={undefined} />}>
    <Breadcrumbs.Breadcrumb>{projects}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{offices}</Breadcrumbs.Breadcrumb>
    <Breadcrumbs.Breadcrumb>{members}</Breadcrumbs.Breadcrumb>
  </Breadcrumbs>
);

const HideControls = {
  children: { control: { disable: true } },
  variant: { control: { disable: true } },
};

BreadcrumbsFactory.parameters = {
  controls: {
    expanded: false,
  },
};

Simple.argTypes = HideControls;
WithSolid.argTypes = HideControls;
WithSlash.argTypes = HideControls;
WithBigChevron.argTypes = HideControls;
WithNone.argTypes = HideControls;
