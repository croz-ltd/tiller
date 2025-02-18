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

import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";

import Link, { LinkProps } from "./Link";
import Tooltip, { TooltipProps } from "./Tooltip";
import { tillerTwMerge } from "@tiller-ds/util";

export type IconButtonProps = {
  /**
   * Main icon of the button
   */
  icon: React.ReactElement;

  /**
   * Custom additional styling applied to the button
   */
  buttonClassName?: string;

  /**
   * Disables the component.
   */
  disabled?: boolean;

  /**
   * Unique identifier passed onto the component.
   * Assigned as 'data-testid' attribute if 'data-testid' prop is not defined.
   */
  id?: string;

  /**
   * Label of the tooltip displayed when hovering over the icon button (not exclusively text).
   */
  label?: React.ReactNode;

  /**
   * Name for the anchor element (<a>) nested inside IconButton.
   */
  name?: string;

  /**
   * Custom function executed when the component is clicked.
   */
  onClick?: (() => void) | React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Color shade of icon. Ex. 400, 600, etc.
   */
  shade?: string;

  /**
   * Determines whether the tooltip is shown when hovering over the icon button.
   * On by default.
   */
  showTooltip?: boolean;
} & Omit<TooltipProps, "children" | "label"> &
  Omit<LinkProps, "children" | "onClick" | "variant"> &
  IconButtonTokensProps;

type IconButtonTokensProps = {
  tokens?: ComponentTokens<"IconButton">;
};

type WithLinkProps = {
  buttonClass: string;
  children: React.ReactNode;
  id?: string;
  onClick?: (() => void) | React.MouseEventHandler<HTMLButtonElement>;
  shouldWrap: boolean;
  "data-testid"?: string;
};

function WithLink({ children, shouldWrap, onClick, buttonClass, ...props }: WithLinkProps) {
  return shouldWrap && onClick ? (
    <button {...props} className={buttonClass} onClick={onClick} type="button">
      <Link>{children}</Link>
    </button>
  ) : shouldWrap ? (
    <Link {...props} className={buttonClass}>
      {children}
    </Link>
  ) : (
    <button {...props} className={buttonClass} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export default function IconButton({
  label,
  icon,
  buttonClassName = "",
  onClick,
  disabled,
  showTooltip = true,
  id,
  ...props
}: IconButtonProps) {
  const tokens = useTokens("IconButton", props.tokens);

  const buttonClass = cx(tokens.master, tokens.padding, { [tokens.disabled]: disabled });

  const disabledIconClass = cx([tokens.icon.opacity]);

  const wrapContent = (children: React.ReactNode) => {
    if (showTooltip) {
      return (
        <Tooltip {...props} label={label}>
          {children}
        </Tooltip>
      );
    } else {
      return <>{children}</>;
    }
  };

  return wrapContent(
    <>
      {disabled && (
        <WithLink
          shouldWrap={false}
          id={id}
          buttonClass={tillerTwMerge(buttonClass, buttonClassName)}
          data-testid={props["data-testid"] ?? id}
        >
          {React.cloneElement(icon, { className: tillerTwMerge(disabledIconClass, icon.props.className) })}
        </WithLink>
      )}
      {!disabled && (
        <WithLink
          shouldWrap={props.to !== undefined}
          id={id}
          onClick={onClick}
          buttonClass={tillerTwMerge(buttonClass, buttonClassName)}
          data-testid={props["data-testid"] ?? id}
          {...props}
        >
          {icon}
        </WithLink>
      )}
    </>,
  );
}
