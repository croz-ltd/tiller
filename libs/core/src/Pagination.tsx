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

import { range, slice } from "lodash";

import { Intl, useIntlContext } from "@tiller-ds/intl";
import { ComponentTokens, cx, useIcon, useTokens } from "@tiller-ds/theme";
import { useViewport } from "@tiller-ds/util";

import ButtonGroups from "./ButtonGroups";

export type PaginationProps = {
  /**
   * Complex values of types PageInfo and Components for formatting purposes.
   */
  children?: (pageInfo: PageInfo, components: Components) => React.ReactNode;

  /**
   * Custom additional class name for the main component.
   */
  className?: string;

  /**
   * Custom icon for going to the next page.
   */
  nextIcon?: React.ReactElement;

  /**
   * Custom function activated when the page changes (takes the current page as a parameter).
   */
  onPageChange?: (page: number) => void;

  /**
   * Defines the current shown page number.
   */
  pageNumber: number;

  /**
   * Defines a calculator for displaying page numbers.
   */
  pagerCalculator?: (pageNumber: number, pageCount: number) => PagerPage[];

  /**
   * Enables or disables the page summary text next to the pagination.
   */
  pageSummary?: boolean;

  /**
   * Defines the size of each page (number of shown elements on each page).
   */
  pageSize: number;

  /**
   * Custom icon for going to the previous page.
   */
  previousIcon?: React.ReactElement;

  /**
   * Defines the total number of elements on a source that the component is hooked up to.
   */
  totalElements: number;
} & PaginationTokensProps;

type PaginationTokensProps = {
  tokens?: ComponentTokens<"Pagination">;
};

type PageInfo = {
  pageNumber: number;

  pageSize: number;

  totalElements: number;

  from: number;

  to: number;
};

type Components = {
  from: React.ReactNode;

  to: React.ReactNode;

  totalElements: React.ReactNode;
};

type CalculatedProps = {
  firstPage: boolean;

  lastPage: boolean;
};

type PaginationState<T> = {
  pageData: T[];

  pageNumber: number;

  pageSize: number;

  totalElements: number;
};

type PaginationHook = {
  onPageChange: (page: number) => void;
};

export function useLocalPagination<T>(data: T[], pageSize = 10): [PaginationState<T>, PaginationHook] {
  const [pageNumber, setPageNumber] = React.useState(0);

  const state = React.useMemo(() => {
    const pageData = slice(data, pageNumber * pageSize, Math.min((pageNumber + 1) * pageSize, data.length));

    return {
      pageData,
      pageNumber,
      pageSize,
      totalElements: data.length,
    };
  }, [pageNumber, pageSize, data]);

  const hook = React.useMemo(() => ({ onPageChange: setPageNumber }), []);

  return [state, hook];
}

export default function Pagination(props: PaginationProps) {
  const { pageNumber, pageSize, totalElements, pageSummary = true } = props;
  const tokens = useTokens("Pagination", props.tokens);

  const calculatedProps: CalculatedProps = {
    firstPage: pageNumber === 0,
    lastPage: (pageNumber + 1) * pageSize >= totalElements,
  };

  return (
    <section className={tokens.master}>
      {pageSummary && <PageSummary {...props} />}
      <Pager {...props} {...calculatedProps} />
    </section>
  );
}

function PageSummary({ pageNumber, pageSize, totalElements, children, ...props }: PaginationProps) {
  const intl = useIntlContext();
  const tokens = useTokens("Pagination", props.tokens);

  const calculatedFrom = pageNumber * pageSize;
  // user counting starts from 1
  const from = totalElements === 0 ? calculatedFrom : calculatedFrom + 1;
  const to = Math.min(totalElements, (pageNumber + 1) * pageSize);

  const pageSummaryClassName = cx(tokens.pageSummary.fontSize, tokens.pageSummary.lineHeight, tokens.pageSummary.color);

  const fromElement = <span className="font-medium">{from}</span>;
  const toElement = <span className="font-medium">{to}</span>;
  const totalElement = <span className="font-medium">{totalElements}</span>;

  if (children) {
    return children(
      { pageNumber, pageSize, totalElements, from, to },
      { from: fromElement, to: toElement, totalElements: totalElement },
    ) as React.ReactElement;
  }

  return (
    <p className={pageSummaryClassName}>
      {intl ? (
        <Intl
          name={intl.commonKeys["paginationSummary"] as string}
          params={{ from: fromElement, to: toElement, total: totalElement }}
        >
          {{
            from: () => fromElement,
            to: () => toElement,
            total: () => totalElement,
          }}
        </Intl>
      ) : (
        <>
          Showing {fromElement} to {toElement} of {totalElement} results
        </>
      )}
    </p>
  );
}

function Pager({
  pageNumber,
  pageSize,
  totalElements,
  onPageChange,
  pagerCalculator = DefaultPagerCalculator,
  ...props
}: PaginationProps) {
  const tokens = useTokens("Pagination", props.tokens);
  const displayType = useViewport();
  const pageCount = Math.ceil(totalElements / pageSize);

  const defaultButtonTokens: ComponentTokens<"Button"> = {
    variant: {
      filled: {
        color: {
          gray: {
            backgroundColor: tokens.default.backgroundColor,
            borderColor: tokens.default.borderColor,
            textColor: tokens.default.textColor,
          },
        },
      },
    },
  };

  const currentButtonTokens: ComponentTokens<"Button"> = {
    variant: {
      filled: {
        color: {
          gray: {
            backgroundColor: tokens.current.backgroundColor,
            borderColor: tokens.current.borderColor,
            textColor: tokens.current.textColor,
          },
        },
      },
    },
  };

  const iconPrevious = useIcon("paginatorPrevious", props.previousIcon, { size: 3, className: "my-[3px]" });
  const iconNext = useIcon("paginatorNext", props.nextIcon, { size: 3, className: "my-[3px]" });

  return (
    <div>
      <ButtonGroups>
        <ButtonGroups.IconButton
          variant="filled"
          color="gray"
          size={displayType === "DESKTOP" ? "md" : "sm"}
          tokens={defaultButtonTokens}
          disabled={pageNumber === 0 || totalElements === 0}
          onClick={() => onPageChange && onPageChange(pageNumber - 1)}
        >
          {iconPrevious}
        </ButtonGroups.IconButton>
        {pagerCalculator(pageNumber + 1, pageCount).map((value, key) => {
          if (value === "dots") {
            return (
              <ButtonGroups.Button
                key={key}
                variant="filled"
                color="gray"
                size={displayType === "DESKTOP" ? "md" : "sm"}
                tokens={defaultButtonTokens}
                className="cursor-default"
              >
                ...
              </ButtonGroups.Button>
            );
          }

          return (
            <ButtonGroups.Button
              key={key}
              variant="filled"
              color="gray"
              size={displayType === "DESKTOP" ? "md" : "sm"}
              tokens={pageNumber + 1 === value ? currentButtonTokens : defaultButtonTokens}
              onClick={() => onPageChange && onPageChange(value - 1)}
            >
              {value}
            </ButtonGroups.Button>
          );
        })}

        <ButtonGroups.IconButton
          variant="filled"
          color="gray"
          size={displayType === "DESKTOP" ? "md" : "sm"}
          tokens={defaultButtonTokens}
          disabled={pageNumber + 1 === pageCount || totalElements === 0}
          onClick={() => onPageChange && onPageChange(pageNumber + 1)}
        >
          {iconNext}
        </ButtonGroups.IconButton>
      </ButtonGroups>
    </div>
  );
}

type PagerPage = "dots" | number;

function DefaultPagerCalculator(pageNumber: number, pageCount: number): PagerPage[] {
  const displayType = useViewport();
  let pages: PagerPage[];

  if (displayType === "LARGE_MOBILE" && pageCount > 5) {
    if (pageNumber === 1 || pageNumber === 2 || pageNumber === 3) {
      pages = [1, 2, 3, "dots", pageCount];
    } else if (pageNumber === pageCount - 2 || pageNumber === pageCount - 1 || pageNumber === pageCount) {
      pages = [1, "dots", pageCount - 2, pageCount - 1, pageCount];
    } else {
      pages = [1, "dots", pageNumber, "dots", pageCount];
    }
  } else if (displayType === "SMALL_MOBILE" && pageCount > 3) {
    if (pageNumber === 1 || pageNumber === pageCount) {
      pages = [1, "dots", pageCount];
    } else if (pageNumber === 2) {
      pages = [1, 2, "dots"];
    } else if (pageNumber === pageCount - 1) {
      pages = ["dots", pageCount - 1, pageCount];
    } else {
      pages = ["dots", pageNumber, "dots"];
    }
  } else {
    let delta: number;
    if (pageCount <= 7) {
      delta = 7;
    } else {
      delta = pageNumber > 4 && pageNumber < pageCount - 3 ? 2 : 4;
    }

    const arrayRange = {
      start: Math.round(pageNumber - delta / 2),
      end: Math.round(pageNumber + delta / 2),
    };

    if (arrayRange.start - 1 === 1 || arrayRange.end + 1 === pageCount) {
      arrayRange.start += 1;
      arrayRange.end += 1;
    }

    pages =
      pageNumber > delta
        ? range(Math.min(arrayRange.start, pageCount - delta), Math.min(arrayRange.end, pageCount) + 1)
        : range(1, Math.min(pageCount, delta + 1) + 1);

    const withDots = (value: any, pair: any) => (pages.length + 1 !== pageCount && pages.length !== 0 ? pair : [value]);
    if (pages[0] !== 1) {
      pages = withDots(1, [1, "dots"]).concat(pages);
    }

    if (pages[pages.length - 1] < pageCount) {
      pages = pages.concat(withDots(pageCount, ["dots", pageCount]));
    }
  }

  return pages;
}
