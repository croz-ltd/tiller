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

import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";
import { createNamedContext, findChildByType, tillerTwMerge } from "@tiller-ds/util";

export type CardProps = {
  /**
   * Determines the status of the card. Convenient for a visual effect while the page is loading.
   */
  status?: "idle" | "waiting";

  /**
   * Content wrapped in a Card.
   */
  children: React.ReactNode;

  /**
   * Determines whether the component is expanded by default.
   */
  isExpanded?: boolean;

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

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement> &
  CardTokensProps;

type CardTokensProps = {
  tokens?: ComponentTokens<"Card">;
};

export type CardHeaderProps = {
  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  removeSpacing?: boolean;

  children: React.ReactNode;

  openExpanderIcon?: React.ReactElement;

  closeExpanderIcon?: React.ReactElement;

  "data-testid"?: string;
} & CardTokensProps;

type CardHeaderTitleProps = {
  /**
   * Card header title content (not exclusively text).
   */
  children: React.ReactNode;
  "data-testid"?: string;
} & TokenProps<"Card">;

type CardHeaderSubtitleProps = {
  children: React.ReactNode;
  "data-testid"?: string;
} & TokenProps<"Card">;

type CardHeaderActionsProps = {
  children: React.ReactNode;
  "data-testid"?: string;
} & TokenProps<"Card">;

export type CardBodyProps = {
  children: React.ReactNode;

  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;

  /**
   * Removes the spacing (padding) from the body of the card.
   */
  removeSpacing?: boolean;
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
} & CardTokensProps;

export type CardFooterProps = {
  /**
   * Custom classes for the container.
   * Overrides conflicting default styles, if any.
   *
   * The provided `className` is processed using `tailwind-merge` to eliminate redundant or conflicting Tailwind classes.
   */
  className?: string;
  children: React.ReactNode;
  "data-testid"?: string;
} & TokenProps<"Card">;

type CardContextProviderProps = {
  children: React.ReactNode;
  flag?: boolean;
};

type CardContext = {
  isExpanded?: boolean;
  onExpanderToggle?: (toggleValue: boolean) => void;
};

const CardContext = createNamedContext<CardContext>("CardContext", { isExpanded: undefined });

function CardContextProvider({ children, flag }: CardContextProviderProps) {
  const [isExpanded, setIsExpanded] = React.useState<boolean | undefined>(flag);
  React.useEffect(() => {
    setIsExpanded(flag);
  }, [flag]);

  const onExpanderToggle = (toggleValue: boolean) => {
    setIsExpanded(toggleValue);
  };

  return <CardContext.Provider value={{ isExpanded, onExpanderToggle }}>{children}</CardContext.Provider>;
}

function Card({ children, status = "idle", isExpanded, className = "", ...props }: CardProps) {
  const tokens = useTokens("Card", props.tokens);
  const loadingIcon = useIcon("loading", undefined, {
    size: tokens.loadingIcon.size,
    className: tokens.loadingIcon.color,
  });

  const containerClassName = cx(
    tokens.container.backgroundColor,
    tokens.container.boxShadow,
    tokens.container.borderRadius,
    tokens.container.overflow,
  );

  const waitingContainerClassName = cx(
    tokens.waitingContainer.master,
    tokens.waitingContainer.backgroundColor,
    tokens.waitingContainer.opacity,
  );

  return (
    <CardContextProvider flag={isExpanded}>
      <div className={tokens.master} data-testid={props["data-testid"]}>
        <div className={tillerTwMerge(containerClassName, className)}>{children}</div>
        {status === "waiting" && (
          <div className={waitingContainerClassName}>
            <div className="flex items-center justify-center w-full h-full">{loadingIcon}</div>
          </div>
        )}
      </div>
    </CardContextProvider>
  );
}

function CardHeader({ className = "", removeSpacing = false, children, ...props }: CardHeaderProps) {
  const { isExpanded, onExpanderToggle } = React.useContext(CardContext);
  const tokens = useTokens("Card", props.tokens);

  const cardHeaderClassName = cx(
    { [tokens.header.padding]: !removeSpacing },
    { [tokens.header.borderBottomWidth]: !removeSpacing },
    { [tokens.header.borderColor]: !removeSpacing },
    { [tokens.header.expandable]: isExpanded !== undefined },
  );

  const title = findChildByType(CardHeaderTitle, children);
  const subtitle = findChildByType(CardHeaderSubtitle, children);
  const actions = findChildByType(CardHeaderActions, children);

  const toggleExpander = () => {
    if (isExpanded !== undefined && onExpanderToggle) {
      onExpanderToggle(!isExpanded);
    }
  };

  const openExpanderIcon = useIcon("openExpander", props.openExpanderIcon, { className: "ml-2", size: 3 });
  const closeExpanderIcon = useIcon("closeExpander", props.closeExpanderIcon, { className: "ml-2", size: 3 });

  if (title || subtitle || actions) {
    return (
      <div className={tillerTwMerge(cardHeaderClassName, className)} onClick={toggleExpander} data-testid={props["data-testid"]}>
        <div className={tokens.header.innerContainer}>
          <div className={tokens.header.titleSubtitleContainer}>
            {title}
            {subtitle}
          </div>
          <div className={tokens.header.actions.outerContainer}>
            {actions}
            {isExpanded !== undefined &&
              React.cloneElement(isExpanded ? closeExpanderIcon : openExpanderIcon, { onClick: toggleExpander })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={tillerTwMerge(cardHeaderClassName, className)} data-testid={props["data-testid"]}>
        {children}
      </div>
    );
  }
}

export function CardHeaderTitle({ children, ...props }: CardHeaderTitleProps) {
  const tokens = useTokens("Card", props.tokens);

  const cardHeaderTitleClassName = cx(
    tokens.header.title.fontSize,
    tokens.header.title.fontWeight,
    tokens.header.title.lineHeight,
    tokens.header.title.color,
  );

  return (
    <h3 className={cardHeaderTitleClassName} data-testid={props["data-testid"]}>
      {children}
    </h3>
  );
}

function CardHeaderSubtitle({ children, ...props }: CardHeaderSubtitleProps) {
  const tokens = useTokens("Card", props.tokens);

  const cardHeaderSubtitleClassName = cx(
    tokens.header.subtitle.marginTop,
    tokens.header.subtitle.fontSize,
    tokens.header.subtitle.lineHeight,
    tokens.header.subtitle.color,
  );
  return (
    <p className={cardHeaderSubtitleClassName} data-testid={props["data-testid"]}>
      {children}
    </p>
  );
}

export function CardHeaderActions({ children, ...props }: CardHeaderActionsProps) {
  const tokens = useTokens("Card", props.tokens);

  return (
    <div className={tokens.header.actions.innerContainer} data-testid={props["data-testid"]}>
      {children}
    </div>
  );
}

function CardBody({ removeSpacing = false, children, className = "", ...props }: CardBodyProps) {
  const { isExpanded } = React.useContext(CardContext);
  const tokens = useTokens("Card", props.tokens);

  const cardBodyClassName = cx({ [tokens.body.padding]: !removeSpacing });

  if (isExpanded === false) {
    return null;
  }

  return (
    <div className={tillerTwMerge(cardBodyClassName, className)} data-testid={props["data-testid"]}>
      {children}
    </div>
  );
}

function CardFooter({ children, className = "", ...props }: CardFooterProps) {
  const { isExpanded } = React.useContext(CardContext);
  const tokens = useTokens("Card", props.tokens);

  const cardFooterClassName = cx(tokens.footer.borderTopWidth, tokens.footer.borderColor, tokens.footer.padding);

  if (isExpanded === false) {
    return null;
  }

  return (
    <div className={tillerTwMerge(cardFooterClassName, className)} data-testid={props["data-testid"]}>
      {children}
    </div>
  );
}

CardHeader.Title = CardHeaderTitle;
CardHeader.Subtitle = CardHeaderSubtitle;
CardHeader.Actions = CardHeaderActions;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
export default Card;
