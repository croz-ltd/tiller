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

import { FetchDebugContent } from "@tiller-ds/dev";

import mdx from "./FetchDebug.mdx";

export default {
  title: "Component Library/Dev/FetchDebug",
  component: FetchDebugContent,
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

const emptyState = {
  paused: false,
  latency: 1500,
  waiting: [],
  active: [],
  history: [],
  subscribers: [],
  currentTokens: {},
  requestBuilderHelpers: [],
};

const withWaiting = {
  ...emptyState,
  waiting: [
    {
      request: new Request("/test"),
      resolve: () => {
        // empty
      },
    },
  ],
};

const withActive = () => ({
  ...emptyState,
  active: [
    {
      url: "/test",
      startTime: new Date().getTime(),
      finishTime: new Date().getTime() + 10000,
    },
  ],
});

const withHistory = () => ({
  ...emptyState,
  history: [
    {
      url: "/test",
      startTime: new Date().getTime() - 10000,
      finishTime: new Date().getTime(),
    },
  ],
});

export const Empty = () => <FetchDebugContent state={emptyState} />;

export const WithWaiting = () => <FetchDebugContent state={withWaiting} />;

export const WithActive = () => <FetchDebugContent state={withActive()} />;

export const WithHistory = () => <FetchDebugContent state={withHistory()} />;
