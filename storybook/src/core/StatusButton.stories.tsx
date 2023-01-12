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

import { action } from "@storybook/addon-actions";
import { withDesign } from "storybook-addon-designs";

import { ButtonSize, StatusButton } from "@tiller-ds/core";

import mdx from "./StatusButton.mdx";

export default {
  title: "Component Library/Core/StatusButton",
  component: StatusButton,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39203",
    },
    decorators: [withDesign],
  },
};

const commonProps = () => ({
  onClick: action("button-click"),
  children: "test",
});

export const IdleFilled = () => <StatusButton {...commonProps()} variant="filled" />;

export const IdleOutlined = () => <StatusButton {...commonProps()} variant="outlined" />;

export const IdleText = () => <StatusButton {...commonProps()} variant="text" />;

export const WaitingFilled = () => (
  <div className="flex flex-row items-center space-x-4">
    {["xs", "sm", "md", "lg", "xl"].map((size, key) => (
      <StatusButton key={key} status="waiting" size={size as ButtonSize} {...commonProps()} variant="filled" />
    ))}
  </div>
);

WaitingFilled.story = {
  parameters: {
    skipTest: true,
  },
};

export const WaitingOutlined = () => (
  <div className="flex flex-row items-center space-x-4">
    {["xs", "sm", "md", "lg", "xl"].map((size, key) => (
      <StatusButton key={key} status="waiting" size={size as ButtonSize} {...commonProps()} variant="outlined" />
    ))}
  </div>
);

WaitingOutlined.story = {
  parameters: {
    skipTest: true,
  },
};

export const WaitingText = () => <StatusButton status="waiting" {...commonProps()} variant="text" />;

WaitingText.story = {
  parameters: {
    skipTest: true,
  },
};

export const SuccessFilled = () => (
  <div className="flex flex-row items-center space-x-4">
    {["xs", "sm", "md", "lg", "xl"].map((size, key) => (
      <StatusButton key={key} status="success" size={size as ButtonSize} {...commonProps()} variant="filled" />
    ))}
  </div>
);

export const SuccessOutlined = () => (
  <div className="flex flex-row items-center space-x-4">
    {["xs", "sm", "md", "lg", "xl"].map((size, key) => (
      <StatusButton key={key} status="success" size={size as ButtonSize} {...commonProps()} variant="outlined" />
    ))}
  </div>
);

export const SuccessText = () => <StatusButton status="success" {...commonProps()} variant="text" />;

export const ErrorFilled = () => (
  <div className="flex flex-row items-center space-x-4">
    {["xs", "sm", "md", "lg", "xl"].map((size, key) => (
      <StatusButton key={key} status="error" size={size as ButtonSize} {...commonProps()} variant="filled" />
    ))}
  </div>
);

export const ErrorOutlined = () => (
  <div className="flex flex-row items-center space-x-4">
    {["xs", "sm", "md", "lg", "xl"].map((size, key) => (
      <StatusButton key={key} status="error" size={size as ButtonSize} {...commonProps()} variant="outlined" />
    ))}
  </div>
);

export const ErrorText = () => <StatusButton status="error" {...commonProps()} variant="text" />;
