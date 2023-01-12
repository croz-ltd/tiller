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

import { PageHeading } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { SidebarNavigation, SidebarLayout } from "@tiller-ds/menu";

import storybookDictionary from "../intl/storybookDictionary";

import logo from "./images/sample-logo.svg";
import mdx from "./SidebarLayout.mdx";

export default {
  title: "Component Library/Menu/SidebarLayout",
  component: SidebarLayout,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/Tiller?node-id=9410%3A12380",
    },
    decorators: [withDesign],
  },
};

const translations = storybookDictionary.translations;

const Placeholder = ({ className }: { className: string }) => (
  <svg
    className={`border-2 border-dashed border-gray-300 rounded bg-white w-full ${className} text-gray-200`}
    preserveAspectRatio="none"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 200 200"
  >
    <path vectorEffect="non-scaling-stroke" strokeWidth="2" d="M0 0l200 200M0 200L200 0" />
  </svg>
);

export const Example = (args, context) => {
  const navigation = (
    <SidebarNavigation
      logo={<img src={logo} alt="logo" />}
      bottomActions={
        <>
          <SidebarNavigation.BottomAction to="/messages">
            <Intl name="messages" />
          </SidebarNavigation.BottomAction>
          <SidebarNavigation.BottomAction to="/reports">
            <Intl name="reports" />
          </SidebarNavigation.BottomAction>
        </>
      }
      topRightAction={
        <SidebarNavigation.Dropdown
          title="User"
          menuType="icon"
          icon={<Icon type="user" className="text-white" />}
          popupBackgroundColor="light"
          iconColor="default"
          buttonColor="primary"
          buttonVariant="text"
        >
          <SidebarNavigation.Dropdown.Item to="/account" color="light">
            <Intl name="account" />
          </SidebarNavigation.Dropdown.Item>
          <SidebarNavigation.Dropdown.Item to="/support" color="light">
            <Intl name="support" />
          </SidebarNavigation.Dropdown.Item>
          <SidebarNavigation.Dropdown.Item to="/logout" color="light">
            <Intl name="signOut" />
          </SidebarNavigation.Dropdown.Item>
        </SidebarNavigation.Dropdown>
      }
    >
      <SidebarNavigation.Item to="/dashboard">
        <Intl name="dashboard" />
      </SidebarNavigation.Item>
      <SidebarNavigation.Item isExpandable={true} title={translations[context.globals.language]["planning"]}>
        <SidebarNavigation.SubItem to="/tasks" icon={<Icon type="clipboard" />}>
          <Intl name="tasks" />
        </SidebarNavigation.SubItem>
        <SidebarNavigation.SubItem to="/reminders" icon={<Icon type="bell" />}>
          <Intl name="reminders" />
        </SidebarNavigation.SubItem>
        <SidebarNavigation.SubItem to="/events" icon={<Icon type="money" />}>
          <Intl name="events" />
        </SidebarNavigation.SubItem>
      </SidebarNavigation.Item>
      <SidebarNavigation.Item to="/projects">
        <Intl name="projects" />
      </SidebarNavigation.Item>
      <SidebarNavigation.Item to="/calendar">
        <Intl name="calendar" />
      </SidebarNavigation.Item>
      <SidebarNavigation.Item to="/reports">
        <Intl name="reports" />
      </SidebarNavigation.Item>
    </SidebarNavigation>
  );

  const pageHeading = (
    <PageHeading>
      <PageHeading.Title>
        <Intl name="title" />
      </PageHeading.Title>
    </PageHeading>
  );

  return (
    <Router>
      <SidebarLayout navigation={navigation}>
        <SidebarLayout.Heading>{pageHeading}</SidebarLayout.Heading>
        <SidebarLayout.Content>
          <Placeholder className="h-48" />
        </SidebarLayout.Content>
      </SidebarLayout>
    </Router>
  );
};
