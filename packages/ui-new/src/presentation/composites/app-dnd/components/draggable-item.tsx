"use client";

import { memo } from "react";

import { useDndComponents } from "../context";
import { useDndStyles } from "../hooks";
import type { DraggableItemProps } from "../types";

const DraggableItemComponent = <T,>({
  item,
  index,
  children,
  disabled,
}: DraggableItemProps<T>) => {
  const { Draggable } = useDndComponents();
  const { getItemStyle } = useDndStyles();

  const draggableId = item?.id || item?.local_id || String(index);
  const itemIndex = index ?? 0;

  return (
    <Draggable draggableId={draggableId} index={itemIndex}>
      {(provided, snapshot) => (
        <div
          className="flex w-full items-center gap-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided?.draggableProps?.style,
            disabled
          )}
        >
          <div className="flex-1">{children}</div>
        </div>
      )}
    </Draggable>
  );
};

export const DraggableItem = memo(DraggableItemComponent, (prevProps, nextProps) => {
  const prevItem = prevProps.item as { id?: string; local_id?: string };
  const nextItem = nextProps.item as { id?: string; local_id?: string };

  return (
    prevItem?.id === nextItem?.id &&
    prevItem?.local_id === nextItem?.local_id &&
    prevProps.index === nextProps.index
  );
}) as typeof DraggableItemComponent;
