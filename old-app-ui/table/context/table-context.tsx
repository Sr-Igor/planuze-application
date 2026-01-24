'use client';

import React, { createContext, useContext } from 'react';

import { BaseTableItem, TableContextValue } from '../types/index';

const TableContext = createContext<TableContextValue<any> | null>(null);

export interface TableProviderProps<T extends BaseTableItem> {
    children: React.ReactNode;
    value: TableContextValue<T>;
}

export function TableProvider<T extends BaseTableItem>({ children, value }: TableProviderProps<T>) {
    return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
}

export function useTableContext<T extends BaseTableItem>(): TableContextValue<T> {
    const context = useContext(TableContext);

    if (!context) {
        throw new Error('useTableContext deve ser usado dentro de um TableProvider');
    }

    return context as TableContextValue<T>;
}
