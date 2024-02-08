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
import { useState } from "react";

import { withDesign } from "storybook-addon-designs";

import { NumberInput } from "@tiller-ds/form-elements";
import { Icon, iconTypes } from "@tiller-ds/icons";
import { DropdownMenu } from "@tiller-ds/menu";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { beautifySource, extendedColors, getChangedTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./DropdownMenu.mdx";

export default {
  title: "Component Library/Menu/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source
          .replace(/DropdownMenuItem/g, "DropdownMenu.Item")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return beautifySource(getChangedTokensFromSource(correctedSource, "DropdownMenu"), "DropdownMenu");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9129%3A11943",
    },
    decorators: [withDesign],
  },
  argTypes: {
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
      name: "Button Color",
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
    scrollbar: { name: "Show Scrollbar", control: "boolean" },
    visibleItemCount: {
      name: "Number of Visible Items",
      control: { type: "number", min: 1, max: 9 },
      if: { arg: "scrollbar" },
    },
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
    visibleItemCount={visibleItemCount}
    className={className}
    variant={variant}
    color={color}
    title={title}
    popupBackgroundColor={popupBackgroundColor}
    size={size}
  >
    <DropdownMenu.Item onSelect={() => {}}>Account</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Info</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Messages</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Alerts</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Notifications</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Pictures</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

DropdownMenuFactory.decorators = showFactoryDecorator();

DropdownMenuFactory.args = {
  title: "Dropdown",
  menuType: "text",
  variant: "outlined",
  size: "md",
  popupBackgroundColor: "light",
  color: "white",
  icon: "caret-down",
  iconColor: "none",
  iconVariant: "regular",
  iconPlacement: "trailing",
  scrollbar: false,
  visibleItemCount: 5,
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["DropdownMenu"],
};

export const Simple = () => (
  <DropdownMenu title="User">
    <DropdownMenu.Item onSelect={() => {}}>Account settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

export const WithScrollbar = () => (
  <DropdownMenu title="User" visibleItemCount={5}>
    <DropdownMenu.Item onSelect={() => {}}>Account</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Info</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Messages</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Alerts</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Notifications</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Account Pictures</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

export const WithDefinedVisibleItemCount = () => {
  // incl-code
  const [visibleCount, setVisibleCount] = useState<number | undefined>(5);

  return (
    <div className="flex space-x-4 items-end">
      <DropdownMenu title="User" visibleItemCount={visibleCount}>
        <DropdownMenu.Item onSelect={() => {}}>Account</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => {}}>Account Info</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => {}}>Account Messages</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => {}}>Account Alerts</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => {}}>Account Notifications</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => {}}>Account Settings</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => {}}>Account Pictures</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => {}}>Support</DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => {}}>Sign Out</DropdownMenu.Item>
      </DropdownMenu>
      <NumberInput
        type="number"
        allowNegative={false}
        name="count"
        label="Visible item count"
        className="w-32"
        value={String(visibleCount)}
        onChange={setVisibleCount}
      />
    </div>
  );
};

export const WithLeadingIcon = () => (
  <DropdownMenu title="User" iconPlacement="leading">
    <DropdownMenu.Item onSelect={() => {}}>Account settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Sign Out</DropdownMenu.Item>
  </DropdownMenu>
);

export const AsIcon = () => (
  <DropdownMenu menuType="icon" color="white" variant="text">
    <DropdownMenu.Item onSelect={() => {}}>Jeep: Fiat Chrysler Automobiles</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Alfa Romeo: Fiat Chrysler Automobiles</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Infiniti: Renault-Nissan-Mitsubishi Alliance</DropdownMenu.Item>
  </DropdownMenu>
);

export const WithLongItems = () => (
  <DropdownMenu title="Cars">
    <DropdownMenu.Item onSelect={() => {}}>Jeep: Fiat Chrysler Automobiles</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Alfa Romeo: Fiat Chrysler Automobiles</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Infiniti: Renault-Nissan-Mitsubishi Alliance</DropdownMenu.Item>
  </DropdownMenu>
);

export const WithDisabledItems = () => (
  <DropdownMenu title="User">
    <DropdownMenu.Item onSelect={() => {}} disabled={true}>
      Account settings
    </DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}} disabled={true}>
      Sign Out
    </DropdownMenu.Item>
  </DropdownMenu>
);

export const Disabled = () => (
  <DropdownMenu title="User" disabled={true}>
    <DropdownMenu.Item onSelect={() => {}}>Account settings</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Support</DropdownMenu.Item>
    <DropdownMenu.Item onSelect={() => {}}>Sign Out</DropdownMenu.Item>
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
  iconPlacement: { control: { disable: true } },
  tokens: { control: { disable: true } },
  useTokens: { control: { disable: true } },
};

Simple.argTypes = HideControls;
WithScrollbar.argTypes = HideControls;
WithDefinedVisibleItemCount.argTypes = HideControls;
WithLeadingIcon.argTypes = HideControls;
AsIcon.argTypes = HideControls;
WithLongItems.argTypes = HideControls;
WithDisabledItems.argTypes = HideControls;
Disabled.argTypes = HideControls;
