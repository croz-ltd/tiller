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

import { Notification } from "@tiller-ds/alert";
import { Button, Link } from "@tiller-ds/core";
import { Icon } from "@tiller-ds/icons";
import { Intl } from "@tiller-ds/intl";

import mdx from "./Notification.mdx";

export default {
  title: "Component Library/Alert/Notification",
  component: Notification,
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/QVaavJ0ZFn1AOsBnTjr7F1/Tiller-Design-System---UI-KIT?node-id=8944%3A11636",
    },
    decorators: [withDesign],
  },
};

const onDismiss = action("onDismiss");

export const Simple = () => (
  <Notification
    icon={<Icon type="check-circle" size={6} variant="fill" className="text-emerald-500" />}
    title={<Intl name="notificationTitle" />}
    content={<Intl name="notificationContent" />}
    onDismiss={onDismiss}
  />
);

export const WithActionsBelow = () => (
  <Notification
    icon={<Icon type="check-circle" size={6} variant="fill" className="text-green-400" />}
    title={<Intl name={"notificationTitle"} />}
    content={<Intl name="notificationContent" />}
    actions={[
      <Link key={1}>
        <Intl name="dismiss" />
      </Link>,
      <Link key={0}>
        <Intl name="undo" />
      </Link>,
    ]}
    onDismiss={onDismiss}
  />
);

export const WithButtonsBelow = () => (
  <Notification
    icon={<Icon type="check-circle" size={6} variant="fill" className="text-emerald-500" />}
    title={<Intl name="notificationTitle" />}
    content={<Intl name="notificationContent" />}
    actions={[
      <Button key={1} variant="outlined">
        <Intl name="dismiss" />
      </Button>,
      <Button key={0} variant="filled">
        <Intl name="undo" />
      </Button>,
    ]}
    onDismiss={onDismiss}
  />
);

export const WithError = () => (
  <Notification
    icon={<Icon type="warning-circle" size={6} variant="fill" className="text-red-400" />}
    title={<Intl name="notificationTitle" />}
    content={<Intl name="notificationContent" />}
    actions={[
      <Link variant="danger" key={0}>
        <Intl name="errorLog" />
      </Link>,
    ]}
    onDismiss={onDismiss}
  />
);

export const WithActionsRight = () => (
  <Notification
    icon={<Icon type="check-circle" size={6} variant="fill" className="text-emerald-500" />}
    title={<Intl name={"notificationTitle"} />}
    content={<Intl name="notificationContent" />}
    closeButton={false}
    actions={[
      <Link key={0}>
        <Intl name="reply" />
      </Link>,
    ]}
  />
);
