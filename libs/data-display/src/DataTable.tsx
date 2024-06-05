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

import { every, find, flatMap, identity, isEqual, pickBy, sum } from "lodash";
import _ from "lodash";
import {
  Cell,
  Column,
  HeaderProps,
  Row,
  useExpanded,
  UseExpandedRowProps,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

import { Card, CardHeaderProps } from "@tiller-ds/core";
import { Checkbox } from "@tiller-ds/form-elements";
import { ComponentTokens, cx, TokenProps, useIcon, useTokens } from "@tiller-ds/theme";
import { createNamedContext, findChild } from "@tiller-ds/util";

type DataTableChild<T extends object> =
  | React.ReactElement<DataTableColumnProps<T> | DataTableExpanderProps<T>>
  | React.ReactElement<DataTableColumnProps<T> | DataTableExpanderProps<T>>[]
  | undefined;

export type DataTableProps<T extends object> = {
  /**
   * Aligns the headers of the data table to a specific position.
   */
  alignHeader?: "left" | "right" | "center" | "justify";

  /**
   * Children wrapped in the data table. Most often DataTable.Column, DataTable.Selector,
   * DataTable.CardHeader, etc.
   */
  children: DataTableChild<T> | DataTableChild<T>[];

  /**
   * Data array of any type to be shown in the data table.
   */
  data: T[];

  /**
   * Receives an object array of type SortInfo (column, sortDirection) and sorts
   * the data table accordingly. Column attribute represents a string which corresponds
   * to a certain column name, while sortDirection is either ASCENDING or DESCENDING.
   */
  defaultSortBy?: SortInfo[];

  /**
   * For getting each item's unique identifier on DataTable initialization.
   * Ex. (item: Item) => item.id
   */
  getItemId?: (item: T, index: number) => string | number;

  /**
   * Useful for styling each row conditionally. For example, if item's id % 2 === 0
   * set the row class name to pink (return pink), otherwise return purple.
   */
  getRowClassName?: (values: T, index: number) => string;

  /**
   * Hook for connecting the data table to a variable which uses the 'useDataTable()' hook.
   * The hook manages selection of items in the data table, sorting, etc.
   */
  hook?: DataTableHook;

  /**
   * Makes the rows clickable and executes a custom function when a single click is executed.
   * The function takes the entity of a clicked row as a parameter.
   *
   * @note If a button is placed within a row, ensure to call `e.stopPropagation()` within its
   * `onClick` event handler to prevent event bubbling and unintended triggering of the
   * row's `onClick` handler. This isolates button actions and prevents conflicts.
   */
  onClick?: (rowValue: T) => void;

  /**
   * Makes the rows double clickable and executes a custom function when a double click is executed.
   * The function takes the entity of a clicked row as a parameter.
   *
   * @note If a button is placed within a row, ensure to call `e.stopPropagation()` within its
   * `onDoubleClick` event handler to prevent event bubbling and unintended triggering of the
   * row's `onDoubleClick` handler. This isolates button actions and prevents conflicts.
   */
  onDoubleClick?: (rowValue: T) => void;

  /**
   * Identifies the row which can be edited.
   */
  rowEditingIndex?: number;

  /**
   * Determines whether the row can be saved according to its value.
   * Useful if, for example, a validation fails, and you want to disable the save button accordingly.
   */
  saveEnabled?: boolean;

  /**
   * Enables the display of a footer below the data table.
   */
  showFooter?: boolean;

  /**
   * Enables the display of a header above the data table.
   */
  showHeader?: boolean;

  /**
   * Enables fixed first column in horizontal scroll data table.
   */
  firstColumnFixed?: boolean;

  /**
   * Enables fixed last column in horizontal scroll data table.
   */
  lastColumnFixed?: boolean;

  /**
   * Custom additional class name for the main container.
   */
  className?: string;

  /**
   * Content to be displayed when the dataset is empty.
   */
  emptyState?: React.ReactNode;

  /**
   * Enable or disable multi-column sorting.
   * When set to true, users can sort by multiple columns simultaneously.
   */
  multiSort?: boolean;
} & DataTableTokensProps;

type DataTableTokensProps = {
  tokens?: ComponentTokens<"DataTable">;
};

type Meta = {
  isEditMode: boolean;
};

type DataTableColumnProps<T extends object> = {
  /**
   * Represents the column label in the header (not exclusively text).
   */
  header?: React.ReactNode;
  /**
   * Represents the column label in the footer (not exclusively text).
   * Note that the default value of the showFooter DataTable prop is false, so it needs to be set to true.
   */
  footer?: React.ReactNode;
  /**
   * The title prop adds a tooltip with title text to the table header/footer cell.
   * Hovering the mouse over the header/footer cell will display the tooltip.
   */
  title?: string;
  /**
   * Custom column className.
   */
  className?: string;
  /**
   * Determines whether this column is sortable when clicking on its header.
   */
  canSort?: boolean;
  /**
   * Defines the number of columns a cell should span.
   */
  colSpan?: number;
  /**
   * Aligns the column data to a specific position.
   */
  align?: "left" | "right" | "center" | "justify";
} & (
  | {
      /**
       * Accessor is the key in the data (used for mapping column to the matching data).
       * (check here for details: https://react-table-v7.tanstack.com/docs/api/useTable#column-options).
       */
      accessor: string;
    }
  | {
      /**
       * Additional options to pass onto as children of the column.
       * item: describes current item shown in the cell.
       * index: represents the index of the item (starting at 0).
       * row: check https://react-table-v7.tanstack.com/docs/api/useTable#row-properties.
       * isEditMode: returns true if the column is currently in edit mode.
       * saveEnabled: returns false if there is no value present in the selected column (useful for disabling save buttons when editing).
       */
      children: (item: T, index: number, row: Row<T>, isEditMode: Meta, saveEnabled: boolean) => React.ReactNode;
      /**
       * Unique ID for the column. It is used by reference in things like sorting, grouping, filtering etc.
       * If a string accessor is used, it defaults as the column ID, but can be overridden if necessary.
       */
      id: string;
    }
) &
  TokenProps<"DataTable">;

type DataTableExpanderProps<T> = {
  children: (item: T) => React.ReactNode;
};

type DataTableSelectorProps<T extends object> = {
  /**
   * Defines whether a given row should be selectable.
   */
  predicate?: (item: T, index: number) => boolean;
  children?: (item: T, index: number, row: Row<T>, predicate: boolean) => React.ReactNode;
};

type DataTableHeaderProps = {
  /**
   * Aligns the headers of the data table to a specific position.
   */
  alignHeader?: "left" | "right" | "center" | "justify";

  isSorted?: boolean;

  isSortedDesc?: boolean;

  children: React.ReactNode;

  canSort: boolean;

  sortDescIcon?: React.ReactElement;

  sortAscIcon?: React.ReactElement;
} & TokenProps<"DataTable">;

type DataTableFooterProps = {
  children: React.ReactNode;
};

type DataTableCardHeaderProps = {
  /**
   * Content wrapped in the data table card header. Most often DataTable.CardHeader.Title and DataTable.CardHeader.Actions.
   */
  children?: React.ReactNode;

  /**
   * Selects the desired number of rows and shows message in header that this number of rows are selected.
   */
  selectedCount: number;

  /**
   * Selects all rows in DataTable and shows message in header that all rows are selected.
   */
  isAllRowsSelected: boolean;

  /**
   * Changes the number of total elements in the message when selecting rows (e.g. 5 selected out of {totalElements} items).
   */
  totalElements: number;
} & CardHeaderProps;

type DataTableInfo<T extends object> = {
  columns: Array<Column<T>>;
  renderExpandedRow?: (item: T) => React.ReactNode;
};

type DataTableHook = {
  setSelected: (selection: Record<string, boolean>, isAllRowsSelected: boolean) => void;
  setSortBy: (sort: SortInfo[]) => void;
  selected: Record<string, boolean>;
  isAllRowsSelected: boolean;
  toggleSelectAll: () => void;
};

export type SortInfo = {
  column: string;

  sortDirection: "ASCENDING" | "DESCENDING";
};

type DataTableCardHeaderContextProviderProps = {
  children: React.ReactNode;

  selectedCount: number;

  isAllRowsSelected: boolean;

  totalElements: number;
};

type DataTableCardHeaderContext = {
  selectedCount?: number;

  totalElements?: number;

  isAllRowsSelected?: boolean;
};

type DataTablePrimaryRowProps = {
  children: React.ReactNode;
};

DataTablePrimaryRow.defaultProps = {
  type: "DataTablePrimaryRow",
};

type DataTableSecondaryRowProps = {
  children: React.ReactNode;
};

DataTableSecondaryRow.defaultProps = {
  type: "DataTableSecondaryRow",
};

const DataTableCardHeaderContext = createNamedContext<DataTableCardHeaderContext>("DataTableCardHeaderContext", {});

function DataTableCardHeaderContextProvider({
  selectedCount,
  isAllRowsSelected,
  totalElements,
  children,
}: DataTableCardHeaderContextProviderProps) {
  return (
    <DataTableCardHeaderContext.Provider value={{ selectedCount, totalElements, isAllRowsSelected }}>
      {children}
    </DataTableCardHeaderContext.Provider>
  );
}

type UseDataTable = [
  {
    selected: Record<string, boolean>;

    selectedCount: number;

    isAllRowsSelected: boolean;

    sortBy: SortInfo[];
  },

  DataTableHook,
];

type DataTableCardHeaderSelectorProps = {
  children?: (selectorInfo: SelectorInfo) => React.ReactNode;
};

DataTableCardHeaderSelector.defaultProps = {
  type: "CardHeaderSelector",
};

type SelectorInfo = {
  selectedCount: React.ReactNode;

  totalElements: React.ReactNode;
};

type DataTableContext<T> = {
  data: T[];

  totalNumberOfElements: number;

  hook?: DataTableHook;

  getItemId: (item: T, index: number) => string | number;

  predicate: (item: T, index: number) => boolean;
};

const DataTableContext = createNamedContext<DataTableContext<any>>("DataTableContext");

export function useDataTableContext<T = unknown>(): DataTableContext<T> {
  const context = React.useContext(DataTableContext);

  if (!context) {
    throw new Error("useDataTableContext must be used within a DataTableProvider");
  }

  return context as DataTableContext<T>;
}

type UseDataTableProps = {
  defaultSortBy?: SortInfo[];
};

export function useDataTable({ defaultSortBy = [] }: UseDataTableProps = {}): UseDataTable {
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const [selectedCount, setSelectedCount] = React.useState<number>(0);
  const [isAllRowsSelected, setIsAllRowsSelected] = React.useState<boolean>(false);
  const [sortBy, setSortBy] = React.useState<SortInfo[]>(defaultSortBy);

  const updateSelected = React.useCallback((newSelected: Record<string, boolean>, newIsAllRowsSelected: boolean) => {
    const filteredNewSelected = pickBy(newSelected, identity);
    setSelected(filteredNewSelected);
    setSelectedCount(Object.keys(filteredNewSelected).length);
    setIsAllRowsSelected(newIsAllRowsSelected);
  }, []);

  const toggleSelectAll = React.useCallback(() => {
    setIsAllRowsSelected((value) => !value);
  }, []);

  const updateSortBy = React.useCallback(
    (newSortBy: SortInfo[]) => {
      if (!isEqual(sortBy, newSortBy)) {
        setSortBy(newSortBy);
      }
    },
    [sortBy],
  );

  const state = React.useMemo(
    () => ({ selected, selectedCount, isAllRowsSelected, sortBy }),
    [selected, selectedCount, isAllRowsSelected, sortBy],
  );

  const hook = React.useMemo(
    () => ({
      setSelected: updateSelected,
      setSortBy: updateSortBy,
      selected,
      isAllRowsSelected,
      toggleSelectAll,
    }),
    [updateSelected, updateSortBy, selected, isAllRowsSelected, toggleSelectAll],
  );

  return [state, hook];
}

type Operation = "sum" | "average";

const operations = {
  sum: sum,
  average: (data: any[]) => sum(data) / data.length,
};

type DataTableSummary<T> = {
  key: keyof T;
  operation: Operation;
};

export function useLocalSummary<T>(
  data: T[],
  summaryList: DataTableSummary<T>[],
): Record<keyof T, Record<Operation, number>> {
  const summaryResult = {} as Record<keyof T, Record<Operation, number>>;

  summaryList.forEach((summary) => {
    const keyValues = data.map((item) => item[summary.key]);
    summaryResult[summary.key] = summaryResult[summary.key] ?? ({} as Record<Operation, number>);
    summaryResult[summary.key][summary.operation] = operations[summary.operation](keyValues);
  });

  return summaryResult;
}

function DataTable<T extends object>({
  data,
  hook,
  showHeader = true,
  alignHeader = "left",
  showFooter = false,
  children,
  defaultSortBy = [],
  getItemId = (_, index) => index,
  onClick,
  onDoubleClick,
  getRowClassName,
  rowEditingIndex,
  saveEnabled = true,
  firstColumnFixed,
  lastColumnFixed,
  className,
  multiSort = false,
  ...props
}: DataTableProps<T>) {
  const primaryRow = findChild("DataTablePrimaryRow", children);
  const secondaryRow = findChild("DataTableSecondaryRow", children);
  const hasSecondaryColumns = React.isValidElement(secondaryRow);

  const primaryColumnChildren = React.useMemo(() => {
    return mapChildren(React.isValidElement(primaryRow) ? primaryRow.props.children : children);
  }, [primaryRow, children]);

  const primaryColumnChildrenArray = React.Children.toArray(primaryColumnChildren).filter(Boolean);
  const columnChildrenSize = primaryColumnChildrenArray.length;

  const secondaryColumnChildren = React.useMemo(() => {
    return React.isValidElement(secondaryRow) ? mapChildren(secondaryRow.props.children) : null;
  }, [secondaryRow, children]);

  const secondaryColumnChildrenArray = React.Children.toArray(secondaryColumnChildren).filter(Boolean);

  function mapChildren(children: DataTableChild<T>[]) {
    return children.map((child) => {
      if (!child) {
        return undefined;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (Array.isArray(child.props?.children)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return mapChildren(child.props?.children);
      } else {
        return child;
      }
    });
  }

  const totalColumnChildrenSize = hasSecondaryColumns
    ? secondaryColumnChildrenArray.length + columnChildrenSize
    : columnChildrenSize;

  const columnChildren = React.useMemo(
    () => primaryColumnChildrenArray.concat(secondaryColumnChildrenArray),
    [primaryColumnChildren, secondaryColumnChildren],
  );

  const { columns, renderExpandedRow } = React.useMemo(() => {
    return extractFromChildren<T>(columnChildren, rowEditingIndex, saveEnabled);
  }, [columnChildren]);

  const sortBy = defaultSortBy?.map((sort) => ({
    id: sort.column,
    desc: sort.sortDirection === "DESCENDING",
  }));

  const getRowId = React.useCallback(
    (row: T, relativeIndex: number, parent?: Row<T>) => {
      return parent ? [parent.id, getItemId(row, relativeIndex)].join(".") : getItemId(row, relativeIndex).toString();
    },
    [getItemId],
  );
  const tokens = useTokens("DataTable", props.tokens);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state,
    toggleSortBy,
  } = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      autoResetSelectedRows: false,
      autoResetSortBy: false,
      manualSortBy: true,
      initialState: {
        sortBy,
      },
      getRowId,
    },
    useSortBy,
    useExpanded,
    useRowSelect,
  );

  React.useEffect(() => {
    const sorts: SortInfo[] = state.sortBy.map((sortBy) => ({
      column: sortBy.id,
      sortDirection: sortBy.desc ? "DESCENDING" : "ASCENDING",
    }));

    if (hook) {
      hook.setSortBy(sorts);
    }
  }, [hook, state.sortBy]);

  const tableCellClassName = (
    className: string,
    align: string,
    hasBorder: boolean,
    isSecondaryRow: boolean,
    cellIndex: number,
  ) =>
    cx(
      { [tokens.primaryRowSpacing]: !isSecondaryRow },
      { [tokens.secondaryRowSpacing]: isSecondaryRow },
      { [tokens.rowBorder]: hasBorder },
      {
        [tokens.tableCell.backgroundSticky]:
          (firstColumnFixed && cellIndex === 0) || (lastColumnFixed && cellIndex === columns.length - 1),
      },
      tokens.tableCell.fontSize,
      tokens.tableCell.fontWeight,
      tokens.tableCell.color,
      tokens.align[align],
      className,
    );

  const tableFooterClassName = (className: string, align: string) => cx(className, tokens.align[align]);

  const tableRowClassName = (index: number) =>
    cx({ [tokens.tableRow.even]: index % 2 === 0 }, { [tokens.tableRow.odd]: index % 2 !== 0 });

  const onClickClasses = cx({
    "cursor-pointer": onClick || onDoubleClick,
  });

  const containerClassName = cx(className, tokens.container.master, tokens.container.borderRadius, {
    "sticky-first": firstColumnFixed,
    "sticky-last": lastColumnFixed,
    "unset-first": !firstColumnFixed,
    "unset-last": !lastColumnFixed,
  });

  const tableHeaderClassName = cx(
    tokens.tableHeader.master,
    tokens.tableHeader.borderColor,
    tokens.tableHeader.backgroundColor,
    tokens.tableHeader.color,
    tokens.tableHeader.fontWeight,
    tokens.tableHeader.fontSize,
    tokens.tableHeader.padding,
  );

  const tableInnerFooterClassName = cx(
    tokens.tableFooter.master,
    tokens.tableFooter.borderColor,
    tokens.tableFooter.backgroundColor,
    tokens.tableFooter.color,
    tokens.tableFooter.fontWeight,
    tokens.tableFooter.fontSize,
    tokens.tableFooter.padding,
  );

  const selectorColumn = find(columns, (column) => column.id === "selector");
  const predicate = selectorColumn?.["predicate"];

  return (
    <DataTableContext.Provider
      value={{
        totalNumberOfElements: data.length,
        data,
        hook,
        getItemId,
        predicate,
      }}
    >
      <div className="flex flex-col">
        <div className={containerClassName}>
          <table {...getTableProps()} className="min-w-full">
            {showHeader && (
              <thead>
                {headerGroups.map((headerGroup, headerGroupKey) => (
                  <tr key={headerGroupKey} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.slice(0, columnChildrenSize).map((column, columnKey) => (
                      <th
                        key={columnKey}
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={tableHeaderClassName}
                        title={column.title}
                        onClick={() => {
                          if (column.canSort) {
                            toggleSortBy(column.id, undefined, multiSort);
                          }
                        }}
                      >
                        <DataTableHeader alignHeader={alignHeader} {...column}>
                          {column.render("Header")}
                        </DataTableHeader>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
            )}
            <tbody {...getTableBodyProps()}>
              {props.emptyState && !data.length ? (
                <tr>
                  <td colSpan={visibleColumns.length}>{props.emptyState}</td>
                </tr>
              ) : (
                rows.map((row, rowKey) => {
                  prepareRow(row);

                  const primaryCells = _.slice(row.cells, 0, columnChildrenSize);
                  const secondaryCells = hasSecondaryColumns
                    ? row.cells.slice(columnChildrenSize, totalColumnChildrenSize)
                    : [];
                  return (
                    <React.Fragment key={rowKey}>
                      <tr
                        {...row.getRowProps()}
                        className={cx(
                          tableRowClassName(rowKey),
                          onClickClasses,
                          getRowClassName?.(row.original, rowKey),
                        )}
                      >
                        {primaryCells.map((cell, cellKey) => {
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          const colSpan = cell.column.colSpan;
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          const align = cell.column.align;
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          const isSelector = cell.column.id === "selector";
                          return (
                            <td
                              key={cellKey}
                              className={tableCellClassName(
                                cell.column.className || "",
                                align,
                                !hasSecondaryColumns,
                                false,
                                cellKey,
                              )}
                              {...cell.getCellProps()}
                              colSpan={colSpan}
                              onClick={() => (onClick && !isSelector ? onClick(row.original) : undefined)}
                              onDoubleClick={() =>
                                onDoubleClick && !isSelector ? onDoubleClick(row.original) : undefined
                              }
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                      {hasSecondaryColumns && (
                        <tr
                          {...row.getRowProps()}
                          className={cx(
                            tableRowClassName(rowKey),
                            onClickClasses,
                            getRowClassName?.(row.original, rowKey),
                          )}
                          onDoubleClick={() => (onDoubleClick ? onDoubleClick(row.original) : undefined)}
                        >
                          {secondaryCells.map((cell, cellKey) => {
                            // @ts-ignore
                            const colSpan = cell.column.colSpan;
                            // @ts-ignore
                            const align = cell.column.align;
                            return (
                              <td
                                key={cellKey}
                                className={tableCellClassName(cell.column.className || "", align, true, true, rowKey)}
                                {...cell.getCellProps()}
                                colSpan={colSpan}
                                onClick={() => (onClick ? onClick(row.original) : undefined)}
                                onDoubleClick={() => (onDoubleClick ? onDoubleClick(row.original) : undefined)}
                              >
                                <div className="flex flex-col text-xs">
                                  <div className="font-bold">
                                    <>{cell.column.Header}</>
                                  </div>
                                  <div>{cell.render("Cell")}</div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      )}
                      {renderExpandedRow && row.isExpanded ? (
                        <tr className={tableRowClassName(rowKey)}>
                          <td
                            colSpan={visibleColumns.length}
                            className={tableCellClassName("", "text-left", true, false, rowKey)}
                          >
                            {renderExpandedRow(row.original)}
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
            {showFooter && (
              <tfoot>
                {footerGroups.map((footerGroup, footerGroupKey) => (
                  <tr key={footerGroupKey} {...footerGroup.getFooterGroupProps()}>
                    {footerGroup.headers.slice(0, columnChildrenSize).map((column, columnKey) => (
                      <td
                        key={columnKey}
                        {...column.getFooterProps(column.getSortByToggleProps())}
                        // @ts-ignore
                        className={tableFooterClassName(tableInnerFooterClassName, column.align)}
                        title={column.title}
                      >
                        <DataTableFooter {...column}>{column.render("Footer")}</DataTableFooter>
                      </td>
                    ))}
                  </tr>
                ))}
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </DataTableContext.Provider>
  );
}

function DataTablePrimaryRow({ children }: DataTablePrimaryRowProps) {
  return <>{children}</>;
}

function DataTableSecondaryRow({ children }: DataTableSecondaryRowProps) {
  return <>{children}</>;
}

function DataTableHeader({
  alignHeader = "left",
  isSorted = false,
  isSortedDesc = false,
  children,
  canSort,
  ...props
}: DataTableHeaderProps) {
  const tokens = useTokens("DataTable", props.tokens);

  const tableHeaderContainer = cx("select-none flex flex-row items-center", tokens.tableHeader.align[alignHeader]);

  const sortDescIcon = useIcon("sortDesc", props.sortDescIcon, { size: 3 });
  const sortAscIcon = useIcon("sortAsc", props.sortAscIcon, { size: 3 });

  return (
    <div className={tableHeaderContainer}>
      {children}
      {canSort && (
        <span className="flex justify-center items-center ml-1">
          {isSorted ? isSortedDesc ? sortDescIcon : sortAscIcon : <div className="w-3.5">&nbsp;</div>}
        </span>
      )}
    </div>
  );
}

function DataTableFooter({ children }: DataTableFooterProps) {
  return <>{children}</>;
}

function DataTableCardHeader({
  totalElements,
  selectedCount,
  isAllRowsSelected,
  children,
  ...props
}: DataTableCardHeaderProps) {
  const tokens = useTokens("DataTable", props.tokens);
  const selectorTitle = isAllRowsSelected
    ? totalElements + " selected out of " + totalElements + " items"
    : selectedCount + " selected out of " + totalElements + " items";

  const title = findChild("CardHeaderTitle", children);
  const actions = findChild("CardHeaderActions", children);
  const selector = findChild("CardHeaderSelector", children);
  const isSelected = isAllRowsSelected || selectedCount !== 0;

  const cardHeaderContainer = cx({ [tokens.CardHeader.backgroundColor]: isSelected });

  return (
    <>
      <DataTableCardHeaderContextProvider
        selectedCount={selectedCount}
        totalElements={totalElements}
        isAllRowsSelected={isAllRowsSelected}
      >
        <Card.Header className={cardHeaderContainer}>
          <Card.Header.Title>
            {isSelected ? (React.isValidElement(selector) ? selector : selectorTitle) : title}
          </Card.Header.Title>
          <Card.Header.Actions>{actions}</Card.Header.Actions>
        </Card.Header>
      </DataTableCardHeaderContextProvider>
    </>
  );
}

function DataTableCardHeaderSelector({ children }: DataTableCardHeaderSelectorProps) {
  const { selectedCount, totalElements, isAllRowsSelected } = React.useContext(DataTableCardHeaderContext);

  const selectorTitle = isAllRowsSelected
    ? totalElements
    : selectedCount + " selected out of " + totalElements + " items";

  if (selectedCount === 0) return null;

  if (children) {
    return children({ selectedCount, totalElements }) as React.ReactElement<any>;
  }

  return <>{selectorTitle}</>;
}

function ExpanderCell({ row, ...props }: Cell & TokenProps<"DataTable">) {
  const tokens = useTokens("DataTable", props.tokens);
  const expandedRow = row as unknown as UseExpandedRowProps<{}>;

  const openExpanderIcon = useIcon("openExpander", undefined, {
    size: 3,
    className: `${tokens.expanderCellIcon.color} select-none`,
  });
  const closeExpanderIcon = useIcon("closeExpander", undefined, {
    size: 3,
    className: `${tokens.expanderCellIcon.color} select-none`,
  });

  return (
    <button
      {...expandedRow.getToggleRowExpandedProps()}
      type="button"
      className="focus:outline-none select-none h-4 w-4"
    >
      {expandedRow.isExpanded ? closeExpanderIcon : openExpanderIcon}
    </button>
  );
}

function SelectorHeader({ getToggleAllPageRowsSelectedProps }: HeaderProps<{}>) {
  const { hook, totalNumberOfElements, data, getItemId, predicate } = useDataTableContext();
  const disabled = totalNumberOfElements === 0;

  if (hook) {
    const dataId = flatMap(data, (item, index) => (predicate(item, index) ? [] : [getItemId(item, index).toString()]));
    const isPageSelected = dataId.length > 0 && every(dataId, (id) => hook.selected[id] || false);

    const checked = isPageSelected || hook.isAllRowsSelected;

    const onChange = () => {
      const newSelected = { ...hook.selected };
      dataId.forEach((id) => {
        if (isPageSelected) {
          delete newSelected[id];
        } else {
          newSelected[id] = true;
        }
      });

      hook.setSelected(newSelected, hook.isAllRowsSelected);
    };

    return (
      <div>
        <Checkbox disabled={disabled || hook.isAllRowsSelected} checked={checked} onChange={onChange} />
      </div>
    );
  }

  return (
    <div>
      <Checkbox disabled={disabled} {...getToggleAllPageRowsSelectedProps()} />
    </div>
  );
}

function SelectorCell<T extends object>({ row }: Pick<Cell<T>, "row">) {
  const { hook } = useDataTableContext();

  if (hook) {
    const checked = hook.selected[row.id] || false;
    const onChange = () => {
      hook.setSelected(
        {
          ...hook.selected,
          [row.id]: !checked,
        },
        hook.isAllRowsSelected,
      );
    };

    return (
      <div>
        <Checkbox
          disabled={hook.isAllRowsSelected || false}
          checked={checked || hook.isAllRowsSelected}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div>
      <Checkbox {...row.getToggleRowSelectedProps()} />
    </div>
  );
}

function extractFromChildren<T extends object>(
  children: React.ReactNode,
  rowEditingIndex: number | undefined,
  saveEnabled: boolean | undefined,
): DataTableInfo<T> {
  const childrenArray = React.Children.toArray(children);

  return {
    columns: extractColumns(childrenArray, rowEditingIndex, saveEnabled),
    renderExpandedRow: extractRenderExpandedRow(childrenArray),
  };
}

function extractColumns<T extends object>(
  children: Array<Exclude<React.ReactNode, boolean | null | undefined>>,
  rowEditingIndex: number | undefined,
  saveEnabled: boolean | undefined,
) {
  return children.flatMap((child) => {
    if (!React.isValidElement(child)) {
      return [];
    }

    if (child.props.type === "DataTableColumn") {
      const cell = child.props.children
        ? {
            Cell: ({ row, value }: { row: Row<T>; value: T }) =>
              child.props.children(
                value,
                row.index,
                row,
                {
                  isEditMode: rowEditingIndex === undefined ? false : row.index === rowEditingIndex,
                },
                saveEnabled,
              ),
          }
        : {};
      const column = {
        Header: child.props.header || "",
        Footer: child.props.footer || "",
        accessor: child.props.accessor || ((row: T) => row),
        className: child.props.className || "",
        title: child.props.title || "",
        id: child.props.id || child.props.accessor,
        disableSortBy: !(child.props.canSort ?? true),
        colSpan: child.props.colSpan || 1,
        align: child.props.align,
        ...cell,
      };

      return column as Column<T>;
    }

    if (child.props.type === "DataTableExpander") {
      const column = {
        Header: () => null,
        id: "expander",
        className: "w-px",
        Cell: ExpanderCell,
      };

      return [column as unknown as Column<T>];
    }

    if (child.props.type === "DataTableSelector") {
      const predicate = child.props.predicate ?? (() => false);
      const Cell = child.props.children
        ? ({ row }: { row: Row<T> }) =>
            child.props.children(row.original, row.index, row, predicate(row.original, row.index))
        : SelectorCell;

      const column = {
        id: "selector",
        className: "w-px",
        predicate: predicate,
        Header: SelectorHeader,
        Cell,
      };

      return [column as unknown as Column<T>];
    }

    return [];
  });
}

function extractRenderExpandedRow(children: Array<Exclude<React.ReactNode, boolean | null | undefined>>) {
  for (const child of children) {
    if (!React.isValidElement(child)) {
      continue;
    }

    if (child.props.type === "DataTableExpander") {
      return child.props.children;
    }
  }

  return null;
}

function DataTableColumn<T extends object>(_: DataTableColumnProps<T>) {
  return <></>;
}

DataTableColumn.defaultProps = {
  type: "DataTableColumn",
  canSort: false,
};

function DataTableExpander<T>(_: DataTableExpanderProps<T>) {
  return <></>;
}

DataTableExpander.defaultProps = {
  type: "DataTableExpander",
};

function DataTableSelector<T extends object>(_: DataTableSelectorProps<T>) {
  return <></>;
}

DataTableSelector.defaultProps = {
  type: "DataTableSelector",
};

DataTableCardHeader.Title = Card.Header.Title;
DataTableCardHeader.Actions = Card.Header.Actions;
DataTableCardHeader.Selector = DataTableCardHeaderSelector;

type DataTable = typeof DataTable & {
  Column: typeof DataTableColumn;
  Expander: typeof DataTableExpander;
  Selector: typeof DataTableSelector;
  SelectorCell: typeof SelectorCell;
  CardHeader: typeof DataTableCardHeader;
  PrimaryRow: typeof DataTablePrimaryRow;
  SecondaryRow: typeof DataTableSecondaryRow;
};

const isConfigurationEqual = (prevChildren, nextChildren) => {
  const prevChildArray = React.Children.toArray(prevChildren);
  const nextChildArray = React.Children.toArray(nextChildren);
  if (prevChildArray.length !== nextChildArray.length) {
    return false;
  }
  const getConfiguration = (children: Array<Exclude<React.ReactNode, boolean | null | undefined>>) =>
    children.flatMap((child) => (React.isValidElement(child) ? child.props.type : undefined));
  return _.isEqual(getConfiguration(prevChildArray), getConfiguration(nextChildArray));
};

const MemoDataTable = React.memo(
  DataTable,
  (prevProps, nextProps) =>
    prevProps.data === nextProps.data &&
    prevProps.hook?.selected === nextProps.hook?.selected &&
    prevProps.hook?.isAllRowsSelected === nextProps.hook?.isAllRowsSelected &&
    prevProps.rowEditingIndex === nextProps.rowEditingIndex &&
    prevProps.saveEnabled === nextProps.saveEnabled &&
    prevProps.alignHeader === nextProps.alignHeader &&
    prevProps.showHeader === nextProps.showHeader &&
    prevProps.showFooter === nextProps.showFooter &&
    prevProps.lastColumnFixed === nextProps.lastColumnFixed &&
    isConfigurationEqual(prevProps.children, nextProps.children),
) as unknown as DataTable;
MemoDataTable.Column = DataTableColumn;
MemoDataTable.Expander = DataTableExpander;
MemoDataTable.Selector = DataTableSelector;
MemoDataTable.SelectorCell = SelectorCell;
MemoDataTable.CardHeader = DataTableCardHeader;
MemoDataTable.PrimaryRow = DataTablePrimaryRow;
MemoDataTable.SecondaryRow = DataTableSecondaryRow;

export default MemoDataTable;
