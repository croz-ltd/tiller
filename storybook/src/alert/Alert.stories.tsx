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

import { withDesign } from "storybook-addon-designs";

import { Alert } from "@tiller-ds/alert";
import { Icon, iconTypes } from "@tiller-ds/icons";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { beautifySource, getChangedTokensFromSource, showFactoryDecorator } from "../utils";
import mdx from "./Alert.mdx";

export default {
  title: "Component Library/Alert/Alert",
  component: Alert,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => {
        return getChangedTokensFromSource(beautifySource(source, "Alert"), "Alert");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9648%3A13995",
    },
    decorators: [withDesign],
  },
  argTypes: {
    title: { name: "Title", control: "text" },
    icon: {
      name: "Icon",
      control: { type: "select", options: iconTypes },
    },
    children: { name: "Children (content)", control: "text" },
    className: { name: "Class Name", control: "text" },
    accentBorder: { name: "Accent Border", control: "boolean" },
    variant: { name: "Variant", control: "radio", options: ["info", "success", "warning", "danger"] },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
  },
};

export const AlertFactory = ({ accentBorder, children, className, title, icon, variant, useTokens, tokens }) => (
  <Alert
    accentBorder={accentBorder}
    title={title}
    icon={<Icon type={icon} className="text-info text-2xl" />}
    className={className}
    variant={variant}
    tokens={useTokens && tokens}
  >
    {children}
  </Alert>
);

AlertFactory.args = {
  title: "Attention needed",
  icon: "info",
  children: "You have a new message. Check your profile page for more info.",
  variant: "info",
  accentBorder: false,
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["Alert"],
};

AlertFactory.parameters = {
  controls: {
    expanded: false,
  },
};

AlertFactory.decorators = showFactoryDecorator();

export const Simple = () => <Alert>You have a new message. Check your profile page for more info.</Alert>;

export const WithTitle = () => (
  <Alert title="Attention needed">You have a new message. Check your profile page for more info.</Alert>
);

export const WithList = () => (
  <Alert title="There were 2 errors with your submission">
    <ul className="list-disc pl-5">
      <li>Your username is already taken.</li>
      <li className="mt-1">The file is too big to upload. Maximum file size is 2MB.</li>
    </ul>
  </Alert>
);

export const WithAccent = () => (
  <Alert variant="info" accentBorder={true} className="mb-3">
    You have a new message. Check your profile page for more info.
  </Alert>
);

export const WithIcon = () => (
  <div className="flex flex-col space-y-2">
    <Alert icon={<Icon type="info" size={6} className="text-info" />}>
      You have a new message. Check your profile page for more info.
    </Alert>
    <Alert variant="warning" icon={<Icon type="warning" size={6} className="text-warning" />}>
      You have a new message. Check your profile page for more info.
    </Alert>
    <Alert title="Attention needed" icon={<Icon type="warning-circle" size={6} className="text-danger" />} variant="danger">
      You have a new message. Check your profile page for more info.
    </Alert>
    <Alert title="Attention needed" icon={<Icon type="check-circle" size={6} className="text-success" />} variant="success">
      You have a new message. Check your profile page for more info.
    </Alert>
  </div>
);

export const Warning = () => (
  <div className="flex flex-col space-y-2">
    <span className="text-gray-700 text-sm"> Simple: </span>
    <Alert variant="warning">You have a new message. Check your profile page for more info.</Alert>
    <span className="text-gray-700 text-sm"> With Title: </span>
    <Alert variant="warning" title="Attention needed">
      You have a new message. Check your profile page for more info.
    </Alert>
    <span className="text-gray-700 text-sm"> With List: </span>
    <Alert variant="warning" title="There were 2 errors with your submission">
      <ul className="list-disc pl-5">
        <li>Your username is already taken.</li>
        <li className="mt-1">The file is too big to upload. Maximum file size is 2MB.</li>
      </ul>
    </Alert>
    <span className="text-gray-700 text-sm"> With Accent: </span>
    <Alert variant="warning" accentBorder={true} className="mb-3">
      You have a new message. Check your profile page for more info.
    </Alert>
  </div>
);

export const Danger = () => (
  <div className="flex flex-col space-y-2">
    <span className="text-gray-700 text-sm"> Simple: </span>
    <Alert variant="danger">You have a new message. Check your profile page for more info.</Alert>
    <span className="text-gray-700 text-sm"> With Title: </span>
    <Alert variant="danger" title="Attention needed">
      You have a new message. Check your profile page for more info.
    </Alert>
    <span className="text-gray-700 text-sm"> With List: </span>
    <Alert variant="danger" title="There were 2 errors with your submission">
      <ul className="list-disc pl-5">
        <li>Your username is already taken.</li>
        <li className="mt-1">The file is too big to upload. Maximum file size is 2MB.</li>
      </ul>
    </Alert>
    <span className="text-gray-700 text-sm"> With Accent: </span>
    <Alert variant="danger" accentBorder={true} className="mb-3">
      You have a new message. Check your profile page for more info.
    </Alert>
  </div>
);

export const Success = () => (
  <div className="flex flex-col space-y-2">
    <span className="text-gray-700 text-sm"> Simple: </span>
    <Alert variant="success">You have a new message. Check your profile page for more info.</Alert>
    <span className="text-gray-700 text-sm"> With Title: </span>
    <Alert variant="success" title="Attention needed">
      You have a new message. Check your profile page for more info.
    </Alert>
    <span className="text-gray-700 text-sm"> With List: </span>
    <Alert variant="success" title="There were 2 errors with your submission">
      <ul className="list-disc pl-5">
        <li>Your username is already taken.</li>
        <li className="mt-1">The file is too big to upload. Maximum file size is 2MB.</li>
      </ul>
    </Alert>
    <span className="text-gray-700 text-sm"> With Accent: </span>
    <Alert variant="success" accentBorder={true} className="mb-3">
      You have a new message. Check your profile page for more info.
    </Alert>
  </div>
);

const HideControls = {
  accentBorder: { control: { disable: true } },
  className: { control: { disable: true } },
  title: { control: { disable: true } },
  icon: { control: { disable: true } },
  variant: { control: { disable: true } },
  children: { control: { disable: true } },
  tokens: { control: { disable: true } },
  useTokens: { control: { disable: true } },
};

Simple.argTypes = HideControls;
WithTitle.argTypes = HideControls;
WithList.argTypes = HideControls;
WithAccent.argTypes = HideControls;
WithIcon.argTypes = HideControls;
Warning.argTypes = HideControls;
Danger.argTypes = HideControls;
Success.argTypes = HideControls;
