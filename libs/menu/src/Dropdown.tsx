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

import { Menu, MenuButton, MenuItem, MenuItems, MenuList } from "@reach/menu-button";

import { cx, TokenProps, useTokens } from "@tiller-ds/theme";
import { createNamedContext } from "@tiller-ds/util";

import Transition from "./Transition";

type DropdownProps = {
  /**
   * Dropdown content, most often its subcomponents 'Dropdown.Menu' and 'Dropdown.Button'.
   */
  children: React.ReactNode;

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
} & TokenProps<"Dropdown">;

type DropdownContentProps = {
  children: React.ReactNode;

  isExpanded: boolean;

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
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
} & TokenProps<"Dropdown">;

type DropdownButtonProps = {
  children: React.ReactNode;
  "data-testid"?: string;
};

type DropdownItemProps = {
  /**
   * DropdownItem content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Custom function witch fires on selection of the item.
   */
  onSelect: () => void;

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
};

type DropdownContext = {
  isExpanded: boolean;
  itemHeight?: number;
  setItemHeight?: (height: number) => void;
};

export const DropdownContext = createNamedContext<DropdownContext>("DropdownContext", {
  isExpanded: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setItemHeight: (height: number) => {},
});

function Dropdown({ children, className, ...props }: DropdownProps) {
  return (
    <Menu>
      {({ isExpanded }) => {
        return (
          <DropdownContent isExpanded={isExpanded} data-testid={props["data-testid"]} className={className}>
            {children}
          </DropdownContent>
        );
      }}
    </Menu>
  );
}

function DropdownContent({ children, isExpanded, className, ...props }: DropdownContentProps) {
  const context = React.useMemo(() => ({ isExpanded }), [isExpanded]);
  const tokens = useTokens("Dropdown", props.tokens);

  const contentClassName = cx(tokens.content, className);

  return (
    <DropdownContext.Provider value={context}>
      <div className={contentClassName} data-testid={props["data-testid"]}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownButton({ children, ...props }: DropdownButtonProps) {
  return (
    <MenuButton {...props} as="menu" data-testid={props["data-testid"]}>
      {children}
    </MenuButton>
  );
}

function DropdownItem({ children, ...props }: DropdownItemProps) {
  return <MenuItem {...props}>{children}</MenuItem>;
}

function DropdownMenu({
  children,
  ...props
}: React.PropsWithChildren<Record<string, unknown>> & TokenProps<"Dropdown"> & { "data-testid"?: string }) {
  const tokens = useTokens("Dropdown", props.tokens);
  const { isExpanded } = React.useContext(DropdownContext);

  return (
    <MenuList {...props} className={tokens.popover} data-testid={props["data-testid"]}>
      <Transition show={isExpanded} {...tokens.Menu.transition}>
        <MenuItems {...props}>{children}</MenuItems>
      </Transition>
    </MenuList>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
export default Dropdown;
