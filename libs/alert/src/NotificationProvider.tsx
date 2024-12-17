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

import { without } from "lodash";

import { createNamedContext } from "@tiller-ds/util";

import Notification from "./Notification";
import NotificationContainer from "./NotificationContainer";
import { NotificationPosition } from "./NotificationPositionType";
import { InternalNotificationProps } from "./index";

type NotificationProviderProps = {
  /**
   * Custom timeout value, describing how long the notification stays on screen when rendered.
   * Defaults to 3000 ms (3 seconds).
   */
  timeout?: number;

  /**
   * Position value, describing where Notification is shown on screen when rendered.
   * Default is in top right corner.
   */
  position?: NotificationPosition;

  /**
   * Children represent parts of the website that can be affected by the provider.
   * Most common use case: the component embraces all website routes inside an App component.
   */
  children: React.ReactNode;
};

export type NotificationProps = InternalNotificationProps;

type NotificationContext = {
  notifications: NotificationProps[];

  push: (notification: NotificationProps) => void;

  dismiss: (notification: NotificationProps) => void;
};

const NotificationContext = createNamedContext<NotificationContext>("NotificationContext");

function useNotifications(): NotificationContext {
  const [notifications, setNotifications] = React.useState<NotificationProps[]>([]);

  const push = (notification: NotificationProps) => {
    // CHECK WHY THERE IS ONLY ONE NOTIFICATION ALWAYS
    setNotifications([notification]);
  };

  const dismiss = (notification: NotificationProps) => {
    setNotifications((current) => {
      const internalNotification = notifications.find((item) => item === notification);

      return internalNotification ? without(current, internalNotification) : current;
    });
  };

  return { notifications, push, dismiss };
}

export function useNotificationContext() {
  const context = React.useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotificationContext must be used within a NotificationProvider");
  }

  return context;
}

export default function NotificationProvider({
  timeout = 3000,
  position = "topRight",
  children,
  ...props
}: NotificationProviderProps) {
  const notifications = useNotifications();

  const handleDismiss = (notification: NotificationProps) => {
    notifications.dismiss(notification);
    if (notification.onDismiss) {
      notification.onDismiss();
    }
  };

  return (
    <>
      <NotificationContainer position={position} {...props}>
        {notifications.notifications.map((notification, key) => (
          <Notification
            key={key}
            {...notification}
            timeout={notification.timeout || timeout}
            onDismiss={() => handleDismiss(notification)}
          />
        ))}
      </NotificationContainer>
      <NotificationContext.Provider value={notifications}>{children}</NotificationContext.Provider>
    </>
  );
}
