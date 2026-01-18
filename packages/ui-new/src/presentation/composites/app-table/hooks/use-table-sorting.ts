"use client";

/**
 * useTableSorting Hook
 *
 * @module presentation/composites/app-table/hooks
 */

import { useCallback } from "react";

import { BaseTableItem, TableColumnAccessor, UseTableSortingProps } from "../types";

export function useTableSorting<T extends BaseTableItem>({
  columns,
  onSortChange,
}: UseTableSortingProps<T>) {
  const handleSort = useCallback(
    (
      columnAccessor: TableColumnAccessor<T>,
      currentOrderKey?: string,
      currentOrderValue?: string
    ) => {
      const column = columns.find((col) => col.accessor === columnAccessor);

      if (!column?.sortable) {
        return;
      }

      let newOrderValue: "asc" | "desc" | "" = "asc";

      if (currentOrderKey === columnAccessor && currentOrderValue === "asc") {
        newOrderValue = "desc";
      }

      const finalOrderKey = columnAccessor as string;

      onSortChange(finalOrderKey, newOrderValue);
    },
    [columns, onSortChange]
  );

  const getSortDirection = useCallback(
    (
      columnAccessor: TableColumnAccessor<T>,
      currentOrderKey: string,
      currentOrderValue: string
    ) => {
      if (currentOrderKey !== columnAccessor) {
        return null;
      }
      return currentOrderValue as "asc" | "desc" | null;
    },
    []
  );

  const isSortable = useCallback(
    (columnAccessor: TableColumnAccessor<T>) => {
      const column = columns.find((col) => col.accessor === columnAccessor);
      return column?.sortable || false;
    },
    [columns]
  );

  return {
    handleSort,
    getSortDirection,
    isSortable,
  };
}
