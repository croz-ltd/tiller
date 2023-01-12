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

import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";
import { createNamedContext, findChild } from "@tiller-ds/util";

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
} & React.HTMLAttributes<HTMLDivElement> &
  CardTokensProps;

type CardTokensProps = {
  tokens?: ComponentTokens<"Card">;
};

export type CardHeaderProps = {
  className?: string;

  removeSpacing?: boolean;

  children: React.ReactNode;

  expanderOpenIcon?: React.ReactElement;

  expanderCloseIcon?: React.ReactElement;
} & CardTokensProps;

type CardHeaderTitleProps = {
  /**
   * Card header title content (not exclusively text).
   */
  children: React.ReactNode;
} & TokenProps<"Card">;

type CardHeaderSubtitleProps = {
  children: React.ReactNode;
} & TokenProps<"Card">;

type CardHeaderActionsProps = {
  children: React.ReactNode;
};

export type CardBodyProps = {
  children: React.ReactNode;

  /**
   * Removes the spacing (padding) from the body of the card.
   */
  removeSpacing?: boolean;
} & CardTokensProps;

export type CardFooterProps = {
  className?: string;

  children: React.ReactNode;
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
    className,
    tokens.container.backgroundColor,
    tokens.container.boxShadow,
    tokens.container.borderRadius,
    tokens.container.overflow
  );

  const waitingContainerClassName = cx(
    "absolute w-full h-full top-0 left-0 z-1",
    tokens.waitingContainer.backgroundColor,
    tokens.waitingContainer.opacity
  );

  return (
    <CardContextProvider flag={isExpanded}>
      <div className={tokens.master}>
        <div className={containerClassName}>{children}</div>
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
    className,
    { [tokens.header.padding]: !removeSpacing },
    { [tokens.header.borderBottomWidth]: !removeSpacing },
    { [tokens.header.borderColor]: !removeSpacing },
    { "cursor-pointer": isExpanded !== undefined }
  );

  const title = findChild("CardHeaderTitle", children);
  const subtitle = findChild("CardHeaderSubtitle", children);
  const actions = findChild("CardHeaderActions", children);

  const toggleExpander = () => {
    if (isExpanded !== undefined && onExpanderToggle) {
      onExpanderToggle(!isExpanded);
    }
  };

  const expanderOpenIcon = useIcon("expanderOpen", props.expanderOpenIcon, { className: "ml-2", size: 3 });
  const expanderCloseIcon = useIcon("expanderClose", props.expanderCloseIcon, { className: "ml-2", size: 3 });

  if (title || subtitle || actions) {
    return (
      <div className={cardHeaderClassName} onClick={toggleExpander}>
        <div className="-ml-4 -mt-4 flex justify-between items-center sm:flex-nowrap">
          <div className="ml-4 mt-4">
            {title}
            {subtitle}
          </div>
          <div className="mt-4 justify-between items-center flex sm:flex-nowrap">
            {actions}
            {isExpanded !== undefined &&
              React.cloneElement(!isExpanded ? expanderCloseIcon : expanderOpenIcon, { onClick: toggleExpander })}
          </div>
        </div>
      </div>
    );
  } else {
    return <div className={cardHeaderClassName}>{children}</div>;
  }
}

export function CardHeaderTitle({ children, ...props }: CardHeaderTitleProps) {
  const tokens = useTokens("Card", props.tokens);

  const cardHeaderTitleClassName = cx(
    tokens.header.title.fontSize,
    tokens.header.title.fontWeight,
    tokens.header.title.lineHeight,
    tokens.header.title.color
  );

  return <h3 className={cardHeaderTitleClassName}>{children}</h3>;
}

CardHeaderTitle.defaultProps = {
  type: "CardHeaderTitle",
};

function CardHeaderSubtitle({ children, ...props }: CardHeaderSubtitleProps) {
  const tokens = useTokens("Card", props.tokens);

  const cardHeaderSubtitleClassName = cx(
    tokens.header.subtitle.marginTop,
    tokens.header.subtitle.fontSize,
    tokens.header.subtitle.lineHeight,
    tokens.header.subtitle.color
  );
  return <p className={cardHeaderSubtitleClassName}>{children}</p>;
}

CardHeaderSubtitle.defaultProps = {
  type: "CardHeaderSubtitle",
};

export function CardHeaderActions({ children }: CardHeaderActionsProps) {
  return <div className="flex-shrink-0 ml-4 space-x-2">{children}</div>;
}

CardHeaderActions.defaultProps = {
  type: "CardHeaderActions",
};

function CardBody({ removeSpacing = false, children, ...props }: CardBodyProps) {
  const { isExpanded } = React.useContext(CardContext);
  const tokens = useTokens("Card", props.tokens);

  const className = cx({ [tokens.body.padding]: !removeSpacing });

  if (isExpanded === false) {
    return null;
  }

  return <div className={className}>{children}</div>;
}

function CardFooter({ children, className = "", ...props }: CardFooterProps) {
  const { isExpanded } = React.useContext(CardContext);
  const tokens = useTokens("Card", props.tokens);

  const cardFooterClassName = cx(
    tokens.footer.borderTopWidth,
    tokens.footer.borderColor,
    tokens.footer.padding,
    className
  );

  if (isExpanded === false) {
    return null;
  }

  return <div className={cardFooterClassName}>{children}</div>;
}

CardHeader.Title = CardHeaderTitle;
CardHeader.Subtitle = CardHeaderSubtitle;
CardHeader.Actions = CardHeaderActions;
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
export default Card;
