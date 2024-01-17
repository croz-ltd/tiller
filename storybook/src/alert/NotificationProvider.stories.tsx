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

import { NotificationProvider, useNotificationContext, NotificationProps } from "@tiller-ds/alert";
import { Button, Link } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";

import mdx from "./NotificationProvider.mdx";
import { beautifySource } from "../utils";

export default {
  title: "Component Library/Alert/NotificationProvider",
  component: NotificationProvider,
  parameters: {
    docs: {
      page: mdx,
      transformSource: (source) => beautifySource(source, "div"),
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/nhiVbURxzFkse4bGiDFuya/?node-id=8944%3A11636",
    },
    decorators: [withDesign],
  },
  argTypes: {
    timeout: { control: false },
    position: { control: false },
    children: { control: false },
  },
};

function Content() {
  const notifications = useNotificationContext();

  const simple: NotificationProps = {
    title: "Simple",
  };

  const withSubtitle: NotificationProps = {
    title: "Simple",
    content: "Subtitle",
  };

  const withIcon: NotificationProps = {
    title: "Simple",
    content: "Subtitle",
    icon: <Icon type="check-circle" size={6} variant="fill" className="text-emerald-500" />,
  };

  const withActionsBelow: NotificationProps = {
    title: "With Actions Below",
    content: "Anyone with a link can now view this file.",
    icon: <Icon type="check-circle" size={6} variant="fill" className="text-emerald-500" />,
    actions: [<Link key={0}>Undo</Link>, <Link key={1}>Dismiss</Link>],
    onDismiss: () => {},
  };

  const withButtonsBelow: NotificationProps = {
    title: "With Buttons Below",
    content: "Anyone with a link can now view this file.",
    icon: <Icon type="check-circle" size={6} variant="fill" className="text-emerald-500" />,
    actions: [
      <Button key={1} variant="filled">
        Accept
      </Button>,
      <Button key={0} variant="text">
        Dismiss
      </Button>,
    ],
    onDismiss: () => {},
  };

  const withActionsRight: NotificationProps = {
    title: "With Actions Right",
    content: "Anyone with a link can now view this file.",
    icon: <Icon type="check-circle" size={6} variant="fill" className="text-emerald-500" />,
    closeButton: false,
    actions: [<Link key={0}>Reply</Link>],
    onDismiss: () => {},
  };

  return (
    <div className="flex flex-col w-1/4 space-y-2">
      <Button onClick={() => notifications.push(simple)}>Simple</Button>
      <Button onClick={() => notifications.push(withSubtitle)}>With Subtitle</Button>
      <Button onClick={() => notifications.push(withIcon)}>With Icon</Button>
      <Button onClick={() => notifications.push(withActionsBelow)}>With Actions Below</Button>
      <Button onClick={() => notifications.push(withButtonsBelow)}>With Buttons Below</Button>
      <Button onClick={() => notifications.push(withActionsRight)}>With Actions Right</Button>
    </div>
  );
}

export const Example = (args) => {
  return (
    <NotificationProvider>
      <Content />
    </NotificationProvider>
  );
};
function Notification({ label }) {
  const notifications = useNotificationContext();

  const withIcon: NotificationProps = {
    title: "Simple",
    content: "Subtitle",
    icon: <Icon type="check-circle" size={6} variant="fill" className="text-emerald-500" />,
  };

  return <Button onClick={() => notifications.push(withIcon)}>{label}</Button>;
}

export const DifferentPositions = () => (
  <div className="flex flex-col w-1/4 space-y-2">
    <NotificationProvider>
      <Notification label="Top Right" />
    </NotificationProvider>
    <NotificationProvider position="topLeft">
      <Notification label="Top Left" />
    </NotificationProvider>
    <NotificationProvider position="topCenter">
      <Notification label="Top Center" />
    </NotificationProvider>
    <NotificationProvider position="bottomLeft">
      <Notification label="Bottom Left" />
    </NotificationProvider>
    <NotificationProvider position="bottomCenter">
      <Notification label="Bottom Center" />
    </NotificationProvider>
    <NotificationProvider position="bottomRight">
      <Notification label="Bottom Right" />
    </NotificationProvider>
  </div>
);
