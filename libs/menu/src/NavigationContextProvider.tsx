import * as React from "react";

import { createNamedContext } from "@tiller-ds/util";

type NavigationDropdownContextProps = {
  small?: boolean;
  menuOpened: boolean;
  actionOpened: boolean;
  children: React.ReactNode;
};

type NavigationDropdownContext = {
  small?: boolean;
  isMenuOpened: boolean;
  isActionOpened: boolean;
  onActionOpenedToggle?: (opened: boolean) => void;
  onMenuOpenedToggle?: (opened: boolean) => void;
};

export const NavigationDropdownContext = createNamedContext<NavigationDropdownContext>("NavigationDropdownContext", {
  small: false,
  isMenuOpened: false,
  isActionOpened: false,
});

export default function NavigationContextProvider({ small, menuOpened, children }: NavigationDropdownContextProps) {
  const [isActionOpened, setIsActionOpened] = React.useState<boolean>(menuOpened);
  const [isMenuOpened, setIsMenuOpened] = React.useState<boolean>(menuOpened);
  React.useEffect(() => {
    setIsMenuOpened(menuOpened);
  }, [menuOpened]);

  const onMenuOpenedToggle = (toggleValue: boolean) => {
    setIsMenuOpened(toggleValue);
  };

  const onActionOpenedToggle = (toggleValue: boolean) => {
    setIsActionOpened(toggleValue);
  };

  return (
    <NavigationDropdownContext.Provider
      value={{ small, isMenuOpened, isActionOpened, onMenuOpenedToggle, onActionOpenedToggle }}
    >
      {children}
    </NavigationDropdownContext.Provider>
  );
}
