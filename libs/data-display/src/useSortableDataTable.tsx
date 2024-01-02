import _ from "lodash";

import { useDataTable } from "./index";

export default function useSortableDataTable<T, U extends keyof T>(initialData: T[], columnMapping: Record<U, string>) {
  const [dataTableState, dataTableHook] = useDataTable();

  const generateSortedData = () => {
    const sortInfo = dataTableState.sortBy[0];

    if (!sortInfo) {
      return initialData;
    }

    const sortedData = _.sortBy(initialData, columnMapping[sortInfo.column as U]);

    return sortInfo.sortDirection === "ASCENDING" ? sortedData : sortedData.reverse();
  };

  return { sortedData: generateSortedData(), dataTableState, dataTableHook };
}
