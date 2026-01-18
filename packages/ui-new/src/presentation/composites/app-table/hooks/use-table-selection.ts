"use client";

/**
 * useTableSelection Hook
 *
 * @module presentation/composites/app-table/hooks
 */

import { useCallback, useMemo } from "react";

import { UseTableSelectionProps } from "../types";

export function useTableSelection({
  initialSelected: selectedItems = [],
  onSelectionChange,
}: UseTableSelectionProps) {
  const handleToggleItem = useCallback(
    (itemId: string, checked: boolean) => {
      const newSelection = checked
        ? [...selectedItems, itemId]
        : selectedItems.filter((id) => id !== itemId);

      onSelectionChange?.(newSelection);
    },
    [selectedItems, onSelectionChange]
  );

  const handleSelectAll = useCallback(
    (itemIds: string[], checked: boolean) => {
      const newSelection = checked ? itemIds : [];
      onSelectionChange?.(newSelection);
    },
    [onSelectionChange]
  );

  const handleClearSelection = useCallback(() => {
    onSelectionChange?.([]);
  }, [onSelectionChange]);

  const isItemSelected = useCallback(
    (itemId: string) => selectedItems.includes(itemId),
    [selectedItems]
  );

  const areAllItemsSelected = useCallback(
    (itemIds: string[]) => {
      if (itemIds.length === 0) return false;
      return itemIds.every((id) => selectedItems.includes(id));
    },
    [selectedItems]
  );

  const areSomeItemsSelected = useCallback(
    (itemIds: string[]) => {
      if (itemIds.length === 0) return false;
      return itemIds.some((id) => selectedItems.includes(id)) && !areAllItemsSelected(itemIds);
    },
    [selectedItems, areAllItemsSelected]
  );

  const selectedCount = useMemo(() => selectedItems.length, [selectedItems]);

  const hasSelection = useMemo(() => selectedCount > 0, [selectedCount]);

  return {
    selectedItems,
    selectedCount,
    hasSelection,
    handleToggleItem,
    handleSelectAll,
    handleClearSelection,
    isItemSelected,
    areAllItemsSelected,
    areSomeItemsSelected,
  };
}
