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

import { BrowserRouter as Router } from "react-router-dom";
import { withDesign } from "storybook-addon-designs";

import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { SidebarNavigation } from "@tiller-ds/menu";

import storybookDictionary from "../intl/storybookDictionary";

import logo from "./images/sample-logo.svg";
import mdx from "./SidebarNavigation.mdx";

export default {
  title: "Component Library/Menu/SidebarNavigation",
  component: SidebarNavigation,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9410%3A12380",
    },
    decorators: [withDesign],
  },
};

const translations = storybookDictionary.translations;
const messages = <Intl name="messages" />;
const reports = <Intl name="reports" />;
const dashboard = <Intl name="dashboard" />;
const projects = <Intl name="projects" />;
const calendar = <Intl name="calendar" />;
const tasks = <Intl name="tasks" />;
const reminders = <Intl name="reminders" />;
const events = <Intl name="events" />;
const team = <Intl name="team" />;
const account = <Intl name="account" />;
const support = <Intl name="support" />;
const signOut = <Intl name="signOut" />;

export const Default = (args, context) => {
  return (
    <Router>
      <SidebarNavigation
        logo={<img src={logo} alt="logo" />}
        bottomActions={
          <>
            <SidebarNavigation.BottomAction to="/messages">{messages}</SidebarNavigation.BottomAction>
            <SidebarNavigation.BottomAction to="/reports">{reports}</SidebarNavigation.BottomAction>
          </>
        }
        topRightAction={
          <SidebarNavigation.Dropdown
            title="User"
            menuType="icon"
            icon={<Icon type="user" className="text-white" />}
            popupBackgroundColor="default"
            iconColor="default"
            buttonColor="primary"
            buttonVariant="text"
          >
            <SidebarNavigation.Dropdown.Item to="/account">{account}</SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/support" color="default">
              {support}
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/logout" color="default">
              {signOut}
            </SidebarNavigation.Dropdown.Item>
          </SidebarNavigation.Dropdown>
        }
      >
        <SidebarNavigation.Item to="/dashboard">{dashboard}</SidebarNavigation.Item>
        <SidebarNavigation.Item isExpandable={true} title={translations[context.globals.language]["planning"]}>
          <SidebarNavigation.SubItem to="/tasks" icon={<Icon type="clipboard" />}>
            {tasks}
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/reminders" icon={<Icon type="bell" />}>
            {reminders}
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/events" icon={<Icon type="money" />}>
            {events}
          </SidebarNavigation.SubItem>
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/projects">{projects}</SidebarNavigation.Item>
        <SidebarNavigation.Item to="/calendar">{calendar}</SidebarNavigation.Item>
        <SidebarNavigation.Item to="/reports">{reports}</SidebarNavigation.Item>
      </SidebarNavigation>
    </Router>
  );
};

export const Dark = (args, context) => {
  return (
    <Router>
      <SidebarNavigation
        logo={<img src={logo} alt="logo" />}
        bottomActions={
          <>
            <SidebarNavigation.BottomAction to="/messages" color="dark">
              {messages}
            </SidebarNavigation.BottomAction>
            <SidebarNavigation.BottomAction to="/reports" color="dark">
              {reports}
            </SidebarNavigation.BottomAction>
          </>
        }
        topRightAction={
          <SidebarNavigation.Dropdown
            title="User"
            menuType="icon"
            icon={<Icon type="user" className="text-white" />}
            iconColor="light"
            buttonColor="primary"
            popupBackgroundColor="dark"
            buttonVariant="text"
          >
            <SidebarNavigation.Dropdown.Item to="/account" color="dark">
              {account}
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/support" color="dark">
              {support}
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/logout" color="dark">
              {signOut}
            </SidebarNavigation.Dropdown.Item>
          </SidebarNavigation.Dropdown>
        }
        color="dark"
      >
        <SidebarNavigation.Item to="/dashboard" color="dark">
          Dashboard
        </SidebarNavigation.Item>
        <SidebarNavigation.Item
          isExpandable={true}
          title={translations[context.globals.language]["planning"]}
          color="dark"
        >
          <SidebarNavigation.SubItem to="/tasks" icon={<Icon type="clipboard" className="text-white" />} color="dark">
            {tasks}
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/reminders" icon={<Icon type="bell" className="text-white" />} color="dark">
            {reminders}
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/events" icon={<Icon type="money" className="text-white" />} color="dark">
            {events}
          </SidebarNavigation.SubItem>
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/projects" color="dark">
          {projects}
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/calendar" color="dark">
          {calendar}
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/reports" color="dark">
          {reports}
        </SidebarNavigation.Item>
      </SidebarNavigation>
    </Router>
  );
};

export const Light = (args, context) => {
  return (
    <Router>
      <SidebarNavigation
        logo={<img src={logo} alt="logo" />}
        bottomActions={
          <>
            <SidebarNavigation.BottomAction to="/messages" color="light">
              {messages}
            </SidebarNavigation.BottomAction>
            <SidebarNavigation.BottomAction to="/reports" color="light">
              {reports}
            </SidebarNavigation.BottomAction>
          </>
        }
        topRightAction={
          <SidebarNavigation.Dropdown
            title="User"
            menuType="icon"
            icon={<Icon type="user" className="text-black" />}
            iconColor="dark"
            variant="text"
            popupBackgroundColor="light"
            buttonColor="primary"
            buttonVariant="text"
          >
            <SidebarNavigation.Dropdown.Item to="/account" color="light">
              {account}
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/support" color="light">
              {support}
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/logout" color="light">
              {signOut}
            </SidebarNavigation.Dropdown.Item>
          </SidebarNavigation.Dropdown>
        }
        color="light"
      >
        <SidebarNavigation.Item to="/dashboard" color="light">
          {dashboard}
        </SidebarNavigation.Item>
        <SidebarNavigation.Item
          isExpandable={true}
          title={translations[context.globals.language]["planning"]}
          color="light"
        >
          <SidebarNavigation.SubItem
            to="/tasks"
            icon={<Icon type="clipboard" className="text-gray-500" />}
            color="light"
          >
            {tasks}
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem
            to="/reminders"
            icon={<Icon type="bell" className="text-gray-500" />}
            color="light"
          >
            {reminders}
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/events" icon={<Icon type="money" className="text-gray-500" />} color="light">
            {events}
          </SidebarNavigation.SubItem>
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/projects" color="light">
          {projects}
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/calendar" color="light">
          {calendar}
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/reports" color="light">
          {reports}
        </SidebarNavigation.Item>
      </SidebarNavigation>
    </Router>
  );
};

export const WithoutTopRightAction = (args, context) => {
  return (
    <Router>
      <SidebarNavigation
        logo={<img src={logo} alt="logo" />}
        bottomActions={
          <>
            <SidebarNavigation.BottomAction to="/messages">{messages}</SidebarNavigation.BottomAction>
            <SidebarNavigation.BottomAction to="/reports">{reports}</SidebarNavigation.BottomAction>
          </>
        }
      >
        <SidebarNavigation.Item to="/dashboard">{dashboard}</SidebarNavigation.Item>
        <SidebarNavigation.Item isExpandable={true} title={translations[context.globals.language]["planning"]}>
          <SidebarNavigation.SubItem to="/tasks" icon={<Icon type="clipboard" />}>
            {tasks}
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/reminders" icon={<Icon type="bell" />}>
            {reminders}
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/events" icon={<Icon type="money" />}>
            {events}
          </SidebarNavigation.SubItem>
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/projects">{projects}</SidebarNavigation.Item>
        <SidebarNavigation.Item to="/calendar">{calendar}</SidebarNavigation.Item>
        <SidebarNavigation.Item to="/reports">{reports}</SidebarNavigation.Item>
      </SidebarNavigation>
    </Router>
  );
};

const HideControls = {
  logo: { control: { disable: true } },
  bottomActions: { control: { disable: true } },
  topRightAction: { control: { disable: true } },
  children: { control: { disable: true } },
  color: { control: { disable: true } },
  className: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

Default.argTypes = HideControls;
Dark.argTypes = HideControls;
Light.argTypes = HideControls;
WithoutTopRightAction.argTypes = HideControls;
