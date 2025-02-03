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

import React from "react";

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";

import { NotificationPosition } from "./NotificationPositionType";
import { tillerTwMerge } from "@tiller-ds/util";

export type NotificationContainerProps = {
  /**
   * Position where notifications will be shown
   */
  position?: NotificationPosition;

  /**
   * Container content, usually just Notifications
   */
  children: React.ReactNode;

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;
} & NotificationContainerTokensProps;

type NotificationContainerTokensProps = {
  tokens?: ComponentTokens<"NotificationProvider">;
};

export default function NotificationContainer({
  position = "topRight",
  children,
  className,
  ...props
}: NotificationContainerProps) {
  const tokens = useTokens("NotificationProvider", props.tokens);

  const containerClassName = cx(
    className,
    tokens.Container.master,
    tokens.Container.padding,
    tokens.Container.position[position],
  );

  return (
    <div className={tillerTwMerge(containerClassName, className)} {...props}>
      <div className={tokens.Container.inner}>{children}</div>
    </div>
  );
}
