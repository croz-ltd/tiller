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

import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";

export type NotificationProps = {
  /**
   * An array containing the components to be displayed under the title and description.
   * Most often buttons or hyperlinks.
   */
  actions?: React.ReactNode[];

  /**
   * Custom timeout value, describing how long the notification stays on screen when rendered.
   * Overrides timeout set in Notification Provider component for specific notification.
   * Defaults to 3000 ms (3 seconds).
   */
  timeout?: number;

  /**
   * Defines whether the clear button is shown on the component.
   * Turned on by default.
   */
  closeButton?: boolean;

  /**
   * Optional description of the notification and other possible information (e.g. list) displayed under the title.
   */
  content?: React.ReactNode;

  /**
   * Optional icon located on the left side of the notification text title.
   */
  icon?: React.ReactNode;

  /**
   * Function which, by default, closes the notification on click (if closeButton prop is enabled),
   * An additional optional custom function can be defined here, to execute alongside the process of closing the notification.
   */
  onDismiss?: () => void;

  /**
   * The title displayed accentuated above the optional description.
   */
  title: React.ReactNode;

  /**
   * If on, reduces the padding to give the component a more condensed feel.
   */
  condensed?: boolean;

  dismissIcon?: React.ReactElement;

  /**
   * Custom container (div) className.
   */
  className?: string;
} & NotificationTokensProps;

type NotificationTokensProps = {
  tokens?: ComponentTokens<"Notification">;
};

export default function Notification({
  icon,
  title,
  content,
  actions,
  timeout = 3000,
  closeButton = true,
  condensed,
  onDismiss,
  dismissIcon,
  className,
  ...props
}: NotificationProps) {
  const tokens = useTokens("Notification", props.tokens);

  React.useEffect(() => {
    if (timeout !== undefined) {
      setTimeout(() => {
        if (onDismiss) onDismiss();
      }, timeout);
    }
  }, [timeout, onDismiss]);

  const dismissButtonClassName = cx(tokens.dismiss.Button.master, tokens.dismiss.Button.color);

  const finalDismissIcon = useIcon("dismiss", dismissIcon);

  const dismiss = (
    <button className={dismissButtonClassName} onClick={onDismiss}>
      {finalDismissIcon}
    </button>
  );

  const innerContainerClassName = cx(
    tokens.Container.outer.base,
    { [tokens.Container.outer.regular]: !condensed },
    { [tokens.Container.outer.condensed]: condensed }
  );

  const containerClassName = cx(
    tokens.Container.master,
    tokens.Container.backgroundColor,
    tokens.Container.borderRadius,
    tokens.Container.boxShadow,
    className
  );

  const titleClassName = cx(tokens.title.color, tokens.title.fontSize, tokens.title.fontWeight);

  const contentClassName = cx(tokens.content.color, tokens.content.fontSize, tokens.content.margin);

  const dismissClassName = cx(tokens.dismiss.master, tokens.dismiss.margin);

  return (
    <section className={containerClassName}>
      <div className={innerContainerClassName}>
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="flex-1 ml-3">
          <p className={titleClassName}>{title}</p>
          <div className={contentClassName}>{content}</div>
          {condensed && onDismiss && actions}
          {!condensed && onDismiss && actions && closeButton && <div className={tokens.actions.master}>{actions}</div>}
        </div>
        {closeButton && <div className={dismissClassName}>{dismiss}</div>}
        {!closeButton && (
          <div className={`flex border-l pl-2 ${tokens.actions.borderColor}`}>
            <div className="-ml-px flex flex-col">{actions}</div>
          </div>
        )}
      </div>
    </section>
  );
}
