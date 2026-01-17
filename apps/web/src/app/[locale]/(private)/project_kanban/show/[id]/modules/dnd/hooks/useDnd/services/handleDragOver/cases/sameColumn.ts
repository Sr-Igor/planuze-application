import { project_kanban_cycle } from "@repo/types";

import { Position } from "../../../types";
import { findColumnByCardId } from "../../../utils";

type SameColumnProps = {
  activeColumnId: string | number;
  overId: string | number;
  cycle?: project_kanban_cycle | null;
  updateInsertPosition: (insertPosition: Position | null) => void;
};

export const sameColumn = ({
  activeColumnId,
  overId,
  cycle,
  updateInsertPosition,
}: SameColumnProps) => {
  const columns = cycle?.project_kanban_cycle_columns;
  const overColumnId = findColumnByCardId({ cardId: overId as string, cycle })?.id;

  if (!overColumnId || !columns) {
    updateInsertPosition(null);
    return;
  }

  if (activeColumnId !== overColumnId) {
    // Moving between columns - calculate insert position
    const targetColumn = columns.find((col) => col.id === overColumnId);
    if (targetColumn) {
      const overCardIndex =
        targetColumn.project_kanban_cycle_cards?.findIndex((card) => card.id === overId) ?? -1;

      // Se o índice foi encontrado, use-o; caso contrário, adicione ao final
      const insertIndex =
        overCardIndex !== -1 ? overCardIndex : targetColumn.project_kanban_cycle_cards?.length || 0;

      updateInsertPosition({
        columnId: overColumnId,
        index: insertIndex,
      });
    } else {
      updateInsertPosition(null);
    }
  } else {
    // Mesma coluna - não precisa de insertPosition específico
    updateInsertPosition(null);
  }
};
