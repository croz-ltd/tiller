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

import { BrowserRouter as Router } from "react-router-dom";

import { withDesign } from "storybook-addon-designs";

import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { TopNavigation } from "@tiller-ds/menu";

import storybookDictionary from "../intl/storybookDictionary";

import logo from "./images/sample-logo.svg";
import mdx from "./TopNavigation.mdx";

export default {
  title: "Component Library/Menu/TopNavigation",
  component: TopNavigation,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "dynamic", excludeDecorators: true },
      transformSource: (source) => {
        return source
          .replace(/TopNavigationNavigation/g, "TopNavigation.Navigation")
          .replace(/TopNavigationDropdown/g, "TopNavigation.Dropdown")
          .replace(/function noRefCheck\(\)\s\{\}/g, "() => {}");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9127%3A11867",
    },
    decorators: [withDesign],
  },
};

const translations = storybookDictionary.translations;
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
const dashboardLink = "/dashboard";
const teamLink = "/team";
const projectsLink = "/projects";
const calendarLink = "/calendar";
const tasksLink = "/tasks";
const remindersLink = "/reminders";
const eventsLink = "/events";

export const Default = (args, context) => (
  <Router>
    <TopNavigation
      logo={<img src={logo} alt="logo" />}
      topRightAction={
        <TopNavigation.Dropdown
          title="User"
          menuType="icon"
          icon={<Icon type="user" className="text-primary-200 hover:text-primary-800" />}
          popupBackgroundColor="default"
          iconColor="default"
          buttonColor="primary"
          buttonVariant="text"
        >
          <TopNavigation.Dropdown.Item to="/account">{account}</TopNavigation.Dropdown.Item>
          <TopNavigation.Dropdown.Item to="/support">{support}</TopNavigation.Dropdown.Item>
          <TopNavigation.Dropdown.Item to="/logout">{signOut}</TopNavigation.Dropdown.Item>
        </TopNavigation.Dropdown>
      }
    >
      <TopNavigation.Navigation>
        <TopNavigation.Navigation.Item to={dashboardLink}>{dashboard}</TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={teamLink}>{team}</TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={projectsLink}>{projects}</TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={calendarLink}>{calendar}</TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item isExpandable={true} title={translations[context.globals.language]["planning"]}>
          <TopNavigation.Navigation.SubItem to={tasksLink} icon={<Icon type="clipboard" />} onSelect={() => {}}>
            {tasks}
          </TopNavigation.Navigation.SubItem>
          <TopNavigation.Navigation.SubItem to={remindersLink} onSelect={() => {}}>
            {reminders}
          </TopNavigation.Navigation.SubItem>
          <TopNavigation.Navigation.SubItem to={eventsLink} onSelect={() => {}}>
            {events}
          </TopNavigation.Navigation.SubItem>
        </TopNavigation.Navigation.Item>
      </TopNavigation.Navigation>
    </TopNavigation>
  </Router>
);

export const Dark = (args, context) => (
  <Router>
    <TopNavigation
      logo={<img src={logo} alt="logo" />}
      color="dark"
      topRightAction={
        <TopNavigation.Dropdown
          title="User"
          menuType="icon"
          icon={<Icon type="user" className="text-white hover:text-slate-800" />}
          iconColor="light"
          buttonColor="primary"
          popupBackgroundColor="dark"
          buttonVariant="text"
        >
          <TopNavigation.Dropdown.Item to="/account" color="dark">
            {account}
          </TopNavigation.Dropdown.Item>
          <TopNavigation.Dropdown.Item to="/support" color="dark">
            {support}
          </TopNavigation.Dropdown.Item>
          <TopNavigation.Dropdown.Item to="/logout" color="dark">
            {signOut}
          </TopNavigation.Dropdown.Item>
        </TopNavigation.Dropdown>
      }
    >
      <TopNavigation.Navigation>
        <TopNavigation.Navigation.Item to={dashboardLink} color="dark">
          {dashboard}
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={teamLink} color="dark">
          {team}
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={projectsLink} color="dark">
          {projects}
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={calendarLink} color="dark">
          {calendar}
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item
          isExpandable={true}
          title={translations[context.globals.language]["planning"]}
          color="dark"
        >
          <TopNavigation.Navigation.SubItem to={tasksLink} icon={<Icon type="clipboard" />} onSelect={() => {}} color="dark">
            {tasks}
          </TopNavigation.Navigation.SubItem>
          <TopNavigation.Navigation.SubItem to={remindersLink} onSelect={() => {}} color="dark">
            {reminders}
          </TopNavigation.Navigation.SubItem>
          <TopNavigation.Navigation.SubItem to={eventsLink} onSelect={() => {}} color="dark">
            {events}
          </TopNavigation.Navigation.SubItem>
        </TopNavigation.Navigation.Item>
      </TopNavigation.Navigation>
    </TopNavigation>
  </Router>
);

export const Light = (args, context) => (
  <Router>
    <TopNavigation
      logo={<img src={logo} alt="logo" />}
      color="light"
      topRightAction={
        <TopNavigation.Dropdown
          title="User"
          menuType="icon"
          icon={<Icon type="user" className="text-slate-900 hover:text-slate-600" />}
          iconColor="dark"
          variant="text"
          popupBackgroundColor="light"
          buttonColor="primary"
          buttonVariant="text"
        >
          <TopNavigation.Dropdown.Item to="/account" color="light">
            {account}
          </TopNavigation.Dropdown.Item>
          <TopNavigation.Dropdown.Item to="/support" color="light">
            {support}
          </TopNavigation.Dropdown.Item>
          <TopNavigation.Dropdown.Item to="/logout" color="light">
            {signOut}
          </TopNavigation.Dropdown.Item>
        </TopNavigation.Dropdown>
      }
    >
      <TopNavigation.Navigation>
        <TopNavigation.Navigation.Item to={dashboardLink} color="light">
          {dashboard}
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={teamLink} color="light">
          {team}
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={projectsLink} color="light">
          {projects}
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item to={calendarLink} color="light">
          {calendar}
        </TopNavigation.Navigation.Item>
        <TopNavigation.Navigation.Item
          isExpandable={true}
          title={translations[context.globals.language]["planning"]}
          color="light"
        >
          <TopNavigation.Navigation.SubItem to={tasksLink} icon={<Icon type="clipboard" />} onSelect={() => {}} color="light">
            {tasks}
          </TopNavigation.Navigation.SubItem>
          <TopNavigation.Navigation.SubItem to={remindersLink} onSelect={() => {}} color="light">
            {reminders}
          </TopNavigation.Navigation.SubItem>
          <TopNavigation.Navigation.SubItem to={eventsLink} onSelect={() => {}} color="light">
            {events}
          </TopNavigation.Navigation.SubItem>
        </TopNavigation.Navigation.Item>
      </TopNavigation.Navigation>
    </TopNavigation>
  </Router>
);
