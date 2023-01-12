import {
  UseExpandedHooks,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseRowSelectHooks,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByHooks,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
} from "react-table";

declare module "react-table" {
  export interface TableOptions<D extends object>
    extends UseExpandedOptions<D>,
      UsePaginationOptions<D>,
      UseRowSelectOptions<D>,
      UseRowStateOptions<D>,
      UseSortByOptions<D>,
      Record<string, unknown> {}

  export interface Hooks<D extends object = {}> extends UseExpandedHooks<D>, UseRowSelectHooks<D>, UseSortByHooks<D> {}

  export interface TableInstance<D extends object = {}>
    extends UseExpandedInstanceProps<D>,
      UsePaginationInstanceProps<D>,
      UseRowSelectInstanceProps<D>,
      UseRowStateInstanceProps<D>,
      UseSortByInstanceProps<D> {}

  export interface TableState<D extends object = {}>
    extends UseExpandedState<D>,
      UsePaginationState<D>,
      UseRowSelectState<D>,
      UseRowStateState<D>,
      UseSortByState<D> {}

  export type ColumnInterface<D extends object = {}> = UseSortByColumnOptions<D>;

  export interface ColumnInstance<D extends object = {}> extends UseSortByColumnProps<D> {
    className: string;
    title: string;
  }

  export type Cell<D extends object = {}, V = unknown> = UseRowStateCellProps<D>;

  export interface Row<D extends object = {}>
    extends UseExpandedRowProps<D>,
      UseRowSelectRowProps<D>,
      UseRowStateRowProps<D> {}
}
