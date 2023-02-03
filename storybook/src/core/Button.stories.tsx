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

import { Button, Tooltip } from "@tiller-ds/core";
import { Icon, iconTypes, LoadingIcon } from "@tiller-ds/icons";
import { ComponentTokens, defaultThemeConfig } from "@tiller-ds/theme";

import { extendedColors, getTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./Button.mdx";

export default {
  title: "Component Library/Core/Button",
  component: Button,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        return getTokensFromSource(source, "Button");
      },
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
    tokens: { name: "Tokens", control: "object" },
    buttonRef: { control: false },
  },
};

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
    onClick={() => {}}
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
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["Button"],
};

ButtonFactory.parameters = {
  controls: {
    expanded: false,
  },
};

ButtonFactory.decorators = showFactoryDecorator(true);

export const Filled = () => <Button>Button</Button>;

export const Outlined = () => <Button variant="outlined">Button</Button>;

export const Text = () => <Button variant="text">Button</Button>;

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

export const Disabled = () => (
  <Button variant="filled" disabled={true}>
    Button
  </Button>
);

export const Sizes = () => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
    <div className="flex flex-col items-center space-y-2">
      <Button variant="filled" color="primary" size="xs">
        Button xs
      </Button>
      <Tooltip
        label={
          "'py-1.5 px-2.5 text-button-xs' \n\n" +
          ".text-button-xs {\n" +
          "  font-size: 0.75rem;\n" +
          "  line-height: 1.25rem;\n" +
          "  font-weight: 500;\n" +
          "}"
        }
      >
        <Icon type="info" />
      </Tooltip>
    </div>
    <div className="flex flex-col items-center space-y-2">
      <Button variant="filled" color="primary" size="sm">
        Button sm
      </Button>
      <Tooltip
        label={
          "'py-2 px-3 text-button-sm' \n\n" +
          ".text-button-sm {\n" +
          "  font-size: 0.875rem;\n" +
          "  line-height: 1.25rem;\n" +
          "  font-weight: 500;\n" +
          "}\n"
        }
      >
        <Icon type="info" />
      </Tooltip>
    </div>

    <div className="flex flex-col items-center space-y-2">
      <Button variant="filled" color="primary" size="md">
        Button md
      </Button>
      <Tooltip
        label={
          "'py-2 px-4 text-button-md' \n\n" +
          ".text-button-md {\n" +
          "  font-size: 0.875rem;\n" +
          "  line-height: 1.25rem;\n" +
          "  font-weight: 500;\n" +
          "}\n"
        }
      >
        <Icon type="info" />
      </Tooltip>
    </div>
    <div className="flex flex-col items-center space-y-2">
      <Button variant="filled" color="primary" size="lg">
        Button lg
      </Button>
      <Tooltip
        label={
          "'py-2 px-4 text-button-lg' \n\n" +
          ".text-button-lg {\n" +
          "  font-size: 1rem;\n" +
          "  line-height: 1.25rem;\n" +
          "  font-weight: 500;\n" +
          "}"
        }
      >
        <Icon type="info" />
      </Tooltip>
    </div>
    <div className="flex flex-col items-center space-y-2">
      <Button variant="filled" color="primary" size="xl">
        Button xl
      </Button>
      <Tooltip
        label={
          "'py-3 px-6 text-button-xl' \n\n" +
          ".text-button-xl {\n" +
          "  font-size: 1rem;\n" +
          "  line-height: 1.25rem;\n" +
          "  font-weight: 500;\n" +
          "}\n"
        }
      >
        <Icon type="info" />
      </Tooltip>
    </div>
  </div>
);

export const Status = () => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
    <Button variant="filled" color="success">
      Success
    </Button>
    <Button variant="filled" color="warning">
      Warning
    </Button>
    <Button variant="filled" color="danger">
      Danger
    </Button>
    <Button variant="filled" color="info">
      Info
    </Button>
  </div>
);

export const Waiting = () => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
    <Button variant="filled" leadingIcon={<LoadingIcon />}>
      Button
    </Button>
    <Button variant="outlined" leadingIcon={<LoadingIcon />}>
      Button
    </Button>
    <Button variant="text" leadingIcon={<LoadingIcon />}>
      Button
    </Button>
  </div>
);

export const Success = () => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
    <Button variant="filled" color="success" leadingIcon={<Icon type="check" variant="bold" />}>
      Button
    </Button>
    <Button variant="outlined" color="success" leadingIcon={<Icon type="check" variant="bold" />}>
      Button
    </Button>
    <Button variant="text" color="success" leadingIcon={<Icon type="check" variant="bold" />}>
      Button
    </Button>
  </div>
);

export const Error = () => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
    <Button variant="filled" color="danger" leadingIcon={<Icon type="warning" variant="fill" />}>
      Button
    </Button>
    <Button variant="outlined" color="danger" leadingIcon={<Icon type="warning" variant="fill" />}>
      Button
    </Button>
    <Button variant="text" color="danger" leadingIcon={<Icon type="warning" variant="fill" />}>
      Button
    </Button>
  </div>
);

export const ColorsFilled = () => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
    <Button variant="filled" color="primary">
      Primary
    </Button>
    <Button variant="filled" color="secondary">
      Secondary
    </Button>
    <Button variant="filled" color="tertiary">
      Tertiary
    </Button>
    <Button variant="filled" color="info">
      Info
    </Button>
    <Button variant="filled" color="success">
      Success
    </Button>
    <Button variant="filled" color="danger">
      Danger
    </Button>
    <Button variant="filled" color="warning">
      Warning
    </Button>
  </div>
);

export const ColorsOutlined = () => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
    <Button variant="outlined" color="primary">
      Primary
    </Button>
    <Button variant="outlined" color="secondary">
      Secondary
    </Button>
    <Button variant="outlined" color="tertiary">
      Tertiary
    </Button>
    <Button variant="outlined" color="info">
      Info
    </Button>
    <Button variant="outlined" color="success">
      Success
    </Button>
    <Button variant="outlined" color="danger">
      Danger
    </Button>
    <Button variant="outlined" color="warning">
      Warning
    </Button>
  </div>
);

export const ColorsText = () => (
  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
    <Button variant="text" color="primary">
      Primary
    </Button>
    <Button variant="text" color="secondary">
      Secondary
    </Button>
    <Button variant="text" color="tertiary">
      Tertiary
    </Button>
    <Button variant="text" color="info">
      Info
    </Button>
    <Button variant="text" color="success">
      Success
    </Button>
    <Button variant="text" color="danger">
      Danger
    </Button>
    <Button variant="text" color="warning">
      Warning
    </Button>
  </div>
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
Waiting.argTypes = HideControls;
Success.argTypes = HideControls;
Error.argTypes = HideControls;
LeadingIcon.argTypes = HideControls;
TrailingIcon.argTypes = HideControls;
CustomViaTokens.argTypes = HideControls;
