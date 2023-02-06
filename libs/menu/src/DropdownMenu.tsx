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
   * If you wish to show this icon as a leading icon (before the title), set the 'leadingIcon' prop to 'true'.
   */
  openExpanderIcon?: React.ReactElement;

  /**
   * Custom icon serving as a dropdown menu close button.
   * If you wish to show this icon as a leading icon (before the title), set the 'leadingIcon' prop to 'true'.
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
   * Determines the height of the dropdown list which coincides with the number of shown items.
   * For example, if this value is set to 5, after 5 items scrolling will occur.
   * Note: if you are using a dropdown with a large number of items resort to setting this value
   * for a better and cleaner UX experience, otherwise don't define it.
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
  const [itemHeight, setItemHeight] = React.useState(0);

  const iconClassName = cx(
    { [tokens.Icon.color.default]: iconColor === "default" },
    { [tokens.Icon.color.dark]: iconColor === "dark" },
    { [tokens.Icon.color.light]: iconColor === "light" }
  );

  const iconProps = { className: iconClassName, size: 3 };
  const finalOpenExpanderIcon = useIcon("openExpander", openExpanderIcon, iconProps);
  const finalCloseExpanderIcon = useIcon("closeExpander", closeExpanderIcon, iconProps);

  const responsiveIcon = (
    <div>
      <DropdownContext.Consumer>
        {({ isExpanded }) =>
          isExpanded
            ? React.cloneElement(finalCloseExpanderIcon, { className: iconClassName })
            : React.cloneElement(finalOpenExpanderIcon, { className: iconClassName })
        }
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
  const itemRef = React.useRef<HTMLButtonElement>(null);
  const { setItemHeight } = React.useContext(DropdownContext);

  React.useEffect(() => {
    if (setItemHeight && itemRef.current) {
      setItemHeight(itemRef.current.clientHeight);
    }
  }, [setItemHeight]);

  const dropdownMenuItemClassName = cx(
    className,
    tokens.MenuItem.master,
    tokens.MenuItem.padding,
    tokens.MenuItem.fontSize,
    tokens.MenuItem.transition,
    { [tokens.MenuItem.disabled]: disabled }
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
  const { itemHeight } = React.useContext(DropdownContext);
  const childrenContainerRef = React.useRef<HTMLDivElement>(null);

  const menuContainerClassName = cx(
    tokens.MenuContainer.master,
    tokens.MenuContainer.margin,
    tokens.MenuContainer.width,
    tokens.MenuContainer.borderRadius,
    tokens.MenuContainer.boxShadow,
    tokens.MenuContainer.backgroundColor
  );

  const menuInnerContainerClassName = cx(
    tokens.MenuInnerContainer.borderRadius,
    tokens.MenuInnerContainer.boxShadow,
    tokens.MenuInnerContainer.backgroundColor[backgroundColor],
    "overflow-y-auto scrollbar"
  );

  const menuContainerChildrenClassName = cx(
    tokens.MenuContainerChildren.master,
    tokens.MenuContainerChildren.padding,
    tokens.MenuContainerChildren.textColor[backgroundColor]
  );

  const containerPadding: number = React.useMemo(() => {
    if (childrenContainerRef !== null && childrenContainerRef.current !== null) {
      return parseInt(
        getComputedStyle(childrenContainerRef.current as Element)
          .getPropertyValue("padding-top")
          .match(/\d{1,3}/g)?.[0] || "2"
      );
    }
    return 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenContainerRef.current]);

  return (
    <div className={menuContainerClassName}>
      <div
        className={menuInnerContainerClassName}
        style={{
          height: itemHeight && visibleItemCount ? `${itemHeight * visibleItemCount + containerPadding}px` : undefined,
        }}
      >
        <div className={menuContainerChildrenClassName} ref={childrenContainerRef}>
          {children}
        </div>
      </div>
    </div>
  );
}

DropdownMenu.Item = DropdownMenuItem;
export default DropdownMenu;
