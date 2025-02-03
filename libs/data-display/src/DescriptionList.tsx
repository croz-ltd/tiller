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

import { Typography } from "@tiller-ds/core";
import { ComponentTokens, cx, TokenProps, useTokens } from "@tiller-ds/theme";
import { tillerTwMerge } from "@tiller-ds/util";

type DescriptionListType = "default" | "striped" | "clean";

type DescriptionListItemType = "default" | "same-column";

type DescriptionListProps = {
  /**
   * Description list content (usually DescriptionList.Item).
   */
  children: React.ReactNode;

  /**
   * Defines the look of the description list.
   * Can be 'default', 'striped' (every second row is colored in a different color) or 'clean' (no fill)
   */
  type?: DescriptionListType;

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
} & DescriptionListTokensProps;

type DescriptionListTokensProps = {
  tokens?: ComponentTokens<"DescriptionList">;
};

type DescriptionListItemProps = {
  /**
   * Label of the list item
   */
  label: React.ReactNode;

  fullWidth?: boolean;

  /**
   * Content of list item
   */
  children: React.ReactNode;

  /**
   * Type of the item. Default is side-by-side display, same-column shows title and item one under another.
   */
  type?: DescriptionListItemType;

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
} & TokenProps<"DescriptionList">;

function DescriptionList({ children, type = "default", className, ...props }: DescriptionListProps) {
  const tokens = useTokens("DescriptionList", props.tokens);

  const childrenArray = React.Children.toArray(children).flatMap((child) => {
    return React.isValidElement(child) ? [child] : [];
  });

  let rows: React.ReactNode[] = [];

  if (type === "clean") {
    for (let i = 0; i < childrenArray.length; i++) {
      if (
        childrenArray[i].props.fullWidth === false &&
        childrenArray[i + 1] &&
        childrenArray[i + 1].props.fullWidth === false
      ) {
        rows.push(
          <>
            <div className={tokens.Type.clean.itemBase}>{childrenArray[i]}</div>
            <div className={tokens.Type.clean.itemBase}>{childrenArray[i + 1]}</div>
          </>,
        );
        i++;
      } else {
        rows.push(<div className={tokens.Type.clean.itemBase}>{childrenArray[i]}</div>);
      }
    }
  } else {
    rows = childrenArray;
  }

  const itemClassName = (index: number) =>
    cx(
      { [tokens.Type.clean.master]: type === "clean" },
      { [tokens.Type.striped.evenRowColor]: index % 2 === 0 && type === "striped" },
      { [tokens.Type.striped.oddRowColor]: index % 2 !== 0 && type === "striped" },
      {
        [`${tokens.Type.default.margin} ${tokens.Type.default.border}  ${tokens.Type.default.borderColor}`]:
          type === "default" && index > 0,
      },
    );

  const transformed = rows.map((child, key) => {
    if (!React.isValidElement(child)) return;

    return (
      <div key={key} className={itemClassName(key)}>
        {child}
      </div>
    );
  });

  const descriptionListContainerClassName = cx(tokens.padding);

  return (
    <dl className={tillerTwMerge(descriptionListContainerClassName, className)} data-testid={props["data-testid"]}>
      {transformed}
    </dl>
  );
}

function DescriptionListItem({ label, children, type = "default", className, ...props }: DescriptionListItemProps) {
  const tokens = useTokens("DescriptionList", props.tokens);

  const descriptionListItemContainerClassName = cx(
    { [tokens.Item.type.default.itemColumnContainer]: type === "default" },
    { [tokens.Item.type.sameColumn.itemColumnContainer]: type === "same-column" },
  );

  const descriptionTermClassName = cx(
    { [tokens.Item.type.default.label]: type === "default" },
    { [tokens.Item.type.sameColumn.label]: type === "same-column" },
  );
  const descriptionDetailsClassName = cx(
    { [tokens.Item.type.default.content]: type === "default" },
    { [tokens.Item.type.sameColumn.content]: type === "same-column" },
  );

  return (
    <div className={tillerTwMerge(descriptionListItemContainerClassName, className)} data-testid={props["data-testid"]}>
      <dt className={descriptionTermClassName}>
        <Typography variant="subtext" className="font-medium">
          {label}
        </Typography>
      </dt>

      <dd className={descriptionDetailsClassName}>
        <Typography>{children}</Typography>
      </dd>
    </div>
  );
}

DescriptionList.Item = DescriptionListItem;
export default DescriptionList;
