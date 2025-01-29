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

import { Button } from "@tiller-ds/core";
import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";
import { findChild } from "@tiller-ds/util";

import DropdownMenu, { DropdownMenuMenuProps } from "./DropdownMenu";
import NavigationContextProvider, { NavigationContext } from "./NavigationContextProvider";

export type TopNavigationProps = {
  /**
   * aria-label when mobile menu is closed.
   */
  ariaLabelClosed?: string;

  /**
   * aria-label when mobile menu is open.
   */
  ariaLabelOpen?: string;

  /**
   * Navigation Items / Header links
   */
  children: React.ReactNode;

  /**
   * Changes the style of the component ('default' matches your primary theme).
   */
  color?: "default" | "dark" | "light";

  /**
   * A logo component, usually an image.
   */
  logo?: React.ReactNode;

  /**
   * Actions defined on the right top side of the Top Navigation.
   * Needs a 'Router' component as a wrapper, and it's preferred to use 'TopNavigation.Dropdown'
   * as elements inside the router, since this area is often used for account settings and similar
   * options.
   */
  topRightAction?: React.ReactNode;

  /**
   * Experimental.
   */
  variant?: "basic" | "centered" | "contained";

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;
} & TopNavigationTokensProps;

type TopNavigationTokensProps = {
  topNavigationTokens?: ComponentTokens<"TopNavigation">;
};

export type TopNavigationItemProps = {
  /**
   * Determines the background color of the sub items container
   * on expandable items. Make sure to have this prop equal to
   * the 'color' prop of 'TopNavigation.Navigation.SubItem' component.
   */
  backgroundColor?: "default" | "dark" | "light";

  /**
   * Item content. If 'children' is 'TopNavigation.Navigation.SubItem', title prop is required because
   * the item is then considered as expandable and requires subitems as its children. Otherwise, title prop is not
   * required.
   */
  children?: React.ReactNode;

  /**
   * Custom additional styling.
   */
  className?: string;

  /**
   * Defines the look of the button according to the chosen theme.
   */
  color?: "default" | "dark" | "light";

  /**
   * Makes the item expandable ('title' prop is required if this is set to true)
   */
  isExpandable?: boolean;

  /**
   * Optional icon displayed on the right side of the text.
   */
  icon?: React.ReactNode;

  /**
   * Icon placement defined for .
   */
  iconPlacement?: "leading" | "trailing";

  /**
   * Defines the title of the item. If the 'isExpandable' prop is not set to true (which is by default),
   * this prop is not required. In that case, you can set the title via the 'children' prop.
   */
  title?: React.ReactNode;

  /**
   * Destination url.
   */
  to?: string;

  /**
   * Custom function to execute on selection of the item. Do not use in parallel with 'to' prop for changing
   * the link of your website.
   */
  onSelect?: () => void;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;
} & TopNavigationItemsTokensProps;

type TopNavigationDropdownProps = {
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
   * Top Navigation content (most frequently 'TopNavigation.Dropdown.Item').
   */
  children: React.ReactNode;

  /**
   * Title of the Dropdown menu, shown only if text variant of the dropdown is selected.
   */
  title: React.ReactNode;

  /**
   * Custom icon serving as a dropdown menu open button.
   */
  icon?: React.ReactElement;

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
} & DropdownMenuMenuProps &
  TopNavigationItemsTokensProps;

type TopNavigationItemsTokensProps = {
  tokens?: ComponentTokens<"TopNavigation">;
};

TopNavigationDropdown.defaultProps = {
  type: "TopNavigationDropdown",
};

type TopNavigationDropdownItemProps = {
  /**
   * Item content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * The style of your item. Usually the same as the style of the parent component.
   */
  color?: "default" | "dark" | "light";

  /**
   * Optional icon displayed on the right side of the text.
   */
  icon?: React.ReactNode;

  /**
   * Custom function to execute on selection of the item. Do not use in parallel with 'to' prop for changing
   * the link of your website.
   */
  onSelect?: () => void;

  /**
   * Destination url. Do not use in parallel with 'onSelect' prop for changing
   * the link of your website.
   */
  to?: string;

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;

  /**
   * A unique identifier for testing purposes.
   * This identifier can be used in testing frameworks like Jest or Cypress to locate specific elements for testing.
   * It helps ensure that UI components are behaving as expected across different scenarios.
   * @type {string}
   * @example
   * // Usage:
   * <MyComponent data-testid="my-component" />
   * // In tests:
   * getByTestId('my-component');
   */
  "data-testid"?: string;
} & TopNavigationItemsTokensProps;

type TopNavigationActionProps = {
  /**
   * Action content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * The style of your action. Usually the same as the style of the parent component.
   */
  color?: "default" | "dark" | "light";

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
} & TopNavigationItemsTokensProps;

TopNavigationActions.defaultProps = {
  type: "TopNavigationActions",
};

type TopNavigationNavigationProps = {
  /**
   * TopNavigation Navigation content (most frequently 'TopNavigation.Navigation.Item').
   */
  children: React.ReactNode;
};

TopNavigationNavigation.defaultProps = {
  type: "TopNavigationNavigation",
};

type ThemeNavigationMenuContainerProps = {
  children: React.ReactNode;
  variant: "basic" | "centered" | "contained";
  className: string;
  color?: "default" | "dark" | "light";
  "data-testid"?: string;
} & TokenProps<"TopNavigation">;

function TopNavigation({
  logo,
  color = "default",
  ariaLabelOpen = "Close main menu",
  ariaLabelClosed = "Main menu",
  children,
  variant = "basic",
  className,
  topRightAction,
  ...props
}: TopNavigationProps) {
  const topNavigationTokens = useTokens("TopNavigation", props.topNavigationTokens);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const menuClasses = cx({ hidden: !isOpen, block: isOpen }, "md:hidden w-full mt-4");
  const searchBarClasses = cx(topNavigationTokens.searchBarContainer, {
    "justify-end": variant === "basic",
    "justify-center": variant === "centered",
  });

  const headerClasses = cx({ "ml-10": !!logo });
  const navigation = findChild("TopNavigationNavigation", children);
  const searchBar = findChild("TopNavigationSearchBar", children);
  const actions = findChild("TopNavigationActions", children);

  const baseClassName = cx(
    className,
    topNavigationTokens.base.master,
    topNavigationTokens.base.padding,
    { [topNavigationTokens.base.dark]: color === "dark" },
    { [topNavigationTokens.base.light]: color === "light" },
    { [topNavigationTokens.base.default]: color === "default" },
  );

  const logoClassName = cx(
    topNavigationTokens.logo.master,
    { [topNavigationTokens.logo.withTopRightAction.master]: topRightAction },
    { [topNavigationTokens.logo.withTopRightAction.margin]: topRightAction },
    { [topNavigationTokens.logo.withoutTopRightAction]: !topRightAction },
  );

  const navButtonClassName = cx(topNavigationTokens.navButtons.master, topNavigationTokens.navButtons[color]);

  const menuButtonClassName = cx(topNavigationTokens.navButtons.hover);

  const containerClassName = cx(topNavigationTokens.fullWidth, {
    [topNavigationTokens.container]: variant === "contained",
  });

  const iconProps = { className: navButtonClassName };
  const closeIcon = useIcon("dismiss", undefined, iconProps);
  const menuIcon = useIcon("menu", undefined, iconProps);

  return (
    <NavigationContextProvider small={false} menuOpened={isOpen} actionOpened={false}>
      <NavigationContext.Consumer>
        {({ isActionOpened }) => (
          <div className={baseClassName} data-testid={props["data-testid"]}>
            <div className={containerClassName}>
              {!isActionOpened && (
                <>
                  <div className={topNavigationTokens.menuButtonContainer}>
                    <Button
                      className="ml-4 md:ml-8 h-10"
                      color={menuButtonClassName}
                      variant="text"
                      onClick={handleClick}
                      data-testid={props["data-testid"] && `${props["data-testid"]}-menu`}
                    >
                      {isOpen ? closeIcon : menuIcon}
                    </Button>
                  </div>
                  {logo && variant === "centered" && (
                    <div className={logoClassName} data-testid={props["data-testid"] && `${props["data-testid"]}-logo`}>
                      {logo}
                    </div>
                  )}
                  <div className={topNavigationTokens.innerContainer}>
                    {logo && (variant === "basic" || variant === "contained") && (
                      <div
                        className={logoClassName}
                        data-testid={props["data-testid"] && `${props["data-testid"]}-logo`}
                      >
                        {logo}
                      </div>
                    )}
                    {(variant === "basic" || variant === "contained") && (
                      <TopNavigationMenuContainer variant={variant} className={headerClasses}>
                        {navigation}
                      </TopNavigationMenuContainer>
                    )}
                  </div>
                </>
              )}
              {topRightAction && (
                <div className={`flex items-center justify-end md:mr-2 ${isActionOpened ? "col-span-3 mt-2" : "mr-4"}`}>
                  <div
                    className={`${isActionOpened && "w-full md:w-fit"}`}
                    data-testid={props["data-testid"] && `${props["data-testid"]}-right-action`}
                  >
                    {topRightAction}
                  </div>
                </div>
              )}
              {searchBar && (
                <div className={searchBarClasses}>
                  <div
                    className={topNavigationTokens.searchBar}
                    data-testid={props["data-testid"] && `${props["data-testid"]}-search`}
                  >
                    {searchBar}
                  </div>
                </div>
              )}
              {actions && (
                <div className={topNavigationTokens.actionsAndDropdownContainer}>
                  <div className={topNavigationTokens.innerActionsAndDropdownContainer}>
                    <div
                      className={topNavigationTokens.actionsContainer}
                      data-testid={props["data-testid"] && `${props["data-testid"]}-actions`}
                    >
                      {actions}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {variant === "centered" && (
              <TopNavigationMenuContainer variant={variant} className={headerClasses}>
                {navigation}
              </TopNavigationMenuContainer>
            )}
            <div className={topNavigationTokens.smallMenuContainer}>
              <div className={menuClasses}>
                <nav
                  className={topNavigationTokens.smallMenuInnerContainer}
                  data-testid={props["data-testid"] && `${props["data-testid"]}-navigation`}
                >
                  {navigation}
                </nav>
                {actions}
              </div>
            </div>
          </div>
        )}
      </NavigationContext.Consumer>
    </NavigationContextProvider>
  );
}

function TopNavigationMenuContainer({
  color = "default",
  children,
  variant,
  className,
  ...props
}: ThemeNavigationMenuContainerProps) {
  const tokens = useTokens("TopNavigation", props.tokens);
  const menuContainerClassName = cx(tokens.menuContainer, { [tokens.border[color]]: variant === "centered" });
  const innerMenuContainerClassName = cx(
    tokens.innerMenuContainer,
    { [className]: variant === "basic" || variant === "contained" },
    { "justify-start mt-2 pb-3": variant === "centered" },
  );

  return (
    <div className={menuContainerClassName}>
      <nav
        className={innerMenuContainerClassName}
        data-testid={props["data-testid"] && `${props["data-testid"]}-navigation`}
      >
        {children}
      </nav>
    </div>
  );
}

export function TopNavigationItem({
  to,
  children,
  className,
  color = "default",
  isExpandable,
  title,
  icon,
  iconPlacement = "trailing",
  backgroundColor,
  onSelect,
  ...props
}: TopNavigationItemProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { isMenuOpened, onMenuOpenedToggle } = React.useContext(NavigationContext);

  const tokens = useTokens("TopNavigation", props.tokens);
  const location = useLocation();

  const active = to !== undefined ? location.pathname.startsWith(to) : false;
  const cn = cx(
    className,
    tokens.Item.master,
    tokens.Item.padding,
    tokens.Item.transition,
    tokens.Item.fontSize,
    { [tokens.Item.base.fontWeight]: !active },
    { [tokens.Item.base[color]]: !active },
    { [tokens.Item.inactive[color]]: !active },
    { [tokens.Item.active[color]]: active },
    { [tokens.Item.active.fontWeight]: active },
    { [tokens.Item.expandable.container]: isExpandable },
  );

  const containerClassName = cx(
    tokens.Item.expandable.subitemsContainer.master,
    tokens.Item.expandable.subitemsContainer.padding,
    tokens.Item.expandable.subitemsContainer.width,
    { [tokens.Item.expandable.subitemsContainer.dark]: color === "dark" },
    { [tokens.Item.expandable.subitemsContainer.light]: color === "light" },
    { [tokens.Item.expandable.subitemsContainer.default]: color === "default" },
  );

  const iconProps = { className: "ml-1", size: 3 };
  const openExpanderIcon = useIcon("openExpander", undefined, iconProps);
  const closeExpanderIcon = useIcon("closeExpander", undefined, iconProps);

  const onExpandableItemClickMobile = () => {
    setExpanded(!expanded);
    if (onSelect) {
      onSelect();
    }
  };

  const onExpandableItemClick = () => {
    if (onMenuOpenedToggle) {
      onMenuOpenedToggle(!isMenuOpened);
    }
    if (onSelect) {
      onSelect();
    }
  };

  if (isExpandable) {
    return (
      <div className="w-full">
        <div className="hidden md:block">
          <DropdownMenu
            title={title}
            menuType="text"
            variant="text"
            tokens={{}}
            className={cn}
            onClick={onExpandableItemClick}
            onBlur={() => onMenuOpenedToggle && onMenuOpenedToggle(false)}
            popupBackgroundColor={backgroundColor ? backgroundColor : color}
            data-testid={props["data-testid"]}
          >
            {children}
          </DropdownMenu>
        </div>
        <div className="md:hidden">
          <div className="flex flex-col flex-wrap items-center">
            <Link
              {...props}
              to={to || "#"}
              className={cn + ` items-center`}
              onClick={onExpandableItemClickMobile}
              data-testid={props["data-testid"]}
            >
              {title}
              {expanded ? closeExpanderIcon : openExpanderIcon}
            </Link>
            {expanded && (
              <NavigationContextProvider small={true} menuOpened={isMenuOpened} actionOpened={false}>
                <div className={containerClassName}>{children}</div>
              </NavigationContextProvider>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      {...props}
      to={to || "#"}
      onClick={onSelect}
      className={
        cn +
        ` md:flex md:items-center md:space-x-0.5 ${
          iconPlacement === "leading" && "flex-row-reverse md:flex-row-reverse"
        }`
      }
    >
      <span className="whitespace-nowrap">{title || children}</span>
      {icon}
    </Link>
  );
}
export function TopNavigationDropdown({
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
}: TopNavigationDropdownProps) {
  const topNavigationTokens = useTokens("TopNavigation", props.tokens);
  const dropdownMenuTokens = useTokens("DropdownMenu", props.tokens);
  const { isActionOpened, onActionOpenedToggle } = React.useContext(NavigationContext);

  const mobileIconClassName = cx(
    { [dropdownMenuTokens.Icon.color.default]: iconColor === "default" },
    { [dropdownMenuTokens.Icon.color.dark]: iconColor === "dark" },
    { [dropdownMenuTokens.Icon.color.light]: iconColor === "light" },
  );

  const containerClassName = cx(
    className,
    topNavigationTokens.Item.expandable.subitemsContainer.master,
    topNavigationTokens.Item.expandable.subitemsContainer.padding,
    topNavigationTokens.Item.expandable.subitemsContainer.width,
    { [topNavigationTokens.Item.expandable.subitemsContainer.dark]: iconColor === "light" },
    { [topNavigationTokens.Item.expandable.subitemsContainer.light]: iconColor === "dark" },
    { [topNavigationTokens.Item.expandable.subitemsContainer.default]: iconColor === "default" },
  );

  return (
    <>
      <div className="hidden md:block">
        <DropdownMenu
          {...props}
          title={title}
          variant={buttonVariant}
          color={buttonColor}
          menuType={menuType}
          openExpanderIcon={icon}
          closeExpanderIcon={icon}
          iconColor={iconColor}
          popupBackgroundColor={popupBackgroundColor || "default"}
          data-testid={props["data-testid"]}
        >
          <div className="px-2">{children}</div>
        </DropdownMenu>
      </div>
      <div className={`md:hidden flex flex-col ${isActionOpened ? "grid-cols-3" : "w-fit"}`}>
        <Button
          variant={buttonVariant}
          color={buttonColor}
          onClick={() => (onActionOpenedToggle ? onActionOpenedToggle(!isActionOpened) : undefined)}
          className="flex items-center justify-center space-x-2"
          data-testid={props["data-testid"]}
        >
          {icon ? React.cloneElement(icon, { className: mobileIconClassName }) : title}
        </Button>
        {isActionOpened && <div className={containerClassName}>{children}</div>}
      </div>
    </>
  );
}

export function TopNavigationDropdownItem({
  color = "default",
  children,
  onSelect = () => undefined,
  icon,
  to,
  className,
  ...props
}: TopNavigationDropdownItemProps) {
  const { small } = React.useContext(NavigationContext);
  const tokens = useTokens("TopNavigation", props.tokens);
  const location = useLocation();

  const active = to !== undefined ? location.pathname === to : false;
  const smallDropdownItemClassName = cx(
    tokens.smallDropdownItem.master,
    tokens.smallDropdownItem.fontSize,
    tokens.smallDropdownItem.transition,
    { [tokens.smallDropdownItem.base.fontWeight]: !active },
    { [tokens.smallDropdownItem.base[color]]: !active },
    { [tokens.smallDropdownItem.active[color]]: active },
    { [tokens.smallDropdownItem.active.fontWeight]: active },
    className,
  );

  const dropdownItemClassName = cx(
    className,
    tokens.dropdownItem.master,
    tokens.dropdownItem.fontSize,
    tokens.dropdownItem.transition,
    { [tokens.dropdownItem.base.fontWeight]: !active },
    { [tokens.dropdownItem.base[color]]: !active },
    { [tokens.dropdownItem.active[color]]: active },
    { [tokens.dropdownItem.active.fontWeight]: active },
  );

  const iconTextWrapper = (text: React.ReactNode) => {
    return (
      <div className="flex items-center justify-center space-x-0.5">
        <span>{text}</span>
        {icon}
      </div>
    );
  };

  if (small) {
    return (
      <Link
        to={to ? to : ""}
        onClick={onSelect}
        className={smallDropdownItemClassName}
        data-testid={props["data-testid"]}
      >
        {icon ? iconTextWrapper(children) : children}
      </Link>
    );
  }

  return (
    <Link to={to ? to : ""} onClick={onSelect} className={dropdownItemClassName}>
      {icon ? iconTextWrapper(children) : children}
    </Link>
  );
}

export function TopNavigationNavigation({ children }: TopNavigationNavigationProps) {
  return <>{children}</>;
}

export function TopNavigationActions({ color = "default", children, className, ...props }: TopNavigationActionProps) {
  const tokens = useTokens("TopNavigation", props.tokens);

  const smallActionsClassName = cx(tokens.smallActions.master, tokens.smallActions.color[color]);

  return (
    <div className={className}>
      <div className="hidden md:block">
        <div className={tokens.actions}>{children}</div>
      </div>
      <div className="md:hidden flex justify-center">
        <div className={smallActionsClassName}>{children}</div>
      </div>
    </div>
  );
}

TopNavigation.Navigation = TopNavigationNavigation;
TopNavigationNavigation.Item = TopNavigationItem;
TopNavigationNavigation.SubItem = TopNavigationDropdownItem;

TopNavigation.Dropdown = TopNavigationDropdown;
TopNavigationDropdown.Item = TopNavigationDropdownItem;

TopNavigation.Action = TopNavigationActions;

export default TopNavigation;
