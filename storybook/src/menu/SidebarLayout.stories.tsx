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

import { BrowserRouter } from "react-router-dom";

import { withDesign } from "storybook-addon-designs";

import { PageHeading } from "@tiller-ds/core";
import { FormContainer } from "@tiller-ds/formik-elements";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { SidebarNavigation, SidebarLayout } from "@tiller-ds/menu";
import { defaultThemeConfig } from "@tiller-ds/theme";

import { Simple } from "../data-display/DataTable.stories";
import { Default } from "../data-display/DescriptionList.stories";
import { SimpleType } from "../form-elements/FormLayout.stories";

import { beautifySource, getChangedTokensFromSource, showFactoryDecorator } from "../utils";

import logo from "./images/sample-logo.svg";

import mdx from "./SidebarLayout.mdx";

export default {
  title: "Component Library/Menu/SidebarLayout",
  component: SidebarLayout,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "auto", excludeDecorators: true },
      transformSource: (source) => {
        const correctedSource = source
          .replace(/SidebarLayoutHeading/g, "SidebarLayout.Heading")
          .replace(/SidebarLayoutContent/g, "SidebarLayout.Content")
          .replace(/SidebarNavigationItem/g, "SidebarNavigation.Item")
          .replace(/SidebarNavigationDropdown/g, "SidebarNavigation.Dropdown")
          .replace(/SidebarNavigation.DropdownItem/g, "SidebarNavigation.Dropdown.Item")
          .replace(/SidebarNavigationBottomAction/g, "SidebarNavigation.BottomAction")
          .replace(/SidebarNavigationSubItem/g, "SidebarNavigation.SubItem")
          .replace(/PageHeadingTitle/g, "PageHeading.Title")
          .replace(/PageHeadingSubtitle/g, "PageHeading.Subtitle");
        return getChangedTokensFromSource(beautifySource(correctedSource, "BrowserRouter"), "SidebarLayout");
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/Tiller?node-id=9410%3A12380",
    },
    decorators: [withDesign],
  },
  argTypes: {
    pageTitle: { name: "Page Title", control: "text" },
    pageSubtitle: { name: "Page Subtitle", control: "text" },
    pageContent: {
      name: "Page Content",
      control: { type: "select", options: ["Data Table", "Description List", "Form Layout", "Placeholder"] },
    },
    pageContent2: {
      name: "Page Content 2",
      control: { type: "select", options: ["Data Table", "Description List", "Form Layout", "Placeholder"] },
    },
    className: { name: "Class Name", control: "text" },
    useTokens: { name: "Use Tokens", control: "boolean" },
    tokens: { name: "Tokens", control: "object" },
    children: { control: false },
    navigation: { control: false },
  },
};

function getPageContent(pageContent: string) {
  if (pageContent === "Data Table") {
    return (
      <>
        <Simple />
        <a
          className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
          href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-data-display-datatable--simple#simple"
          target="_blank"
          rel="noreferrer"
        >
          See Data Table Story Code
        </a>
      </>
    );
  }
  if (pageContent === "Description List") {
    return (
      <>
        <Default />
        <a
          className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
          href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-data-display-descriptionlist--default#default"
          target="_blank"
          rel="noreferrer"
        >
          See Description List Story Code
        </a>
      </>
    );
  }
  if (pageContent === "Form Layout") {
    return (
      <FormContainer initialValues={{}} onSubmit={() => {}}>
        <div>
          <SimpleType />
          <a
            className="flex w-full text-sm justify-center text-primary-dark hover:text-primary p-2"
            href="https://croz-ltd.github.io/tiller/?path=/docs/component-library-core-formlayout--simple-type#simple-type"
            target="_blank"
            rel="noreferrer"
          >
            See Form Layout Story Code
          </a>
        </div>
      </FormContainer>
    );
  }
  return <Placeholder className="h-48" />;
}

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

const defaultNavigation = (
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
    <SidebarNavigation.Item isExpandable={true} title="Planning">
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

export const SidebarLayoutFactory = ({ pageTitle, pageSubtitle, pageContent, pageContent2, className, useTokens, tokens }) => {
  return (
    <BrowserRouter>
      <SidebarLayout navigation={defaultNavigation} tokens={useTokens && tokens} className={className}>
        <SidebarLayout.Heading>
          <PageHeading>
            <PageHeading.Title>{pageTitle}</PageHeading.Title>
            <PageHeading.Subtitle>{pageSubtitle}</PageHeading.Subtitle>
          </PageHeading>
        </SidebarLayout.Heading>
        <SidebarLayout.Content>
          <div className="flex flex-col space-y-4">
            {getPageContent(pageContent)}
            {getPageContent(pageContent2)}
          </div>
        </SidebarLayout.Content>
      </SidebarLayout>
    </BrowserRouter>
  );
};

SidebarLayoutFactory.args = {
  pageTitle: "Title",
  pageSubtitle: "Subtitle",
  pageContent: "Placeholder",
  pageContent2: "Placeholder",
  className: "",
  useTokens: false,
  tokens: defaultThemeConfig.component["SidebarLayout"],
};

SidebarLayoutFactory.parameters = {
  controls: {
    expanded: false,
  },
};

SidebarLayoutFactory.decorators = showFactoryDecorator();

export const Example = () => {
  // incl-code
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
      <SidebarNavigation.Item isExpandable={true} title="Planning">
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
    <BrowserRouter>
      <SidebarLayout navigation={navigation}>
        <SidebarLayout.Heading>{pageHeading}</SidebarLayout.Heading>
        <SidebarLayout.Content>
          <Placeholder className="h-48" />
        </SidebarLayout.Content>
      </SidebarLayout>
    </BrowserRouter>
  );
};

const HideControls = {
  children: { control: { disable: true } },
  navigation: { control: { disable: true } },
  className: { control: { disable: true } },
  pageTitle: { control: { disable: true } },
  pageSubtitle: { control: { disable: true } },
  pageContent: { control: { disable: true } },
  pageContent2: { control: { disable: true } },
  useTokens: { control: { disable: true } },
  tokens: { control: { disable: true } },
};

Example.argTypes = HideControls;
