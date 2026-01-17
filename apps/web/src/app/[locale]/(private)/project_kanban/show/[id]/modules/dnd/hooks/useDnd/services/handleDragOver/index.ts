import { DragOverEvent } from "@dnd-kit/core";

import { project_kanban_cycle } from "@repo/types";

import { Position } from "../../types";
import { findColumnByCardId } from "../../utils";
import { cases } from "./cases/_index";

export interface IHandleDragOverProps {
  event: DragOverEvent;
  cycle?: project_kanban_cycle | null;
  updateInsertPosition: (insertPosition: Position | null) => void;
}

export const handleDragOver = ({ event, updateInsertPosition, cycle }: IHandleDragOverProps) => {
  const { active, over } = event;

  if (!over || !cycle) {
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

  // Handle card movements
  if (activeData?.type === "card" || activeData?.type === "main-task") {
    const activeColumnId = findColumnByCardId({ cardId: activeId as string, cycle })?.id;

    if (!activeColumnId) {
      updateInsertPosition(null);
      return;
    }

    // Card over another card
    if (overData?.type === "card" || overData?.type === "main-task") {
      cases.sameColumn({
        activeColumnId,
        overId,
        cycle,
        updateInsertPosition,
      });
    }
    // Card over column (empty area or drop zone)
    else if (typeof overId === "string") {
      cases.diffColumn({
        activeColumnId,
        overId,
        cycle,
        updateInsertPosition,
      });
    }
  }
  // Handle column movements
  else if (activeData?.type === "column") {
    // Para colunas, não precisamos de insertPosition específico
    // O arrayMove do @dnd-kit/sortable cuida da reordenação
    updateInsertPosition(null);
  }
};
