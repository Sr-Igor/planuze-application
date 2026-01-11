import { DragEndEvent } from "@dnd-kit/core";

import { project_kanban_cycle } from "@repo/api/generator/types";

import { ActiveItem, IUseDndProps, Position } from "../../types";
import { findColumnByCardId } from "../../utils";
import { cases } from "./cases/_index";

export interface IHandleDragEndProps {
  event: DragEndEvent;
  setActiveItem: (activeItem: ActiveItem | null) => void;
  cycle?: project_kanban_cycle | null;
  onBoardUpdate: IUseDndProps["onBoardUpdate"];
  insertPosition: Position | null;
  updateInsertPosition: (insertPosition: Position | null) => void;
}

export const handleDragEnd = ({
  event,
  setActiveItem,
  updateInsertPosition,
  cycle,
  onBoardUpdate,
  insertPosition,
}: IHandleDragEndProps) => {
  const { active, over } = event;

  setActiveItem(null);

  if (!over) {
    updateInsertPosition(null);
    return;
  }

  const activeId = active.id;
  const overId = over.id;

  if (activeId === overId) {
    updateInsertPosition(null);
    return;
  }

  const activeData = active.data.current;
  const overData = over.data.current;
  const eventType = activeData?.type;

  // Handle card movements
  if (activeData?.type === "card" || activeData?.type === "main-task") {
    const activeColumnId = findColumnByCardId({ cardId: activeId, cycle })?.id;

    if (!activeColumnId) {
      updateInsertPosition(null);
      return;
    }

    // Card over another card
    if (overData?.type === "card" || overData?.type === "main-task") {
      const overColumnId = findColumnByCardId({ cardId: overId, cycle })?.id;

      if (!overColumnId) {
        updateInsertPosition(null);
        return;
      }

      if (activeColumnId === overColumnId) {
        cases.sameColumn({
          activeColumnId,
          activeId,
          overId,
          cycle,
          updateInsertPosition,
          onBoardUpdate,
          eventType,
        });
      } else {
        // Move between columns - use calculated insert position
        if (insertPosition && insertPosition.columnId === overColumnId) {
          cases.diffColumn({
            activeId,
            activeColumnId,
            overColumnId,
            insertPosition,
            cycle,
            onBoardUpdate,
            eventType,
          });
        }
      }
    }
    // Card over column (drop zone)
    else if (typeof overId === "string") {
      cases.topBottomDiffColumn({
        activeColumnId,
        overId,
        activeId,
        insertPosition,
        cycle,
        onBoardUpdate,
        eventType,
      });
    }
  }
  // Handle column reordering
  else if (activeData?.type === "column" && overData?.type === "column") {
    cases.column({
      activeId,
      overId,
      cycle,
      onBoardUpdate,
    });
  }

  // Reset insert position
  updateInsertPosition(null);
};
