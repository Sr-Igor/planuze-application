import { useMemo } from "react";

import { BaseTableItem, TableProps } from "../types/index";
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

  // Estado de filtros
  const filtersState = useTableFilters({
    initialFilters: filters,
    onFiltersChange: events.onFiltersChange,
  });

  // Estado de seleção
  const selectionState = useTableSelection({
    initialSelected: state.selectedItems || [],
    onSelectionChange: events.onSelectionChange,
  });

  // Estado de ordenação
  const sortingState = useTableSorting({
    columns,
    onSortChange: filtersState.handleSortChange,
  });

  // Estado derivado
  const derivedState = useMemo(
    () => ({
      // Itens visíveis na página atual
      visibleItemIds: data.map((item) => item.id),

      // Estado de loading por item
      loadingItems: state.loadingItems || [],

      // Itens expandidos
      expandedItems: state.expandedItems || [],

      // Verificações de seleção
      allVisibleSelected: selectionState.areAllItemsSelected(
        data.filter((item) => !disabledCheckbox?.(item)).map((item) => item.id)
      ),
      someVisibleSelected: selectionState.areSomeItemsSelected(
        data.filter((item) => !disabledCheckbox?.(item)).map((item) => item.id)
      ),

      // Total de dados
      isEmpty: data.length === 0 && !loading,
      hasData: data.length > 0,

      // Ações disponíveis
      hasActions: actions.length > 0,
    }),
    [data, state.loadingItems, state.expandedItems, selectionState, loading, actions]
  );

  // Funções de ação
  const actionHandlers = useMemo(
    () => ({
      // Seleção
      toggleItemSelection: selectionState.handleToggleItem,
      toggleAllSelection: (checked: boolean) => {
        selectionState.handleSelectAll(
          data.filter((item) => !disabledCheckbox?.(item)).map((item) => item.id),
          checked
        );
      },
      clearSelection: selectionState.handleClearSelection,

      // Ordenação
      handleColumnSort: (columnAccessor: string) => {
        sortingState.handleSort(columnAccessor as any, filters.orderKey, filters.orderValue);
      },

      // Eventos de linha
      handleRowClick: events.onRowClick,
      handleRowDoubleClick: events.onRowDoubleClick,
      handleExpandRow: events.onExpandRow,

      // Filtros
      handleFiltersChange: filtersState.handleFilterChange,
      handlePageChange: filtersState.handlePageChange,
      handleLimitChange: filtersState.handleLimitChange,
      resetFilters: filtersState.resetFilters,
    }),
    [selectionState, sortingState, events, filtersState, data, filters.orderKey, filters.orderValue]
  );

  return {
    // Estado atual
    data,
    columns,
    filters,
    loading,
    selectable,
    actions,

    // Estados derivados
    ...derivedState,

    // Estado de seleção
    selectedItems: selectionState.selectedItems,
    selectedCount: selectionState.selectedCount,
    hasSelection: selectionState.hasSelection,

    // Estado de paginação
    pagination: filtersState.pagination,

    // Funções de ação
    ...actionHandlers,

    // Utilitários
    isItemSelected: selectionState.isItemSelected,
    isItemLoading: (itemId: string) => derivedState.loadingItems.includes(itemId) || loading,
    isItemExpanded: (itemId: string) => derivedState.expandedItems.includes(itemId),
    getSortDirection: sortingState.getSortDirection,
    isSortable: sortingState.isSortable,
  };
}
