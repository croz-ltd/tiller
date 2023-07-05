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

import { Tabs as ReachTabs, TabList, TabPanels, TabPanel, Tab as ReachTab, useTabsContext } from "@reach/tabs";

import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";

type TabsProps = {
  /**
   * Content inside the component, most often its subcomponent 'Tabs.Tab'.
   */
  children: React.ReactNode;

  /**
   * Sets a tab with the corresponding index as default selected tab on component render.
   */
  defaultIndex?: number;

  /**
   * Sets a tab with the corresponding index as an active tab on component render.
   */
  index?: number;

  /**
   * Callback function that is called on all tab changes
   */
  onTabChange?: (index: number) => void;

  /**
   * Determines the placement of the icon.
   * Defaults to 'leading'.
   */
  iconPlacement?: "leading" | "trailing";

  /**
   * Applies full width for the component (tabs are spread out for the entire width of the component)
   */
  fullWidth?: boolean;

  /**
   * Add scroll buttons to tabs to make them responsive.
   */
  scrollButtons?: boolean;

  /**
   * Custom additional class name for the main container.
   */
  className?: string;
} & TabsTokenProps;

type TabsTokenProps = {
  tokens?: ComponentTokens<"Tabs">;
};

type TabsTabProp = {
  /**
   * Tab content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Custom additional class name for the tab container.
   */
  className?: string;

  /**
   * Icon to be shown on the left side of the label.
   */
  icon?: React.ReactNode;

  /**
   * Tab label (not exclusively text).
   */
  label: React.ReactNode;

  /**
   * Custom function activated when the tab is clicked.
   * Takes the index of the selected tab as a parameter.
   */
  onClick?: (selectedIndex: number) => void;
};

export type CustomTabProps = {
  /**
   * Tab content (not exclusively text).
   */
  children: React.ReactNode;

  /**
   * Custom additional class name for the custom tab container.
   */
  className?: string;

  /**
   * Expands the tabs to the full width of the container which they belong to.
   * Off by default.
   */
  fullWidth?: boolean;

  /**
   * Icon to be shown on the left side of the label.
   */
  icon?: React.ReactNode;

  /**
   * Determines the placement of the icon.
   * Defaults to 'leading'.
   */
  iconPlacement?: "leading" | "trailing";

  /**
   * Index of the tab, passed on when mapping tabs for onClick function.
   */
  index: number;

  /**
   * Custom function activated when the tab is clicked.
   * Takes the index of the selected tab as a parameter.
   */
  onClick?: (selectedIndex: number) => void;

  /**
   * Make text unwrappable.
   */
  dontWrapText?: boolean;
} & TokenProps<"Tabs">;

type CustomTabsProps = {
  hasScrollButtons: boolean;
  children: React.ReactNode;
  className?: string;
} & TokenProps<"Tabs">;

type WithScrollButtonsProps = {
  shouldWrap: boolean;
  children: JSX.Element;
};

type ScrollButtonProps = {
  onClick?: () => void;
  className?: string;
  type: "left" | "right";
};

type SetButtonsVisibilityType = (timeout: number) => void;

type CustomTabsContextType = {
  setButtonsVisibility: SetButtonsVisibilityType;
  prevButtonShown: boolean;
  setPrevButtonShown: React.Dispatch<React.SetStateAction<boolean>>;
  nextButtonShown: boolean;
  setNextButtonShown: React.Dispatch<React.SetStateAction<boolean>>;
  tabPanel: React.RefObject<HTMLDivElement>;
  scrollable: boolean;
};

const CustomTabsContext = React.createContext<CustomTabsContextType>({} as CustomTabsContextType);

function useCustomTabsContext(scrollable: boolean): CustomTabsContextType {
  const [prevButtonShown, setPrevButtonShown] = React.useState<boolean>(false);
  const [nextButtonShown, setNextButtonShown] = React.useState<boolean>(true);

  const tabPanel = React.useRef<HTMLDivElement>(null);

  const setButtonsVisibility: SetButtonsVisibilityType = (timeout) => {
    setTimeout(function () {
      if (tabPanel.current) {
        const isNotOnContainerStart = tabPanel.current.scrollLeft > 0;
        if (isNotOnContainerStart) {
          setPrevButtonShown(true);
        } else {
          setPrevButtonShown(false);
        }
      }

      if (tabPanel.current) {
        const isScrolledToTheEnd =
          tabPanel.current.scrollLeft === tabPanel.current.scrollWidth - tabPanel.current.offsetWidth;
        if (isScrolledToTheEnd) {
          setNextButtonShown(false);
        } else {
          setNextButtonShown(true);
        }
      }
    }, timeout);
  };
  return {
    setButtonsVisibility,
    prevButtonShown,
    setPrevButtonShown,
    nextButtonShown,
    setNextButtonShown,
    tabPanel,
    scrollable,
  };
}

function Tabs({
  fullWidth,
  children,
  defaultIndex,
  index,
  onTabChange,
  className,
  iconPlacement = "leading",
  scrollButtons = false,
  ...props
}: TabsProps) {
  const childrenArray = React.useMemo(() => React.Children.toArray(children) as React.ReactElement[], [children]);

  const tokens = useTokens("Tabs", props.tokens);

  const tabsContext = useCustomTabsContext(scrollButtons);

  const tabList = React.useMemo(
    () =>
      childrenArray.map((child, key) => {
        return (
          <CustomTab
            key={key}
            index={key}
            icon={child.props.icon}
            fullWidth={fullWidth}
            iconPlacement={iconPlacement}
            onClick={child.props.onClick}
            dontWrapText={scrollButtons}
            className={child.props.className}
            tokens={tokens}
          >
            {child.props.label}
          </CustomTab>
        );
      }),
    [childrenArray],
  );

  const tabPanels = React.useMemo(
    () =>
      childrenArray.map((child, key) => (
        <TabPanel key={key} className="focus:outline-none">
          {child.props.children}
        </TabPanel>
      )),
    [childrenArray],
  );

  return (
    <CustomTabsContext.Provider value={tabsContext}>
      <ReachTabs defaultIndex={defaultIndex} index={index} onChnage={onTabChange}>
        <WithScrollButtons shouldWrap={scrollButtons}>
          <TabList className={className}>
            <CustomTabs hasScrollButtons={scrollButtons} tokens={tokens}>
              {tabList}
            </CustomTabs>
          </TabList>
        </WithScrollButtons>
        <TabPanels>{tabPanels}</TabPanels>
      </ReachTabs>
    </CustomTabsContext.Provider>
  );
}

function WithScrollButtons({ shouldWrap, children }: WithScrollButtonsProps) {
  return shouldWrap ? <ScrollButtonTabs>{children}</ScrollButtonTabs> : children;
}

function ScrollButton({ onClick, className, type }: ScrollButtonProps) {
  const scrollButtonClasses = cx("p-2 text-slate-500 hover:text-slate-700", className);

  const previousIcon = useIcon("paginatorPrevious", undefined, { size: 3 });
  const nextIcon = useIcon("paginatorNext", undefined, { size: 3 });

  const icon = type === "left" ? previousIcon : nextIcon;
  return (
    <button onClick={onClick} className={scrollButtonClasses}>
      {icon}
    </button>
  );
}

function ScrollButtonTabs({ children }) {
  const { tabPanel, setButtonsVisibility, prevButtonShown, nextButtonShown } = React.useContext(CustomTabsContext);

  const resizeObserver = React.useRef<ResizeObserver | null>(null);

  const handleResize: ResizeObserverCallback = (entries) => {
    for (const entry of entries) {
      const isScrollable = entry.target.scrollWidth > entry.contentRect.width;
      if (isScrollable) {
        setButtonsVisibility(300);
      }
    }
  };

  const scrollRight = () => {
    if (tabPanel.current) {
      const tabPanelWidth = tabPanel.current.offsetWidth;
      tabPanel.current.scrollBy({ left: tabPanelWidth, behavior: "smooth" });
      setButtonsVisibility(300);
    }
  };

  const scrollLeft = () => {
    if (tabPanel.current) {
      const tabPanelWidth = tabPanel.current.offsetWidth;
      tabPanel.current.scrollBy({ left: -tabPanelWidth, behavior: "smooth" });
      setButtonsVisibility(300);
    }
  };

  React.useLayoutEffect(() => {
    if (tabPanel.current) {
      resizeObserver.current = new ResizeObserver(handleResize);
      resizeObserver.current.observe(tabPanel.current);
    }

    setButtonsVisibility(0);
  }, []);

  const prevButtonClasses = cx({
    invisible: !prevButtonShown,
  });

  const nextButtonClasses = cx({
    invisible: !nextButtonShown,
  });

  return (
    <div className="flex items-center">
      <ScrollButton type="left" onClick={scrollLeft} className={prevButtonClasses} />
      <div ref={tabPanel} className="overflow-hidden">
        {children}
      </div>
      <ScrollButton type="right" onClick={scrollRight} className={nextButtonClasses} />
    </div>
  );
}

export function TabsTab(_: TabsTabProp) {
  return <></>;
}

function CustomTabs({ children, hasScrollButtons, className, ...props }: CustomTabsProps) {
  const tokens = useTokens("Tabs", props.tokens);

  const customTabsClasses = cx(className, tokens.innerContainer, { [tokens.withoutScrollButtons]: !hasScrollButtons });

  return (
    <div className={tokens.outerContainer}>
      <nav className={customTabsClasses}>{children}</nav>
    </div>
  );
}

function CustomTab({
  fullWidth = false,
  index,
  icon,
  iconPlacement = "leading",
  children,
  onClick,
  dontWrapText,
  className,
  ...props
}: CustomTabProps) {
  const tokens = useTokens("Tabs", props.tokens);
  const { selectedIndex } = useTabsContext();
  const { scrollable } = React.useContext(CustomTabsContext);

  const { setButtonsVisibility } = React.useContext(CustomTabsContext);

  const tab = React.useRef<HTMLDivElement>(null);

  const tabWrapperClassName = cx(
    tokens.Tab.base.padding,
    tokens.Tab.base.width,
    "flex justify-center items-center h-full",
    { [tokens.Tab.withIcon.leading]: icon !== null && iconPlacement === "leading" },
    { [tokens.Tab.withIcon.trailing]: icon !== null && iconPlacement === "trailing" },
    { "flex-row-reverse text-end": iconPlacement === "trailing" },
  );

  const tabClassName = cx(
    className,
    { [tokens.Tab.fullWidth]: fullWidth },
    { [tokens.Tab.noIcon]: icon === null },
    { [tokens.Tab.active.master]: index === selectedIndex },
    { [tokens.Tab.active.borderColor]: index === selectedIndex },
    { [tokens.Tab.active.color]: index === selectedIndex },
    { [tokens.Tab.inactive.master]: index !== selectedIndex },
    { [tokens.Tab.inactive.borderColor]: index !== selectedIndex },
    { [tokens.Tab.inactive.color]: index !== selectedIndex },
    { [tokens.Tab.withScrollButtons]: dontWrapText },
    tokens.Tab.base.master,
    tokens.Tab.base.borderBottomWidth,
    tokens.Tab.base.fontWeight,
    tokens.Tab.base.fontSize,
  );

  const iconClassName = cx(
    { [tokens.Icon.base.leading]: iconPlacement === "leading" },
    { [tokens.Icon.base.trailing]: iconPlacement === "trailing" },
    { [tokens.Icon.active]: index === selectedIndex },
    { [tokens.Icon.inactive]: index !== selectedIndex },
  );

  const handleClick = () => {
    if (onClick) {
      onClick(index);
    }
    if (scrollable) {
      tab.current?.scrollIntoView({ behavior: "smooth", inline: "nearest" });
    }
    setButtonsVisibility(300);
  };

  return (
    <div className={tabClassName} onClick={handleClick} ref={tab}>
      <ReachTab className={tabWrapperClassName} as="a">
        {icon && <div className={iconClassName}>{icon}</div>}
        {children}
      </ReachTab>
    </div>
  );
}

Tabs.Tab = TabsTab;
export default Tabs;
