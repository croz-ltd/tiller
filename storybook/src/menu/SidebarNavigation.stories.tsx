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

import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";
import { SidebarNavigation } from "@tiller-ds/menu";

import logo from "./images/sample-logo.svg";
import mdx from "./SidebarNavigation.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Menu/SidebarNavigation",
  component: SidebarNavigation,
  parameters: {
    docs: {
      page: mdx,
      source: { type: "code", excludeDecorators: true },
      transformSource: (source) => beautifySource(source, "BrowserRouter"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=9410%3A12380",
    },
    decorators: [withDesign],
  },
};

export const Default = () => {
  return (
    <BrowserRouter>
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
            popupBackgroundColor="default"
            iconColor="default"
            buttonColor="primary"
            buttonVariant="text"
          >
            <SidebarNavigation.Dropdown.Item to="/account">
              <Intl name="account" />
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/support" color="default">
              <Intl name="support" />
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/logout" color="default">
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
    </BrowserRouter>
  );
};

export const Dark = () => {
  return (
    <BrowserRouter>
      <SidebarNavigation
        logo={<img src={logo} alt="logo" />}
        bottomActions={
          <>
            <SidebarNavigation.BottomAction to="/messages" color="dark">
              <Intl name="messages" />
            </SidebarNavigation.BottomAction>
            <SidebarNavigation.BottomAction to="/reports" color="dark">
              <Intl name="reports" />
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
              <Intl name="account" />
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/support" color="dark">
              <Intl name="support" />
            </SidebarNavigation.Dropdown.Item>
            <SidebarNavigation.Dropdown.Item to="/logout" color="dark">
              <Intl name="signOut" />
            </SidebarNavigation.Dropdown.Item>
          </SidebarNavigation.Dropdown>
        }
        color="dark"
      >
        <SidebarNavigation.Item to="/dashboard" color="dark">
          <Intl name="dashboard" />
        </SidebarNavigation.Item>
        <SidebarNavigation.Item isExpandable={true} title="Planning" color="dark">
          <SidebarNavigation.SubItem to="/tasks" icon={<Icon type="clipboard" className="text-white" />} color="dark">
            <Intl name="tasks" />
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/reminders" icon={<Icon type="bell" className="text-white" />} color="dark">
            <Intl name="reminders" />
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/events" icon={<Icon type="money" className="text-white" />} color="dark">
            <Intl name="events" />
          </SidebarNavigation.SubItem>
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/projects" color="dark">
          <Intl name="projects" />
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/calendar" color="dark">
          <Intl name="calendar" />
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/reports" color="dark">
          <Intl name="reports" />
        </SidebarNavigation.Item>
      </SidebarNavigation>
    </BrowserRouter>
  );
};

export const Light = () => {
  return (
    <BrowserRouter>
      <SidebarNavigation
        logo={<img src={logo} alt="logo" />}
        bottomActions={
          <>
            <SidebarNavigation.BottomAction to="/messages" color="light">
              <Intl name="messages" />
            </SidebarNavigation.BottomAction>
            <SidebarNavigation.BottomAction to="/reports" color="light">
              <Intl name="reports" />
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
        color="light"
      >
        <SidebarNavigation.Item to="/dashboard" color="light">
          <Intl name="dashboard" />
        </SidebarNavigation.Item>
        <SidebarNavigation.Item isExpandable={true} title="Planning" color="light">
          <SidebarNavigation.SubItem to="/tasks" icon={<Icon type="clipboard" className="text-gray-500" />} color="light">
            <Intl name="tasks" />
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/reminders" icon={<Icon type="bell" className="text-gray-500" />} color="light">
            <Intl name="reminders" />
          </SidebarNavigation.SubItem>
          <SidebarNavigation.SubItem to="/events" icon={<Icon type="money" className="text-gray-500" />} color="light">
            <Intl name="events" />
          </SidebarNavigation.SubItem>
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/projects" color="light">
          <Intl name="projects" />
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/calendar" color="light">
          <Intl name="calendar" />
        </SidebarNavigation.Item>
        <SidebarNavigation.Item to="/reports" color="light">
          <Intl name="reports" />
        </SidebarNavigation.Item>
      </SidebarNavigation>
    </BrowserRouter>
  );
};

export const WithoutTopRightAction = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
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
