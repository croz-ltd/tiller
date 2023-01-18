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
import { action } from "@storybook/addon-actions";

import { Button } from "@tiller-ds/core";
import { Icon, iconTypes, LoadingIcon } from "@tiller-ds/icons";
import { extendedColors } from "../utils";
import { ComponentTokens, defaultThemeConfig } from "@tiller-ds/theme";

import mdx from "./Button.mdx";

export default {
  title: "Component Library/Core/Button",
  component: Button,
  parameters: {
    docs: {
      page: mdx,
    },
    playroom: {
      code: "<Button>Hello Button</Button>",
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8137%3A39203",
    },
    decorators: [withDesign],
  },
  argTypes: {
    children: { name: "Label (children)", control: "text" },
    variant: { name: "Variant" },
    size: { name: "Size" },
    color: {
      name: "Color",
      control: {
        type: "select",
        options: extendedColors,
      },
    },
    icon: {
      name: "Icon",
      control: { type: "select", options: iconTypes },
    },
    iconType: {
      name: "Icon Type",
      options: ["trailing", "leading", "none"],
      control: { type: "radio" },
    },
    iconVariant: {
      name: "Icon Variant",
      options: ["thin", "light", "regular", "bold", "fill"],
      control: { type: "radio" },
    },
    onClick: { action: "clicked" },
    hidden: { name: "Hidden" },
    className: { name: "Class Name", control: "text" },
    rounded: { name: "Rounded", control: "boolean" },
    waiting: { name: "Waiting", control: "boolean" },
    id: { control: false },
    containerClassName: { control: false },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
    menu: { control: false },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { control: "object" },
    buttonRef: { control: false },
  },
};

const onClick = action("button-click");

export const ButtonFactory = ({
  icon,
  iconType,
  iconVariant,
  variant,
  children,
  color,
  className,
  size,
  hidden,
  waiting,
  rounded,
  useTokens,
  tokens,
}) => (
  <Button
    children={children}
    variant={variant}
    color={color}
    size={size}
    hidden={hidden}
    rounded={rounded}
    tokens={useTokens && tokens}
    className={className}
    leadingIcon={
      iconType === "leading" ? <Icon type={icon} variant={iconVariant} /> : waiting ? <LoadingIcon /> : undefined
    }
    trailingIcon={iconType === "trailing" ? <Icon type={icon} variant={iconVariant} /> : undefined}
    onClick={onClick}
  />
);

ButtonFactory.args = {
  children: "Custom Label",
  variant: "filled",
  size: "md",
  color: "primary",
  icon: "pencil-simple",
  iconType: "none",
  iconVariant: "regular",
  waiting: false,
  hidden: false,
  rounded: true,
  useTokens: false,
  tokens: defaultThemeConfig.component["Button"],
  className: "",
};

ButtonFactory.parameters = {
  controls: {
    expanded: false,
  },
};

ButtonFactory.decorators = [
  (storyFn: () => React.ReactNode) => (
    <div className="flex flex-col space-y-10">
      <div className="flex">{storyFn()}</div>
      <hr />
      <div className="text-gray-800 text-sm">
        <span className="font-semibold">Note:</span> To create a one-off button use tokens, but first toggle 'Use
        Tokens'. <br />
        <span className="font-semibold mt-2">Tips:</span>
        <li>remove the lines of tokens you didn't change to have a cleaner and shorter code output</li>
        <li>remove all tokens (leave an empty object) if you want to have full control with just the class name</li>
      </div>
    </div>
  ),
];

export const Filled = () => <Button color="tertiary">Button</Button>;

export const Outlined = () => (
  <Button variant="outlined" color="tertiary">
    Button
  </Button>
);

export const Text = () => (
  <Button variant="text" color="tertiary">
    Button
  </Button>
);

export const Sizes = () => (
  <>
    <Button variant="filled" color="primary" size="xs">
      Button xs
    </Button>
    <Button variant="filled" color="primary" size="sm">
      Button sm
    </Button>
    <Button variant="filled" color="primary" size="md">
      Button md
    </Button>
    <Button variant="filled" color="primary" size="lg">
      Button lg
    </Button>
    <Button variant="filled" color="primary" size="xl">
      Button xl
    </Button>
  </>
);

export const Disabled = () => (
  <Button variant="filled" color="tertiary" disabled={true}>
    Button
  </Button>
);

export const Status = () => (
  <>
    <Button variant="filled" color="success">
      Button
    </Button>
    <Button variant="filled" color="warning">
      Button
    </Button>
    <Button variant="filled" color="danger">
      Button
    </Button>
    <Button variant="filled" color="info">
      Button
    </Button>
  </>
);

export const CustomViaTokens = () => {
  const roundedButtonTokens: ComponentTokens<"Button"> = {
    base: {
      borderRadius: "rounded-full",
    },
    size: {
      md: "px-4 py-2 text-button-md",
    },
  };

  return (
    <Button
      tokens={roundedButtonTokens}
      className="hover:bg-green-900"
      trailingIcon={<Icon type="smiley" variant="fill" />}
    >
      Custom Button
    </Button>
  );
};

export const WaitingFilled = () => (
  <Button variant="filled" leadingIcon={<LoadingIcon />}>
    Button
  </Button>
);

export const WaitingOutlined = () => (
  <Button variant="outlined" leadingIcon={<LoadingIcon />}>
    Button
  </Button>
);

export const SuccessFilled = () => (
  <Button variant="filled" color="success" leadingIcon={<Icon type="check" variant="bold" />}>
    Button
  </Button>
);

export const SuccessOutlined = () => (
  <Button variant="outlined" color="success" leadingIcon={<Icon type="check" variant="bold" />}>
    Button
  </Button>
);

export const ErrorFilled = () => (
  <Button variant="filled" color="danger" leadingIcon={<Icon type="warning" variant="fill" />}>
    Button
  </Button>
);

export const ErrorOutlined = () => (
  <Button variant="outlined" color="danger" leadingIcon={<Icon type="warning" variant="fill" />}>
    Button
  </Button>
);

export const ColorsFilled = () => (
  <>
    <Button variant="filled" color="primary">
      Button
    </Button>
    <Button variant="filled" color="secondary">
      Button
    </Button>
    <Button variant="filled" color="tertiary">
      Button
    </Button>
    <Button variant="filled" color="info">
      Button
    </Button>
    <Button variant="filled" color="success">
      Button
    </Button>
    <Button variant="filled" color="danger">
      Button
    </Button>
    <Button variant="filled" color="warning">
      Button
    </Button>
  </>
);

export const ColorsOutlined = () => (
  <>
    <Button variant="outlined" color="primary">
      Button
    </Button>
    <Button variant="outlined" color="secondary">
      Button
    </Button>
    <Button variant="outlined" color="tertiary">
      Button
    </Button>
    <Button variant="outlined" color="info">
      Button
    </Button>
    <Button variant="outlined" color="success">
      Button
    </Button>
    <Button variant="outlined" color="danger">
      Button
    </Button>
    <Button variant="outlined" color="warning">
      Button
    </Button>
  </>
);

export const ColorsText = () => (
  <>
    <Button variant="text" color="primary">
      Button
    </Button>
    <Button variant="text" color="secondary">
      Button
    </Button>
    <Button variant="text" color="tertiary">
      Button
    </Button>
    <Button variant="text" color="info">
      Button
    </Button>
    <Button variant="text" color="success">
      Button
    </Button>
    <Button variant="text" color="danger">
      Button
    </Button>
    <Button variant="text" color="warning">
      Button
    </Button>
  </>
);

export const LeadingIcon = (args) => (
  <Button variant="filled" leadingIcon={<Icon type="envelope-simple" variant="fill" />}>
    Label
  </Button>
);

export const TrailingIcon = (args) => (
  <Button variant="filled" trailingIcon={<Icon type="envelope-simple" variant="fill" />}>
    Label
  </Button>
);

const HideControls = {
  children: { control: { disable: true } },
  variant: { control: { disable: true } },
  size: { control: { disable: true } },
  color: { control: { disable: true } },
  icon: { control: { disable: true } },
  iconType: { control: { disable: true } },
  iconVariant: { control: { disable: true } },
  hidden: { control: { disable: true } },
  menu: { control: { disable: true } },
  className: { control: { disable: true } },
  waiting: { control: { disable: true } },
  rounded: { control: { disable: true } },
  tokens: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  buttonRef: { control: { disable: true } },
};

Filled.argTypes = HideControls;
Outlined.argTypes = HideControls;
Text.argTypes = HideControls;
Disabled.argTypes = HideControls;
ColorsFilled.argTypes = HideControls;
ColorsOutlined.argTypes = HideControls;
ColorsText.argTypes = HideControls;
Status.argTypes = HideControls;
WaitingFilled.argTypes = HideControls;
WaitingOutlined.argTypes = HideControls;
SuccessFilled.argTypes = HideControls;
SuccessOutlined.argTypes = HideControls;
ErrorFilled.argTypes = HideControls;
ErrorOutlined.argTypes = HideControls;
LeadingIcon.argTypes = HideControls;
TrailingIcon.argTypes = HideControls;
CustomViaTokens.argTypes = HideControls;
