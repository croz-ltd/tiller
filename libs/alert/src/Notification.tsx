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

import { ComponentTokens, cx, IconProps, useIcon, useTokens } from "@tiller-ds/theme";

type NotificationColor = "info" | "danger" | "warning" | "success";

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
   * An optional icon displayed on the left side of the notification text title.
   *
   * If provided, this will override the `type` property and its default icon mapping for `mainIcon`.
   */
  icon?: React.ReactNode;

  /**
   * Callback function triggered when the notification is dismissed.
   *
   * By default, this function closes the notification when the `closeButton` prop is enabled.
   * You can define a custom function here to execute additional logic alongside the default dismissal behavior.
   */
  onDismiss?: () => void;

  /**
   * The title displayed accentuated above the optional description.
   */
  title: React.ReactNode;

  /**
   * Provides default styling sets for the notification with icon and color presets.
   */
  type?: NotificationColor;

  /**
   * Disables the default background accent style provided by the `type` prop.
   *
   * This has no effect if the `type` property is not specified.
   */
  disableAccent?: boolean;

  /**
   * Allows customization of the provided default styling (via `type` prop) for the main and dismiss icons.
   *
   * - `mainIcon`: Overrides styling for the primary icon, but is ignored if the `type` property is not defined.
   * - `dismissIcon`: Overrides styling for the dismiss icon, but is ignored if the `type` property is not defined or if the `closeButton` prop is set to `true`.
   *
   * Accepts partial styling configurations.
   */
  iconProps?: {
    mainIcon?: Partial<IconProps>;
    dismissIcon?: Partial<IconProps>;
  };

  /**
   * If on, reduces the padding to give the component a more condensed feel.
   */
  condensed?: boolean;

  /**
   * Optional icon displayed on the right side of the notification title, used for closing the notification.
   *
   * - Overrides the default icon mapped by the `type` property for `dismissIcon` when provided.
   * - Ignored if the `closeButton` prop is set to `true`.
   *
   */
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
  type,
  disableAccent,
  iconProps,
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

  const dismissIconProps: Partial<IconProps> = {
    className: iconProps?.dismissIcon?.className,
    size: iconProps?.dismissIcon?.size ?? 3,
    variant: iconProps?.dismissIcon?.variant,
  };

  const mainIconProps: Partial<IconProps> = {
    className: iconProps?.mainIcon?.className ?? tokens.icon.type[type ?? "info"],
    size: iconProps?.mainIcon?.size ?? 6,
    variant: iconProps?.mainIcon?.variant ?? "fill",
  };

  const finalDismissIcon = useIcon("dismiss", dismissIcon, dismissIconProps);
  const finalMainIcon = useIcon(type ?? "info", icon as React.ReactElement, mainIconProps);

  const dismiss = (
    <button className={dismissButtonClassName} onClick={onDismiss}>
      {finalDismissIcon}
    </button>
  );

  const innerContainerClassName = cx(
    tokens.Container.outer.base,
    { [tokens.Container.outer.regular]: !condensed },
    { [tokens.Container.outer.condensed]: condensed },
  );

  const containerClassName = cx(
    tokens.Container.master,
    { [tokens.Container.backgroundColor[String(type)]]: type && !disableAccent },
    { [tokens.Container.backgroundColor.default]: !type || disableAccent },
    tokens.Container.backgroundColor,
    tokens.Container.borderRadius,
    tokens.Container.boxShadow,
    className,
  );

  const titleClassName = cx(tokens.title.color, tokens.title.fontSize, tokens.title.fontWeight);

  const contentClassName = cx(tokens.content.color, tokens.content.fontSize, tokens.content.margin);

  const dismissClassName = cx(tokens.dismiss.master, tokens.dismiss.margin);

  return (
    <section className={containerClassName}>
      <div className={innerContainerClassName}>
        {(icon || type) && <div className={tokens.icon.master}>{type ? finalMainIcon : icon}</div>}
        <div className={tokens.Container.content}>
          <p className={titleClassName}>{title}</p>
          <div className={contentClassName}>{content}</div>
          {condensed && onDismiss && actions}
          {!condensed && onDismiss && actions && closeButton && <div className={tokens.actions.master}>{actions}</div>}
        </div>
        {closeButton && <div className={dismissClassName}>{dismiss}</div>}
        {!closeButton && (
          <div className={`${tokens.actions.noCloseButton.container} ${tokens.actions.borderColor}`}>
            <div className={tokens.actions.noCloseButton.innerContainer}>{actions}</div>
          </div>
        )}
      </div>
    </section>
  );
}
