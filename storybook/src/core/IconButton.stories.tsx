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

import { BrowserRouter } from "react-router-dom";

import { action } from "@storybook/addon-actions";
import { withDesign } from "storybook-addon-designs";

import { IconButton } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";

import mdx from "./IconButton.mdx";

const onClick = action("icon-click");
const type = "pencil-simple";
const variant = "fill";
const name = "iconbutton";
const label = "Edit";
const dashboardLink = "/dashboard";

export default {
  title: "Component Library/Core/IconButton",
  component: IconButton,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic" },
    },
    design: {
        type: "figma",
        url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9657%3A13249",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => (
  <IconButton
    name={name}
    icon={<Icon type={type} variant="fill" className="text-gray-500" />}
    label={label}
    onClick={onClick}
  />
);

export const WithoutTooltip = () => (
  <IconButton
    name={name}
    icon={<Icon type={type} variant={variant} className="text-gray-500" />}
    showTooltip={false}
    onClick={onClick}
  />
);

export const Disabled = () => (
  <IconButton
    name={name}
    icon={<Icon type={type} variant={variant} className="text-gray-500" />}
    label={label}
    onClick={onClick}
    disabled={true}
  />
);

export const WithLink = () => (
  <BrowserRouter>
    <IconButton
      to={dashboardLink}
      name={name}
      icon={<Icon type={type} variant={variant} className="text-gray-500" />}
      label={label}
      className="hover:no-underline"
    />
  </BrowserRouter>
);

export const WithLinkInNewTab = () => (
  <BrowserRouter>
    <IconButton
      to={dashboardLink}
      target={"_blank"}
      name={name}
      icon={<Icon type={type} variant={variant} className="text-gray-500" />}
      label={label}
      className="hover:no-underline"
    />
  </BrowserRouter>
);

export const WithLinkAndOnClick = () => (
  <BrowserRouter>
    <IconButton
      to={dashboardLink}
      name={name}
      icon={<Icon type={type} variant={variant} className="text-gray-500" />}
      label={label}
      onClick={onClick}
      className="hover:no-underline"
    />
  </BrowserRouter>
);
