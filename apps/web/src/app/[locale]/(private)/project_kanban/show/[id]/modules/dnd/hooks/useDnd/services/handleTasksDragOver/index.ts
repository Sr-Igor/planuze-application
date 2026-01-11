import { DragOverEvent } from "@dnd-kit/core";

import { project_kanban_cycle, project_kanban_cycle_card } from "@repo/api/generator/types";

import { Position } from "../../types";
import { cases } from "./cases/_index";

export interface IHandleTasksDragOverProps {
  event: DragOverEvent;
  cycle?: project_kanban_cycle | null;
  updateInsertPosition: (insertPosition: Position | null) => void;
}

export const handleTasksDragOver = ({
  event,
  cycle,
  updateInsertPosition,
}: IHandleTasksDragOverProps): boolean => {
  const { active, over } = event;

  if (!over || !cycle) {
    updateInsertPosition(null);
    return false;
  }

  const activeId = active.id;
  const overId = over.id;

  if (activeId === overId) {
    updateInsertPosition(null);
    return false;
  }

  const activeData = active.data.current;
  const overData = over.data.current;

  if (activeData?.type === "card") {
    const card = activeData.card as project_kanban_cycle_card;

    if (overData?.type === "card") {
      return cases.complexity({
        card,
        overData,
        cycle,
        updateInsertPosition,
      });
    }
    // Drop sobre task row column
    else if (overData?.type === "task-row-column") {
      return cases.simple({
        card,
        overData,
        cycle,
        updateInsertPosition,
      });
    }
  }

  updateInsertPosition(null);
  return false;
};
