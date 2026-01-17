import { project_kanban_cycle } from "@repo/types";

import { IUseDndProps, Position } from "../../../types";
import { moveCardBetweenColumns } from "../../../utils/moveCardBetweenColumns";

export interface ITopBottomDiffColumnProps {
  activeColumnId: string;
  overId: string | number;
  activeId: string | number;
  insertPosition: Position | null;
  cycle?: project_kanban_cycle | null;
  onBoardUpdate?: IUseDndProps["onBoardUpdate"];
  eventType: "card" | "main-task";
}
export const topBottomDiffColumn = ({
  activeColumnId,
  overId,
  activeId,
  insertPosition,
  cycle,
  onBoardUpdate,
  eventType,
}: ITopBottomDiffColumnProps) => {
  const columns = cycle?.project_kanban_cycle_columns;
  let actualColumnId = overId as string;

  // Verificar se é a zona de drop do topo ou final
  if (actualColumnId.endsWith("-top")) {
    actualColumnId = actualColumnId.replace("-top", "");
  } else if (actualColumnId.endsWith("-bottom")) {
    actualColumnId = actualColumnId.replace("-bottom", "");
  }

  if (activeColumnId !== actualColumnId) {
    // Move to different column - use calculated insert position or add to end
    const targetIndex =
      insertPosition?.columnId === actualColumnId ? insertPosition.index : undefined;
    const { board: newBoard, changed } = moveCardBetweenColumns({
      cardId: activeId,
      sourceColumnId: activeColumnId,
      targetColumnId: actualColumnId,
      insertIndex: targetIndex,
      cycle,
    });
    if (changed) {
      const card = columns
        ?.find((col) => col.id === activeColumnId)
        ?.project_kanban_cycle_cards?.find((c) => c.id === activeId);
      if (card) {
        // Calculate new order and column_id for moved card
        const newColumn = newBoard.project_kanban_cycle_columns?.find(
          (col) => col.id === actualColumnId
        );
        const newOrder =
          newColumn?.project_kanban_cycle_cards?.findIndex((c) => c.id === activeId) || 0;

        const updatedCard = {
          ...card,
          previous_order: card.order, // Store previous order for drag direction
          order: newOrder + 1, // Order is 1-indexed
          project_kanban_cycle_column_id: actualColumnId,
        };
        onBoardUpdate?.({
          board: newBoard,
          item: updatedCard,
          type: "card",
          moment: eventType === "card" ? "order" : "primary",
        });
      }
    }
  }
};
