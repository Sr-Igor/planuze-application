/**
 * AppTable Context Module
 *
 * Context provider for the AppTable component.
 *
 * @module presentation/composites/app-table/context
 */

"use client";

import { createContext, ReactNode, useContext } from "react";

import { BaseTableItem, TableContextValue } from "../types";

const TableContext = createContext<TableContextValue<BaseTableItem> | null>(null);

export interface TableProviderProps<T extends BaseTableItem> {
  children: ReactNode;
  value: TableContextValue<T>;
}

export function TableProvider<T extends BaseTableItem>({
  children,
  value,
}: TableProviderProps<T>) {
  return (
    <TableContext.Provider value={value as unknown as TableContextValue<BaseTableItem>}>
      {children}
    </TableContext.Provider>
  );
}

export function useTableContext<T extends BaseTableItem>(): TableContextValue<T> {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }

  return context as unknown as TableContextValue<T>;
}
