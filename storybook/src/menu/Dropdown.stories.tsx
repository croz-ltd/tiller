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

import { Dropdown } from "@tiller-ds/menu";

import mdx from "./Dropdown.mdx";

export default {
  title: "Component Library/Menu/Dropdown",
  component: Dropdown,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/Tiller?node-id=9129%3A11943",
    },
    decorators: [withDesign],
  },
};

export const Simple = () => (
  <Dropdown>
    <Dropdown.Button>Menu</Dropdown.Button>
    <Dropdown.Menu>
      <Dropdown.Item onSelect={action("onSelect-account-settings")}>Account settings</Dropdown.Item>
      <Dropdown.Item onSelect={action("onSelect-support")}>Support</Dropdown.Item>
      <Dropdown.Item onSelect={action("onSelect-sign-out")}>Sign Out</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);
