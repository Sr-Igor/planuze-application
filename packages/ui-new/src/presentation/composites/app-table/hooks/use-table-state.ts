"use client";

/**
 * useTableState Hook
 *
 * @module presentation/composites/app-table/hooks
 */

import { useMemo } from "react";

import { BaseTableItem, TableProps } from "../types";
import { useTableFilters } from "./use-table-filters";
import { useTableSelection } from "./use-table-selection";
import { useTableSorting } from "./use-table-sorting";

export function useTableState<T extends BaseTableItem>(props: TableProps<T>) {
  const {
    data,
    columns,
    filters,
    state = {},
    loading = false,
    selectable = false,
    actions = [],
    events,
    disabledCheckbox,
  } = props;

  const filtersState = useTableFilters({
    initialFilters: filters,
    onFiltersChange: events.onFiltersChange,
  });

  const selectionState = useTableSelection({
    initialSelected: state.selectedItems || [],
    onSelectionChange: events.onSelectionChange,
  });

  const sortingState = useTableSorting({
    columns,
    onSortChange: filtersState.handleSortChange,
  });

  const derivedState = useMemo(
    () => ({
      visibleItemIds: data.map((item) => item.id),
      loadingItems: state.loadingItems || [],
      expandedItems: state.expandedItems || [],
      allVisibleSelected: selectionState.areAllItemsSelected(
        data.filter((item) => !disabledCheckbox?.(item)).map((item) => item.id)
      ),
      someVisibleSelected: selectionState.areSomeItemsSelected(
        data.filter((item) => !disabledCheckbox?.(item)).map((item) => item.id)
      ),
      isEmpty: data.length === 0 && !loading,
      hasData: data.length > 0,
      hasActions: actions.length > 0,
    }),
    [data, state.loadingItems, state.expandedItems, selectionState, loading, actions, disabledCheckbox]
  );

  const actionHandlers = useMemo(
    () => ({
      toggleItemSelection: selectionState.handleToggleItem,
      toggleAllSelection: (checked: boolean) => {
        selectionState.handleSelectAll(
          data.filter((item) => !disabledCheckbox?.(item)).map((item) => item.id),
          checked
        );
      },
      clearSelection: selectionState.handleClearSelection,
      handleColumnSort: (columnAccessor: string) => {
        sortingState.handleSort(columnAccessor as never, filters.orderKey, filters.orderValue);
      },
      handleRowClick: events.onRowClick,
      handleRowDoubleClick: events.onRowDoubleClick,
      handleExpandRow: events.onExpandRow,
      handleFiltersChange: filtersState.handleFilterChange,
      handlePageChange: filtersState.handlePageChange,
      handleLimitChange: filtersState.handleLimitChange,
      resetFilters: filtersState.resetFilters,
    }),
    [selectionState, sortingState, events, filtersState, data, filters.orderKey, filters.orderValue, disabledCheckbox]
  );

  return {
    data,
    columns,
    filters,
    loading,
    selectable,
    actions,
    ...derivedState,
    selectedItems: selectionState.selectedItems,
    selectedCount: selectionState.selectedCount,
    hasSelection: selectionState.hasSelection,
    pagination: filtersState.pagination,
    ...actionHandlers,
    isItemSelected: selectionState.isItemSelected,
    isItemLoading: (itemId: string) => derivedState.loadingItems.includes(itemId) || loading,
    isItemExpanded: (itemId: string) => derivedState.expandedItems.includes(itemId),
    getSortDirection: sortingState.getSortDirection,
    isSortable: sortingState.isSortable,
  };
}
