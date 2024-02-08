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

import React, { useCallback, useContext, useMemo, useRef, useState } from "react";

import { Button, ButtonProps } from "@tiller-ds/core";
import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";

import Dropdown, { DropdownContext } from "./Dropdown";

export type DropdownMenuMenuProps = {
  /**
   * Dropdown Menu content, most often defined as its subcomponent 'DropdownMenu.Item'
   */
  children: React.ReactNode;

  /**
   * Custom additional class name for the button component.
   * Only applies if 'menuType' is set to 'custom'.
   */
  className?: string;

  /**
   * Color of the dropdown icon, the 'default' value sets it to match your primary theme.
   */
  iconColor?: "default" | "dark" | "light";

  /**
   * Custom icon serving as a dropdown menu open button.
   * If you wish to show this icon as a leading icon (before the title), set the 'iconPlacement' prop to 'leading'.
   */
  openExpanderIcon?: React.ReactElement;

  /**
   * Custom icon serving as a dropdown menu close button.
   * If you wish to show this icon as a leading icon (before the title), set the 'iconPlacement' prop to 'leading'.
   */
  closeExpanderIcon?: React.ReactElement;

  /**
   * Determines if the defined/default icon is leading (before the title) or trailing (after the title).
   */
  iconPlacement?: "leading" | "trailing";

  /**
   * Defines whether the menu button is a text or a predefined icon.
   * If you wish to create a one-off customized menu, you can do so via 'tokens' prop.
   * Defaults to 'text'.
   */
  menuType?: "text" | "icon";

  /**
   * Background color of the popup container, the 'default' value sets it to match your primary theme.
   */
  popupBackgroundColor?: "default" | "dark" | "light";

  /**
   * Displays a title for the menu if the menuType prop is set to text.
   */
  title?: React.ReactNode;

  /**
   * Determines the height of the dropdown list based on the number of visible items.
   * Scrolling will occur when the number of items exceeds the specified value.
   *
   * For example, setting this value to 5 will display 5 items before scrolling.
   * Use this prop for better user experience with dropdowns containing a large number of items.
   * If not defined or set to a value larger than the number of items, this prop is ignored.
   *
   * @type {number | undefined}
   * @default undefined
   */
  visibleItemCount?: number;
} & Omit<ButtonProps, "className" | "leadingIcon" | "trailingIcon" | "children" | "title"> &
  DropdownMenuTokensProps;

type DropdownMenuTokensProps = {
  tokens?: ComponentTokens<"DropdownMenu">;
};

type DropdownMenuMenuItemProps = {
  className?: string;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  children: React.ReactNode;
  onSelect: () => void;
} & TokenProps<"DropdownMenu">;

type DropdownMenuContainerProps = {
  backgroundColor?: "default" | "dark" | "light";
  children: React.ReactNode;
  visibleItemCount?: number;
} & TokenProps<"DropdownMenu">;

function DropdownMenu({
  variant = "outlined",
  color = "white",
  iconColor,
  popupBackgroundColor,
  children,
  title,
  type = "button",
  menuType = "text",
  openExpanderIcon,
  closeExpanderIcon,
  visibleItemCount,
  className,
  iconPlacement = "trailing",
  ...props
}: DropdownMenuMenuProps) {
  const tokens = useTokens("DropdownMenu", props.tokens);
  const [itemHeight, setItemHeight] = useState(40);

  const iconClassName = cx(
    { [tokens.Icon.color.default]: iconColor === "default" },
    { [tokens.Icon.color.dark]: iconColor === "dark" },
    { [tokens.Icon.color.light]: iconColor === "light" },
  );

  const iconProps = { className: iconClassName, size: 3 };
  const finalOpenExpanderIcon = useIcon("openExpander", openExpanderIcon, iconProps);
  const finalCloseExpanderIcon = useIcon("closeExpander", closeExpanderIcon, iconProps);

  const responsiveIcon = (
    <div>
      <DropdownContext.Consumer>
        {({ isExpanded }) => (isExpanded ? finalCloseExpanderIcon : finalOpenExpanderIcon)}
      </DropdownContext.Consumer>
    </div>
  );

  return (
    <Dropdown>
      <Dropdown.Button>
        {menuType === "text" && (
          <Button
            type={type}
            variant={variant}
            color={color}
            leadingIcon={iconPlacement === "leading" && responsiveIcon}
            trailingIcon={iconPlacement === "trailing" && responsiveIcon}
            className={className}
            {...props}
          >
            {title}
          </Button>
        )}
        {menuType === "icon" && (
          <Button type={type} variant={variant} color={color} menu={true} className={className} {...props}>
            {responsiveIcon}
          </Button>
        )}
      </Dropdown.Button>

      <Dropdown.Menu>
        <DropdownContext.Provider value={{ isExpanded: true, itemHeight, setItemHeight }}>
          <DropdownMenuContainer backgroundColor={popupBackgroundColor} visibleItemCount={visibleItemCount}>
            {children}
          </DropdownMenuContainer>
        </DropdownContext.Provider>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function DropdownMenuItem({
  className = "",
  disabled = false,
  type = "button",
  children,
  ...props
}: DropdownMenuMenuItemProps) {
  const tokens = useTokens("DropdownMenu", props.tokens);
  const itemRef = useRef<HTMLButtonElement>(null);
  const { setItemHeight } = useContext(DropdownContext);

  React.useEffect(() => {
    if (setItemHeight && itemRef.current && itemRef.current.clientHeight > 0) {
      setItemHeight(itemRef.current.clientHeight);
    }
  }, [setItemHeight]);

  const dropdownMenuItemClassName = cx(
    className,
    tokens.MenuItem.master,
    tokens.MenuItem.padding,
    tokens.MenuItem.fontSize,
    tokens.MenuItem.textColor,
    tokens.MenuItem.transition,
    { [tokens.MenuItem.disabled]: disabled },
  );

  return (
    <Dropdown.Item {...props}>
      <button type="button" className={dropdownMenuItemClassName} disabled={disabled} ref={itemRef}>
        {children}
      </button>
    </Dropdown.Item>
  );
}

function DropdownMenuContainer({
  children,
  backgroundColor = "light",
  visibleItemCount,
  ...props
}: DropdownMenuContainerProps) {
  const tokens = useTokens("DropdownMenu", props.tokens);
  const { itemHeight } = useContext(DropdownContext);
  const childrenContainerRef = useRef<HTMLDivElement>(null);

  const menuContainerClassName = cx(
    tokens.MenuContainer.master,
    tokens.MenuContainer.margin,
    tokens.MenuContainer.width,
    tokens.MenuContainer.borderRadius,
    tokens.MenuContainer.boxShadow,
    tokens.MenuContainer.backgroundColor,
  );

  const menuInnerContainerClassName = cx(
    tokens.MenuInnerContainer.borderRadius,
    tokens.MenuInnerContainer.boxShadow,
    tokens.MenuInnerContainer.backgroundColor[backgroundColor],
    "overflow-y-auto scrollbar",
  );

  const menuContainerChildrenClassName = cx(
    tokens.MenuContainerChildren.master,
    tokens.MenuContainerChildren.padding,
    tokens.MenuContainerChildren.textColor[backgroundColor],
  );

  const containerPadding: number = useMemo(() => {
    if (childrenContainerRef !== null && childrenContainerRef.current !== null) {
      const computedStyles = getComputedStyle(childrenContainerRef.current as Element);
      const paddingTop = parseInt(computedStyles.getPropertyValue("padding-top").match(/\d{1,3}/g)?.[0] || "2");
      const paddingBottom = parseInt(computedStyles.getPropertyValue("padding-bottom").match(/\d{1,3}/g)?.[0] || "2");

      return paddingTop + paddingBottom;
    }
    return 4;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenContainerRef.current]);

  const menuListHeight = useMemo(() => {
    const filteredChildren = Array.isArray(children) && children.filter((child) => typeof child !== "boolean");

    if (itemHeight && Array.isArray(filteredChildren)) {
      const itemCount = Math.min(filteredChildren.length, visibleItemCount || filteredChildren.length);
      return itemHeight * itemCount + containerPadding;
    }
  }, [children, containerPadding, itemHeight, visibleItemCount]);

  return (
    <div className={menuContainerClassName}>
      <div
        className={menuInnerContainerClassName}
        style={{
          height: visibleItemCount ? `${menuListHeight}px` : undefined,
        }}
      >
        <menu className={menuContainerChildrenClassName} ref={childrenContainerRef}>
          {children}
        </menu>
      </div>
    </div>
  );
}

DropdownMenu.Item = DropdownMenuItem;
export default DropdownMenu;
