import { useCallback } from 'react';

import { BaseTableItem, TableColumnAccessor, UseTableSortingProps } from '../types/index';

export function useTableSorting<T extends BaseTableItem>({ columns, onSortChange }: UseTableSortingProps<T>) {
    const handleSort = useCallback(
        (columnAccessor: TableColumnAccessor<T>, currentOrderKey?: string, currentOrderValue?: string) => {
            const column = columns.find((col) => col.accessor === columnAccessor);

            if (!column?.sortable) {
                return;
            }

            // Determinar próxima direção de ordenação
            // Por padrão: sem ordenação -> asc -> desc -> sem ordenação
            let newOrderValue: 'asc' | 'desc' | '' = 'asc';

            if (currentOrderKey === columnAccessor) {
                if (currentOrderValue === 'asc') {
                    newOrderValue = 'desc';
                } else if (currentOrderValue === 'desc') {
                    newOrderValue = 'asc';
                } else {
                    newOrderValue = 'asc';
                }
            }

            const finalOrderKey = columnAccessor;

            onSortChange(finalOrderKey, newOrderValue);
        },
        [columns, onSortChange]
    );

    const getSortDirection = useCallback(
        (columnAccessor: TableColumnAccessor<T>, currentOrderKey: string, currentOrderValue: string) => {
            if (currentOrderKey !== columnAccessor) {
                return null;
            }
            return currentOrderValue as 'asc' | 'desc' | null;
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
        isSortable
    };
}
