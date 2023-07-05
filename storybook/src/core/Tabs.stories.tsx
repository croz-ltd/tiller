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

import { Button, Tabs } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { getChangedTokensFromSource, showFactoryDecorator } from "../utils";

import mdx from "./Tabs.mdx";

const billing = "Billing";
const billingTab = "Billing Tab";
const company = "Company";
const companyTab = "Company Tab";
const myAccount = "My account";
const myAccountTab = "My account Tab";
const teamMembers = "Team Members";
const teamMembersTab = "Team Members Tab";
const settings = "Settings";
const settingsTab = "Settings tab";
const contact = "Contact";
const contactTab = "Contact Tab";

export default {
  title: "Component Library/Core/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source
          .replace(/TabsTab/g, "Tabs.Tab")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
        return getChangedTokensFromSource(correctedSource, "Tabs");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=10579%3A14465",
    },
    decorators: [withDesign],
  },
  argTypes: {
    scrollButtons: { name: "Show Scroll Buttons", control: "boolean" },
    fullWidth: { name: "Full Width", control: "boolean" },
    iconPlacement: { name: "Icon Placement", control: "radio", options: ["none", "leading", "trailing"] },
    children: { name: "Tabs Content (separated by comma)", control: "text" },
    className: { name: "Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
    defaultIndex: { control: false },
  },
};

export const TabsFactory = ({ iconPlacement, fullWidth, children, scrollButtons, className, useTokens, tokens }) => {
  return (
    <Tabs
      iconPlacement={iconPlacement}
      fullWidth={fullWidth}
      scrollButtons={scrollButtons}
      className={className}
      tokens={useTokens && tokens}
    >
      {children.split(", ").map((item) => (
        <Tabs.Tab label={item} icon={iconPlacement !== "none" ? <Icon type="user" /> : undefined}>
          {item + " Tab"}
        </Tabs.Tab>
      ))}
    </Tabs>
  );
};

TabsFactory.args = {
  children: "Home, Dashboard, Messages",
  iconPlacement: "none",
  scrollButtons: false,
  fullWidth: false,
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["Tabs"],
};

TabsFactory.parameters = {
  controls: {
    expanded: false,
  },
};

TabsFactory.decorators = showFactoryDecorator();

export const Simple = () => (
  <Tabs>
    <Tabs.Tab label={myAccount}>{myAccountTab}</Tabs.Tab>
    <Tabs.Tab label={company}>{companyTab}</Tabs.Tab>
    <Tabs.Tab label={teamMembers}>{teamMembersTab}</Tabs.Tab>
    <Tabs.Tab label={billingTab}>{billingTab}</Tabs.Tab>
  </Tabs>
);

export const WithLeadingIcons = () => (
  <Tabs>
    <Tabs.Tab label={myAccount} icon={<Icon type="user" variant="fill" />}>
      {myAccountTab}
    </Tabs.Tab>
    <Tabs.Tab label={company} icon={<Icon type="buildings" variant="fill" />}>
      {companyTab}
    </Tabs.Tab>
    <Tabs.Tab label={teamMembers} icon={<Icon type="users-three" variant="fill" />}>
      {teamMembersTab}
    </Tabs.Tab>
    <Tabs.Tab label={billing} icon={<Icon type="credit-card" variant="fill" />}>
      {billingTab}
    </Tabs.Tab>
  </Tabs>
);

export const WithTrailingIcons = () => (
  <Tabs iconPlacement="trailing">
    <Tabs.Tab label={myAccount} icon={<Icon type="user" variant="fill" />}>
      {myAccountTab}
    </Tabs.Tab>
    <Tabs.Tab label={company} icon={<Icon type="buildings" variant="fill" />}>
      {companyTab}
    </Tabs.Tab>
    <Tabs.Tab label={teamMembers} icon={<Icon type="users-three" variant="fill" />}>
      {teamMembersTab}
    </Tabs.Tab>
    <Tabs.Tab label={billing} icon={<Icon type="credit-card" variant="fill" />}>
      {billingTab}
    </Tabs.Tab>
  </Tabs>
);

export const WithDifferentDefaultTab = () => (
  <Tabs defaultIndex={2}>
    <Tabs.Tab label={myAccount}>{myAccountTab}</Tabs.Tab>
    <Tabs.Tab label={company}>{companyTab}</Tabs.Tab>
    <Tabs.Tab label={teamMembers}>{teamMembersTab}</Tabs.Tab>
    <Tabs.Tab label={billingTab}>{billingTab}</Tabs.Tab>
  </Tabs>
);

export const WithActionOnTabClick = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <Tabs>
      <Tabs.Tab label={myAccount} onClick={(selectedIndex) => setCurrentIndex(selectedIndex)}>
        {myAccountTab} (on tab index no. <b>{currentIndex}</b>)
      </Tabs.Tab>
      <Tabs.Tab label={company} onClick={(selectedIndex) => setCurrentIndex(selectedIndex)}>
        {companyTab} (on tab index no. <b>{currentIndex}</b>)
      </Tabs.Tab>
      <Tabs.Tab label={teamMembers} onClick={(selectedIndex) => setCurrentIndex(selectedIndex)}>
        {teamMembersTab} (on tab index no. <b>{currentIndex}</b>)
      </Tabs.Tab>
      <Tabs.Tab label={billingTab} onClick={(selectedIndex) => setCurrentIndex(selectedIndex)}>
        {billingTab} (on tab index no. <b>{currentIndex}</b>)
      </Tabs.Tab>
    </Tabs>
  );
};

export const FullWidth = () => (
  <Tabs fullWidth={true}>
    <Tabs.Tab label={myAccount}>{myAccountTab}</Tabs.Tab>
    <Tabs.Tab label={company}>{companyTab}</Tabs.Tab>
    <Tabs.Tab label={teamMembers}>{teamMembersTab}</Tabs.Tab>
    <Tabs.Tab label={billingTab}>{billingTab}</Tabs.Tab>
  </Tabs>
);

export const ScrollButtons = () => (
  <div className="max-w-sm">
    <Tabs fullWidth={true} scrollButtons>
      <Tabs.Tab label={myAccount}>{billingTab}</Tabs.Tab>
      <Tabs.Tab label={company}>{companyTab}</Tabs.Tab>
      <Tabs.Tab label={myAccount}>{myAccountTab}</Tabs.Tab>
      <Tabs.Tab label={teamMembers}>{teamMembersTab}</Tabs.Tab>
      <Tabs.Tab label={contact}>{contactTab}</Tabs.Tab>
      <Tabs.Tab label={settings}>{settingsTab}</Tabs.Tab>
    </Tabs>
  </div>
);

export const WithIndex = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <div className="flex flex-col gap-4 w-fit">
      <Tabs index={index} onTabChange={setIndex}>
        <Tabs.Tab label={myAccount}>{billingTab}</Tabs.Tab>
        <Tabs.Tab label={company}>{companyTab}</Tabs.Tab>
      </Tabs>
      <Button onClick={() => setIndex((currentIndex) => (currentIndex + 1) % 2)}>Change tab</Button>
    </div>
  );
};

const HideControls = {
  children: { control: { disable: true } },
  iconPlacement: { control: { disable: true } },
  scrollButtons: { control: { disable: true } },
  fullWidth: { control: { disable: true } },
  tokens: { control: { disable: true } },
  useTokens: { control: { disable: true } },
};

Simple.argTypes = HideControls;
WithLeadingIcons.argTypes = HideControls;
WithTrailingIcons.argTypes = HideControls;
WithDifferentDefaultTab.argTypes = HideControls;
WithActionOnTabClick.argTypes = HideControls;
FullWidth.argTypes = HideControls;
ScrollButtons.argTypes = HideControls;
