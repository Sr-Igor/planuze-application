import { project_kanban_cycle } from "@repo/api/generator/types";

import { IUseDndProps } from "../../../types";
import { reorderColumns } from "../../../utils/reorderColumns";

export interface IColumnProps {
  activeId: string | number;
  overId: string | number;
  cycle?: project_kanban_cycle | null;
  onBoardUpdate?: IUseDndProps["onBoardUpdate"];
}

export const column = ({ activeId, overId, cycle, onBoardUpdate }: IColumnProps) => {
  const { board: newBoard, changed } = reorderColumns({
    activeColumnId: activeId,
    overColumnId: overId,
    cycle: cycle!,
  });

  if (changed) {
    // Encontrar a coluna atualizada no novo board
    const updatedColumn = newBoard.project_kanban_cycle_columns?.find((col) => col.id === activeId);
    if (updatedColumn) {
      onBoardUpdate?.({ board: newBoard, item: updatedColumn, type: "column", moment: "primary" });
    }
  }
};
