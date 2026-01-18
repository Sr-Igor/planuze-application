"use client";

import { useCallback } from "react";

import { useDndComponents } from "../context";
import { useDndStyles } from "../hooks";
import type { DndDropResult, DndProviderProps } from "../types";

/**
 * Reorder items in a list
 */
const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const DndProvider = <T,>({
  items,
  setOrder,
  children,
  onDragEnd,
}: DndProviderProps<T>) => {
  const { DragDropContext, Droppable } = useDndComponents();
  const { getListStyle } = useDndStyles();

  const handleDragEnd = useCallback(
    (result: DndDropResult) => {
      if (!result.destination) return;
      if (result.destination.index === result.source.index) return;

      const reorderedItems = reorder(items, result.source.index, result.destination.index);

      setOrder(reorderedItems);
      onDragEnd?.(result);
    },
    [items, setOrder, onDragEnd]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="droppable"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={true}
        direction="vertical"
        type="ITEM"
      >
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DndProvider.displayName = "DndProvider";
