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

import { Link, useLocation } from "react-router-dom";
import ResizeObserver from "resize-observer-polyfill";

import { Button } from "@tiller-ds/core";
import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";

import DropdownMenu, { DropdownMenuMenuProps } from "./DropdownMenu";
import NavigationContextProvider, { NavigationContext } from "./NavigationContextProvider";

type SidebarNavigationProps = {
  /**
   * Logo to be shown on the top of the component.
   */
  logo?: React.ReactNode;

  /**
   * Actions defined on the bottom section of the Sidebar navigation.
   * Needs 'Router' component as a wrapper and is preferred to use 'SidebarNavigation.Item'
   * as elements inside the router.
   */
  bottomActions?: React.ReactNode;

  /**
   * Actions defined on the right top side of the Sidebar navigation.
   * Needs 'Router' component as a wrapper and is preferred to use 'SidebarNavigation.Dropdown'
   * as elements inside the router, since this area is often used for account settings and similar
   * options.
   */
  topRightAction?: React.ReactNode;

  /**
   * Content inside the sidebar navigation, most often its subcomponent 'SidebarNavigation.Item'.
   */
  children: React.ReactNode;

  /**
   * Changes the style of the component ('default' matches your primary theme).
   */
  color?: "default" | "dark" | "light";

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
} & SidebarNavigationTokensProps;

type SidebarNavigationTokensProps = {
  tokens?: ComponentTokens<"SidebarNavigation">;
};

type SidebarNavigationItemProps = {
  /**
   * Sidebar Navigation Item content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Defines the look of the button according to the chosen theme.
   */
  color?: "default" | "dark" | "light";

  /**
   * Icon to be shown next to the text on the item.
   */
  icon?: React.ReactElement;

  /**
   * Makes the item expandable ('title' prop is required if this is set to true)
   */
  isExpandable?: boolean;

  /**
   * The target link to which the item transfers you on click.
   */
  to?: string;

  /**
   * Defines the title of the item. If the 'isExpandable' prop is not set to true (which is by default),
   * this prop is not required. In that case, you can set the title via the 'children' prop.
   */
  title?: string;

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
} & SidebarNavigationTokensProps;

type SidebarNavigationDropdownItemProps = {
  /**
   * Custom function to execute on selection of the item. Do not use in parallel with 'to' prop for changing
   * the link of your website.
   */
  onSelect?: () => void;

  /**
   * The style of your item. Usually the same as the style of the parent component.
   */
  color?: "default" | "dark" | "light" | "none";

  /**
   * Item content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Optional icon displayed on the right side of the text.
   */
  icon?: React.ReactElement;

  /**
   * Destination url. Do not use in parallel with 'onSelect' prop for changing
   * the link of your website.
   */
  to?: string;

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
} & SidebarNavigationTokensProps;

type SidebarNavigationDropdownProps = {
  /**
   * Sidebar Navigation Dropdown content (most frequently 'SidebarNavigation.Dropdown.Item').
   */
  children: React.ReactNode;
  /**
   * Title of the Dropdown menu, shown only if text variant of the dropdown is selected.
   */
  title: string;

  /**
   * Determines the button color for the dropdown. Accepts many colors, along with your brand colors
   * to make it blend in and change according to your theme.
   */
  buttonColor?: string;

  /**
   * Determines the variant of the button for the Dropdown menu. Matches the variants of the
   * 'Button' component because the dropdown menu is essentially an expandable button.
   */
  buttonVariant?: "filled" | "outlined" | "text" | undefined;

  /**
   * Custom icon serving as a dropdown menu open button.
   */
  icon?: React.ReactElement;

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
} & DropdownMenuMenuProps &
  SidebarNavigationDropdownTokensProps;

type SidebarNavigationDropdownTokensProps = {
  dropdownMenuTokens?: ComponentTokens<"DropdownMenu">;
  sidebarNavigationTokens?: ComponentTokens<"SidebarNavigation">;
};

function SidebarNavigation({
  logo,
  bottomActions,
  topRightAction,
  children,
  color = "default",
  className,
  ...props
}: SidebarNavigationProps) {
  const tokens = useTokens("SidebarNavigation", props.tokens);

  const [isOpen, setIsOpen] = React.useState(false);

  const containerClassName = cx(
    className,
    tokens.container.master,
    tokens.container.padding,
    { [tokens.container.dark]: color === "dark" },
    { [tokens.container.light]: color === "light" },
    { [tokens.container.default]: color === "default" },
  );

  const navClassName = cx(
    tokens.base.master,
    tokens.base.borderRadius,
    tokens.base.padding,
    { [tokens.base.dark]: color === "dark" },
    { [tokens.base.light]: color === "light" },
    { [tokens.base.default]: color === "default" },
  );

  const logoClassName = cx(
    tokens.logo.master,
    { [tokens.logo.withTopRightAction.master]: topRightAction },
    { [tokens.logo.withTopRightAction.margin]: topRightAction },
    { [tokens.logo.withoutTopRightAction]: !topRightAction },
  );

  const bottomActionsClassName = cx(tokens.bottomActions.master, tokens.bottomActions.padding);

  const navButtonClassName = cx(tokens.navButtons.master, tokens.navButtons[color]);

  const menuButtonClassName = cx(tokens.navButtons.hover);

  const menuButtonStyleClassName = cx(tokens.navButtons.margin, tokens.navButtons.size);

  const navClass = cx(tokens.base.container, {
    "md:flex hidden": !isOpen,
    flex: isOpen,
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleResize: ResizeObserverCallback = (entries) => {
    if (entries[0].contentRect.width > 768) {
      setIsOpen(true);
    }
  };

  const resizeObserver = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    resizeObserver.current = new ResizeObserver(handleResize);
    resizeObserver.current.observe(document.body);
  }, []);

  const menuIcon = useIcon("menu", undefined, { className: navButtonClassName });

  return (
    <NavigationContextProvider menuOpened={isOpen} actionOpened={false}>
      <NavigationContext.Consumer>
        {({ isActionOpened }) => (
          <div className={containerClassName}>
            <div className={tokens.topContainer}>
              {!isActionOpened && (
                <>
                  <div className={tokens.navButtons.container}>
                    <Button
                      className={menuButtonStyleClassName}
                      color={menuButtonClassName}
                      variant="text"
                      onClick={handleClick}
                    >
                      {menuIcon}
                    </Button>
                  </div>
                  {logo && <div className={logoClassName}>{logo}</div>}
                </>
              )}
              {topRightAction && (
                <div
                  className={`flex items-center justify-end md:justify-center md:mr-0 md:col-span-1 ${
                    !isActionOpened ? (logo ? "col-span-1 mr-4" : "col-span-2 mr-4") : "col-span-3"
                  }`}
                >
                  {topRightAction}
                </div>
              )}
            </div>
            <div className={navClass}>
              <nav className={navClassName}>{children}</nav>
              {bottomActions && <div className={bottomActionsClassName}>{bottomActions}</div>}
            </div>
          </div>
        )}
      </NavigationContext.Consumer>
    </NavigationContextProvider>
  );
}

export function SidebarNavigationItem({
  to,
  icon,
  children,
  color = "default",
  title,
  isExpandable,
  className,
  ...props
}: SidebarNavigationItemProps) {
  const [expanded, setExpanded] = React.useState(false);

  const tokens = useTokens("SidebarNavigation", props.tokens);
  const location = useLocation();

  const active = to !== undefined ? location.pathname === to : false;
  const cn = cx(
    className,
    tokens.item.master,
    tokens.item.padding,
    tokens.item.fontSize,
    tokens.item.transition,
    { [tokens.item.base.fontWeight]: !active },
    { [tokens.item.base[color]]: !active },
    { [tokens.item.inactive[color]]: !active },
    { [tokens.item.active[color]]: active },
    { [tokens.item.active.fontWeight]: active },
    { [tokens.item.expandable.container]: isExpandable },
  );

  const iconClassName = cx(tokens.icon.master, tokens.icon.color);

  const containerClassName = cx(
    tokens.item.expandable.subitemsContainer.padding,
    tokens.item.expandable.subitemsContainer.margin,
    tokens.item.expandable.subitemsContainer.borderRadius,
    tokens.item.expandable.subitemsContainer.boxShadow,
    tokens.item.expandable.subitemsContainer.width,
    { [tokens.item.expandable.subitemsContainer.dark]: color === "dark" },
    { [tokens.item.expandable.subitemsContainer.light]: color === "light" },
    { [tokens.item.expandable.subitemsContainer.default]: color === "default" },
  );

  const iconProps = { className: "ml-1 mt-px", size: 3 };
  const openExpanderIcon = useIcon("openExpander", undefined, iconProps);
  const closeExpanderIcon = useIcon("closeExpander", undefined, iconProps);

  if (isExpandable) {
    return (
      <div className="cursor-pointer flex flex-col md:items-start items-center">
        <div {...props} className={cn} onClick={() => setExpanded(!expanded)}>
          {icon && <div className={iconClassName}>{icon}</div>}
          {title}
          {expanded ? closeExpanderIcon : openExpanderIcon}
        </div>
        {expanded && <div className={containerClassName}>{children}</div>}
      </div>
    );
  }

  return (
    <Link {...props} to={to || "#"} className={cn}>
      {icon && <div className={iconClassName}>{icon}</div>}
      <div className="flex items-center">{title || children}</div>
    </Link>
  );
}

export function SidebarNavigationDropdown({
  children,
  title,
  menuType,
  icon,
  buttonColor,
  iconColor,
  popupBackgroundColor,
  buttonVariant = "filled",
  className,
  ...props
}: SidebarNavigationDropdownProps) {
  const sidebarNavigationTokens = useTokens("SidebarNavigation", props.sidebarNavigationTokens);
  const dropdownMenuTokens = useTokens("DropdownMenu", props.dropdownMenuTokens);
  const { isActionOpened, onActionOpenedToggle } = React.useContext(NavigationContext);

  const mobileIconClassName = cx(
    { [dropdownMenuTokens.Icon.color.default]: iconColor === "default" },
    { [dropdownMenuTokens.Icon.color.dark]: iconColor === "dark" },
    { [dropdownMenuTokens.Icon.color.light]: iconColor === "light" },
  );

  const containerClassName = cx(
    sidebarNavigationTokens.item.expandable.subitemsContainer.padding,
    sidebarNavigationTokens.item.expandable.subitemsContainer.boxShadow,
    { [sidebarNavigationTokens.item.expandable.subitemsContainer.dark]: popupBackgroundColor === "dark" },
    { [sidebarNavigationTokens.item.expandable.subitemsContainer.light]: popupBackgroundColor === "light" },
    { [sidebarNavigationTokens.item.expandable.subitemsContainer.default]: popupBackgroundColor === "default" },
  );

  const dropdownMenuContainerClassName = cx(
    sidebarNavigationTokens.topRightAction.master,
    { "ml-8": !isActionOpened },
    className,
  );

  return (
    <div className={dropdownMenuContainerClassName}>
      <div className="hidden md:block">
        <DropdownMenu
          title={title}
          variant={buttonVariant}
          color={buttonColor}
          menuType={menuType}
          openExpanderIcon={icon}
          closeExpanderIcon={icon}
          iconColor={iconColor}
          popupBackgroundColor={popupBackgroundColor || "default"}
        >
          <div className="px-2">{children}</div>
        </DropdownMenu>
      </div>
      <div className={`md:hidden flex flex-col ${isActionOpened && "w-full"}`}>
        <Button
          variant={buttonVariant}
          color={buttonColor}
          onClick={() => (onActionOpenedToggle ? onActionOpenedToggle(!isActionOpened) : undefined)}
        >
          {icon ? React.cloneElement(icon, { className: mobileIconClassName }) : title}
        </Button>
        {isActionOpened && <div className={containerClassName}>{children}</div>}
      </div>
    </div>
  );
}

export function SidebarNavigationDropdownItem({
  color = "default",
  children,
  onSelect = () => undefined,
  icon,
  to,
  ...props
}: SidebarNavigationDropdownItemProps) {
  const tokens = useTokens("SidebarNavigation", props.tokens);
  const location = useLocation();

  const active = to !== undefined ? location.pathname.startsWith(to) : false;
  const dropdownItemClassName = cx(
    tokens.dropdownItem.master,
    tokens.dropdownItem.fontSize,
    tokens.dropdownItem.padding,
    tokens.dropdownItem.transition,
    { [tokens.dropdownItem.base.fontWeight]: !active },
    { [tokens.dropdownItem.base[color]]: !active },
    { [tokens.dropdownItem.active[color]]: active },
    { [tokens.dropdownItem.active.fontWeight]: active },
  );

  const iconClassName = cx(tokens.icon.master, tokens.icon.color);

  const iconTextWrapper = (text: React.ReactNode) => {
    return (
      <div className="flex items-center md:justify-start justify-center space-x-0.5">
        {icon && <div className={iconClassName}>{icon}</div>}
        <div className="flex items-center">{text}</div>
      </div>
    );
  };

  return (
    <Link to={to ? to : ""} onClick={onSelect} className={dropdownItemClassName}>
      {icon ? iconTextWrapper(children) : children}
    </Link>
  );
}

SidebarNavigation.Item = SidebarNavigationItem;
SidebarNavigation.SubItem = SidebarNavigationDropdownItem;

SidebarNavigation.Dropdown = SidebarNavigationDropdown;
SidebarNavigationDropdown.Item = SidebarNavigationDropdownItem;
SidebarNavigation.BottomAction = SidebarNavigationDropdownItem;

export default SidebarNavigation;
