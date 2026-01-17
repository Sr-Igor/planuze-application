import { project_kanban_cycle } from "@repo/types";

import { Position } from "../../../types";

export interface IDiffColumnProps {
  activeColumnId: string | number;
  overId: string | number;
  cycle?: project_kanban_cycle | null;
  updateInsertPosition: (insertPosition: Position | null) => void;
}
export const diffColumn = ({
  activeColumnId,
  overId,
  cycle,
  updateInsertPosition,
}: IDiffColumnProps) => {
  const columns = cycle?.project_kanban_cycle_columns;
  const overColumnId = overId as string;

  if (!columns) {
    updateInsertPosition(null);
    return;
  }

  // Verificar se é a zona de drop do topo
  if (overColumnId.endsWith("-top")) {
    const actualColumnId = overColumnId.replace("-top", "");
    if (activeColumnId !== actualColumnId) {
      updateInsertPosition({
        columnId: actualColumnId,
        index: 0, // Sempre inserir no topo
      });
    } else {
      updateInsertPosition(null);
    }
  }
  // Verificar se é a zona de drop do final
  else if (overColumnId.endsWith("-bottom")) {
    const actualColumnId = overColumnId.replace("-bottom", "");
    if (activeColumnId !== actualColumnId) {
      const targetColumn = columns.find((col) => col.id === actualColumnId);
      if (targetColumn) {
        updateInsertPosition({
          columnId: actualColumnId,
          index: targetColumn.project_kanban_cycle_cards?.length || 0, // Sempre inserir no final
        });
      } else {
        updateInsertPosition(null);
      }
    } else {
      updateInsertPosition(null);
    }
  }
  // Drop zone da coluna normal
  else if (activeColumnId !== overColumnId) {
    // Moving to different column
    const targetColumn = columns.find((col) => col.id === overColumnId);
    if (targetColumn) {
      // Verificar se a coluna está vazia para inserir na primeira posição
      const cardsCount = targetColumn.project_kanban_cycle_cards?.length || 0;

      updateInsertPosition({
        columnId: overColumnId,
        index: cardsCount === 0 ? 0 : cardsCount,
      });
    } else {
      updateInsertPosition(null);
    }
  } else {
    // Mesma coluna - não precisa de insertPosition
    updateInsertPosition(null);
  }
};
