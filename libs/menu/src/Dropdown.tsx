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

import { Menu, MenuButton, MenuItem, MenuPopover, MenuItems } from "@reach/menu-button";

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
};

type DropdownContentProps = {
  children: React.ReactNode;

  isExpanded: boolean;

  /**
   * Custom additional class name for the main container component.
   */
  className?: string;
};

type DropdownButtonProps = {
  children: React.ReactNode;
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

function Dropdown({ children, className }: DropdownProps) {
  return (
    <Menu>
      {({ isExpanded }) => {
        return (
          <DropdownContent isExpanded={isExpanded} className={className}>
            {children}
          </DropdownContent>
        );
      }}
    </Menu>
  );
}

function DropdownContent({ children, isExpanded, className }: DropdownContentProps) {
  const context = React.useMemo(() => ({ isExpanded }), [isExpanded]);

  const contentClassName = cx("relative inline-block text-left", className);

  return (
    <DropdownContext.Provider value={context}>
      <div className={contentClassName}>{children}</div>
    </DropdownContext.Provider>
  );
}

function DropdownButton({ children }: DropdownButtonProps) {
  return <MenuButton as="menu">{children}</MenuButton>;
}

function DropdownItem({ children, ...props }: DropdownItemProps) {
  return <MenuItem {...props}>{children}</MenuItem>;
}

function DropdownMenu({
  children,
  ...props
}: React.PropsWithChildren<Record<string, unknown>> & TokenProps<"Dropdown">) {
  const tokens = useTokens("Dropdown", props.tokens);
  const { isExpanded } = React.useContext(DropdownContext);

  return (
    <MenuPopover className="z-50">
      <Transition show={isExpanded} {...tokens.Menu.transition}>
        <MenuItems>{children}</MenuItems>
      </Transition>
    </MenuPopover>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;
export default Dropdown;
