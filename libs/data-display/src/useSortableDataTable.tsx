import { useDataTable } from "./index";

export default function useSortableDataTable<T, U extends keyof T>(initialData: T[], columnMapping: Record<U, string>) {
  const [dataTableState, dataTableHook] = useDataTable();

  const generateSortedData = () => {
    const sortInstructions = dataTableState.sortBy;

    if (!sortInstructions || sortInstructions.length === 0) {
      return initialData;
    }

    return [...initialData].sort((a, b) => {
      for (const sortInfo of sortInstructions) {
        const columnKey = columnMapping[sortInfo.column];
        const compareResult = sortInfo.sortDirection === "ASCENDING" ? -1 : 1;
        const aValue = a[columnKey];
        const bValue = b[columnKey];

        if (aValue !== bValue) {
          return (aValue < bValue ? -1 : 1) * compareResult;
        }
      }

      return 0;
    })
  };

  return { sortedData: generateSortedData(), dataTableState, dataTableHook };
}
