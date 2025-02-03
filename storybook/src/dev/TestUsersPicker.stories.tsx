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

import { TestUsersPickerContent } from "@tiller-ds/dev";

import mdx from "./TestUsersPicker.mdx";

export default {
  title: "Component Library/Dev/TestUsersPicker",
  component: TestUsersPickerContent,
  parameters: {
    docs: {
      page: mdx,
    },
    previewTabs: {
      "storybook/playroom/panel": {
        hidden: true,
      },
    },
    playroom: {
      disable: true,
    },
    viewMode: "docs",
  },
};

const defaultState = {
  users: [{ username: "test1" }, { username: "test2" }, { username: "test3" }],
  onChoose: () => {},
};

export const DefaultState = (args) => <TestUsersPickerContent {...defaultState} />;

export const WithChosenUser = (args) => <TestUsersPickerContent {...defaultState} chosenUsername="test2" />;
