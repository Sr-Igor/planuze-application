import { useCallback, useMemo } from "react";

import { UseTableSelectionProps } from "../types/index";

export function useTableSelection({
  initialSelected: selectedItems = [],
  onSelectionChange,
}: UseTableSelectionProps) {
  // const [selectedItems, setSelectedItems] = useState<string[]>(initialSelected);

  const handleToggleItem = useCallback(
    (itemId: string, checked: boolean) => {
      const newSelection = checked
        ? [...selectedItems, itemId]
        : selectedItems.filter((id) => id !== itemId);

      // setSelectedItems(newSelection);
      onSelectionChange?.(newSelection);
    },
    [selectedItems, onSelectionChange]
  );

  const handleSelectAll = useCallback(
    (itemIds: string[], checked: boolean) => {
      const newSelection = checked ? itemIds : [];
      // setSelectedItems(newSelection);
      onSelectionChange?.(newSelection);
    },
    [onSelectionChange]
  );

  const handleClearSelection = useCallback(() => {
    // setSelectedItems([]);
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
