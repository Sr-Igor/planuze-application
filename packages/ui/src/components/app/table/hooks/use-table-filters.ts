import { useCallback, useMemo } from 'react';

import { BaseTableItem, TableFilters, UseTableFiltersProps } from '../types/index';

export function useTableFilters<T extends BaseTableItem>({ initialFilters, onFiltersChange }: UseTableFiltersProps<T>) {
    const handleFilterChange = useCallback(
        (newFilters: Partial<TableFilters>) => {
            onFiltersChange(newFilters);
        },
        [onFiltersChange]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            handleFilterChange({ page });
        },
        [handleFilterChange]
    );

    const handleLimitChange = useCallback(
        (limit: number) => {
            handleFilterChange({ limit, page: 1 });
        },
        [handleFilterChange]
    );

    const handleSortChange = useCallback(
        (orderKey: string, orderValue: 'asc' | 'desc' | '') => {
            handleFilterChange({ orderKey, orderValue });
        },
        [handleFilterChange]
    );

    const resetFilters = useCallback(() => {
        onFiltersChange({
            page: 1,
            orderKey: '',
            orderValue: ''
        });
    }, [onFiltersChange]);

    const canGoToNextPage = useMemo(() => {
        return initialFilters.page < initialFilters.pages && initialFilters.pages > 0;
    }, [initialFilters.page, initialFilters.pages]);

    const canGoToPreviousPage = useMemo(() => {
        return initialFilters.page > 1;
    }, [initialFilters.page]);

    const canGoToFirstPage = useMemo(() => {
        return initialFilters.page !== 1;
    }, [initialFilters.page]);

    const canGoToLastPage = useMemo(() => {
        return canGoToNextPage;
    }, [canGoToNextPage]);

    return {
        filters: initialFilters,
        handleFilterChange,
        handlePageChange,
        handleLimitChange,
        handleSortChange,
        resetFilters,
        pagination: {
            canGoToNextPage,
            canGoToPreviousPage,
            canGoToFirstPage,
            canGoToLastPage
        }
    };
}
