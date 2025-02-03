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

import React from "react";

import { Intl, useIntlContext } from "@tiller-ds/intl";
import { ComponentTokens, cx, useTokens } from "@tiller-ds/theme";

import Select from "./Select";
import { tillerTwMerge } from "@tiller-ds/util";

type PageResizerProps = {
  /**
   * Determines the default page size (number of elements). Recommended to be one of the values from the 'pageSizes' array
   * for consistency.
   */
  pageSize: number;

  /**
   * Possible page sizes to choose from. For example '[3,5,10]'.
   */
  pageSizes: number[];

  /**
   * Total number of elements that the page resizer hooks to. Important because, by default behaviour,
   * the page resizer component is not shown if the number of total elements <=5.
   */
  totalElements: number;

  /**
   * Custom function determining what happens when the page size is changed. The function accepts
   * the new page size as a parameter and changes the display of elements accordingly.
   */
  onPageSizeChange: (pageSize: number) => void;

  /**
   * Optional children prop defined as a function which is suitable for supporting an 'Intl' component
   * and evaluating text from translation services.
   */
  children?: (select: React.ReactNode) => React.ReactNode;

  /**
   * Custom classes for the component.
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
} & PageResizerTokensProps;

type PageResizerTokensProps = {
  tokens?: ComponentTokens<"PageResizer">;
};

export default function PageResizer({ pageSizes, onPageSizeChange, children, className, ...props }: PageResizerProps) {
  const intl = useIntlContext();
  const tokens = useTokens("PageResizer", props.tokens);
  const { pageSize, totalElements } = props;

  const onChange = (item: number | number[] | undefined) => {
    if (item && !Array.isArray(item)) {
      onPageSizeChange(item);
    }
  };

  const selectClassName = cx(tokens.select);

  const pageSizeSelect = (
    <Select
      name="value"
      value={pageSize}
      hideClearButton={true}
      options={pageSizes}
      getOptionLabel={(item: number) => item}
      onChange={onChange}
      onBlur={() => ({})}
      className={tillerTwMerge(selectClassName, className)}
      data-testid={props["data-testid"] && `${props["data-testid"]}-select`}
    />
  );

  if (totalElements <= 5) {
    return <div />;
  }

  if (children) {
    return children(pageSizeSelect) as React.ReactElement<any>;
  }

  return (
    <div className={tokens.master} data-testid={props["data-testid"]}>
      {intl ? (
        <Intl name={intl.commonKeys["pageResizerSummary"] as string} params={{ pageSizeSelect: pageSizeSelect }}>
          {{
            pageSizeSelect: () => pageSizeSelect,
          }}
        </Intl>
      ) : (
        <>Show {pageSizeSelect} results per page</>
      )}
    </div>
  );
}
