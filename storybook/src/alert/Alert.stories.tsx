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

import { Alert } from "@tiller-ds/alert";

import mdx from "./Alert.mdx";

export default {
  title: "Component Library/Alert/Alert",
  component: Alert,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9648%3A13995",
    },
    decorators: [withDesign],
  },
  argTypes: {
    title: { name: "Title", control: "text" },
    children: { name: "Children (content)", control: "text" },
    className: { name: "Class Name", control: "text" },
    accentBorder: { name: "Accent Border", control: "boolean" },
    variant: { name: "Variant", control: "radio" },
    tokens: { control: false },
  },
};

export const AlertFactory = ({ accentBorder, children, className, title, variant }) => (
  <Alert accentBorder={accentBorder} title={title} className={className} variant={variant}>
    {children}
  </Alert>
);

AlertFactory.args = {
  accentBorder: false,
  children: "You have a new message. Check your profile page for more info.",
  className: "",
  title: "Attention needed",
  variant: "info",
};

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
  <>
    <Alert variant="info" accentBorder={true} className="mb-3">
      You have a new message. Check your profile page for more info.
    </Alert>
    <Alert variant="success" accentBorder={true} className="mb-3">
      You have a new message. Check your profile page for more info.
    </Alert>
    <Alert variant="warning" accentBorder={true} className="mb-3">
      You have a new message. Check your profile page for more info.
    </Alert>
    <Alert variant="danger" accentBorder={true} className="mb-3">
      You have a new message. Check your profile page for more info.
    </Alert>
  </>
);

export const Warning = () => (
  <Alert variant="warning">You have a new message. Check your profile page for more info.</Alert>
);

export const Danger = () => (
  <Alert variant="danger">You have a new message. Check your profile page for more info.</Alert>
);

export const Success = () => (
  <Alert variant="success">You have a new message. Check your profile page for more info.</Alert>
);

AlertFactory.parameters = {
  controls: {
    expanded: false,
  },
};

const HideControls = {
  accentBorder: { control: { disable: true } },
  className: { control: { disable: true } },
  title: { control: { disable: true } },
  variant: { control: { disable: true } },
  children: { control: { disable: true } },
};

Simple.argTypes = HideControls;
WithList.argTypes = HideControls;
WithAccent.argTypes = HideControls;
Warning.argTypes = HideControls;
Danger.argTypes = HideControls;
Success.argTypes = HideControls;
