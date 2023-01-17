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

import { Icon, iconTypes } from "@tiller-ds/icons";
import { DropdownMenu } from "@tiller-ds/menu";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { extendedColors } from "../utils";
import mdx from "./DropdownMenu.mdx";

const onSelectAccount = action("onSelect-account-settings");
const onSelectSupport = action("onSelect-support");
const onSelectSignOut = action("onSelect-sign-out");

export default {
  title: "Component Library/Menu/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9129%3A11943",
    },
    decorators: [withDesign],
  },
  argTypes: {
    animated: { name: "Animated", control: "boolean" },
    popupBackgroundColor: {
      name: "Background Popup Color",
      control: {
        type: "radio",
        options: ["default", "dark", "light"],
      },
    },
    menuType: {
      name: "Menu Type",
      control: {
        type: "radio",
        options: ["text", "icon"],
      },
    },
    title: { name: "Title", control: "text" },
    variant: {
      name: "Button Variant",
      control: {
        type: "radio",
        options: ["text", "filled", "outlined"],
      },
    },
    size: {
      name: "Size",
      control: {
        type: "radio",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
    },
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
    iconVariant: {
      name: "Icon Variant",
      options: ["thin", "light", "regular", "bold", "fill"],
      control: { type: "radio" },
    },
    iconColor: {
      name: "Icon Color",
      options: ["default", "dark", "light", "none"],
      control: { type: "radio" },
    },
    iconPlacement: { name: "Icon Placement", control: { type: "radio", options: ["leading", "trailing"] } },
    visibleItemCount: { name: "Number of Visible Items", control: { type: "number", min: 0 } },
    className: { name: "Class Name", control: "text" },
    children: { control: false },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { control: "object" },
    height: { control: false },
  },
};

export const DropdownMenuFactory = ({
  icon,
  iconColor,
  iconVariant,
  variant,
  color,
  className,
  animated,
  menuType,
  title,
  popupBackgroundColor,
  size,
  iconPlacement,
  useTokens,
  tokens,
  visibleItemCount,
}) => (
  <DropdownMenu
    menuType={menuType}
    openExpanderIcon={<Icon type={icon} variant={iconVariant} size={3} />}
    iconPlacement={iconPlacement}
    iconColor={iconColor !== "none" ? iconColor : undefined}
    tokens={useTokens && tokens}
    visibleItemCount={visibleItemCount !== 0 && visibleItemCount}
    className={className}
    variant={variant}
    color={color}
    title={title}
    popupBackgroundColor={popupBackgroundColor}
    size={size}
  >
    <DropdownMenu.Item onSelect={onSelectAccount}>Account</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Info</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Messages</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Alerts</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Notifications</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Pictures</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSupport}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSignOut}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

DropdownMenuFactory.decorators = [
  (storyFn: () => React.ReactNode) => (
    <div className="flex flex-col space-y-10">
      <div className="flex">{storyFn()}</div>
      <hr />
      <div className="text-gray-800 text-sm">
        <span className="font-semibold">Note:</span> To create a one-off button use tokens, but first toggle 'Use
        Tokens'.
        <br />
        <span className="font-semibold mt-2">Tips:</span>
        <li>remove the lines of tokens you didn't change to have a cleaner and shorter code output</li>
        <li>remove all tokens (leave an empty object) if you want to have full control with just the class name</li>
      </div>
    </div>
  ),
];

DropdownMenuFactory.args = {
  title: "Dropdown",
  menuType: "text",
  variant: "outlined",
  size: "md",
  color: "white",
  icon: "caret-down",
  iconColor: "none",
  iconVariant: "regular",
  iconPlacement: "trailing",
  visibleItemCount: 5,
  animated: false,
  popupBackgroundColor: "light",
  useTokens: false,
  tokens: defaultThemeConfig.component["DropdownMenu"],
  className: "",
};

export const Simple = () => (
  <DropdownMenu title="User">
    <DropdownMenu.Item onSelect={onSelectAccount}>Account settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSupport}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSignOut}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

export const Animated = () => (
  <DropdownMenu title="User">
    <DropdownMenu.Item onSelect={onSelectAccount}>Account settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSupport}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSignOut}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

export const WithScrollbar = () => (
  <DropdownMenu title="User" visibleItemCount={5}>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Info</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Messages</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Alerts</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Notifications</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account Pictures</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSupport}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSignOut}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

export const WithLeadingIcon = () => (
  <DropdownMenu title="User" iconPlacement="leading">
    <DropdownMenu.Item onSelect={onSelectAccount}>Account settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSupport}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSignOut}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

export const AsIcon = () => (
  <DropdownMenu menuType="icon" color="white" variant="text">
    <DropdownMenu.Item onSelect={action("onSelect-jeep")}>Jeep: Fiat Chrysler Automobiles</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={action("onSelect-alfaromeo")}>Alfa Romeo: Fiat Chrysler Automobiles</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={action("onSelect-infiniti")}>
      Infiniti: Renault-Nissan-Mitsubishi Alliance
    </DropdownMenu.Item>
  </DropdownMenu>
);

export const WithLongItems = () => (
  <DropdownMenu title="Cars">
    <DropdownMenu.Item onSelect={action("onSelect-jeep")}>Jeep: Fiat Chrysler Automobiles</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={action("onSelect-alfaromeo")}>Alfa Romeo: Fiat Chrysler Automobiles</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={action("onSelect-infiniti")}>
      Infiniti: Renault-Nissan-Mitsubishi Alliance
    </DropdownMenu.Item>
  </DropdownMenu>
);

export const WithDisabledItems = () => (
  <DropdownMenu title="User">
    <DropdownMenu.Item onSelect={onSelectAccount} disabled={true}>
      Account settings
    </DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSupport}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSignOut} disabled={true}>
      Sign Out
    </DropdownMenu.Item>
  </DropdownMenu>
);

export const Disabled = () => (
  <DropdownMenu title="User" disabled={true}>
    <DropdownMenu.Item onSelect={onSelectAccount}>Account settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSupport}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={onSelectSignOut}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

DropdownMenuFactory.parameters = {
  controls: {
    expanded: false,
  },
};

const HideControls = {
  children: { control: { disable: true } },
  variant: { control: { disable: true } },
  color: { control: { disable: true } },
  icon: { control: { disable: true } },
  iconType: { control: { disable: true } },
  iconColor: { control: { disable: true } },
  iconVariant: { control: { disable: true } },
  hidden: { control: { disable: true } },
  menu: { control: { disable: true } },
  className: { control: { disable: true } },
  waiting: { control: { disable: true } },
  menuType: { control: { disable: true } },
  size: { control: { disable: true } },
  title: { control: { disable: true } },
  popupBackgroundColor: { control: { disable: true } },
  animated: { control: { disable: true } },
  iconPlacement: { control: { disable: true } },
  tokens: { control: { disable: true } },
  useTokens: { control: { disable: true } },
};

Simple.argTypes = HideControls;
Animated.argTypes = HideControls;
WithScrollbar.argTypes = HideControls;
WithLeadingIcon.argTypes = HideControls;
AsIcon.argTypes = HideControls;
WithLongItems.argTypes = HideControls;
WithDisabledItems.argTypes = HideControls;
Disabled.argTypes = HideControls;
