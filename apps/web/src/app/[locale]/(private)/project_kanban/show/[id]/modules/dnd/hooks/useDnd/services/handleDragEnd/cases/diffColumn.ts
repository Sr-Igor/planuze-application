import { project_kanban_cycle } from "@repo/api/generator/types";

import { IUseDndProps, Position } from "../../../types";
import { moveCardBetweenColumns } from "../../../utils/moveCardBetweenColumns";

export interface IDiffColumnProps {
  activeId: string | number;
  activeColumnId: string;
  overColumnId: string;
  insertPosition: Position;
  cycle?: project_kanban_cycle | null;
  onBoardUpdate?: IUseDndProps["onBoardUpdate"];
  eventType: "card" | "main-task";
}

export const diffColumn = ({
  activeId,
  activeColumnId,
  overColumnId,
  insertPosition,
  cycle,
  onBoardUpdate,
  eventType,
}: IDiffColumnProps) => {
  const columns = cycle?.project_kanban_cycle_columns;

  const { board: newBoard, changed } = moveCardBetweenColumns({
    cardId: activeId,
    sourceColumnId: activeColumnId,
    targetColumnId: overColumnId,
    insertIndex: insertPosition.index,
    cycle,
  });
  if (changed) {
    const card = columns
      ?.find((col) => col.id === activeColumnId)
      ?.project_kanban_cycle_cards?.find((c) => c.id === activeId);
    if (card) {
      // Calculate new order and column_id for moved card
      const newColumn = newBoard.project_kanban_cycle_columns?.find(
        (col) => col.id === overColumnId
      );
      const newOrder =
        newColumn?.project_kanban_cycle_cards?.findIndex((c) => c.id === activeId) || 0;

      const updatedCard = {
        ...card,
        previous_order: card.order, // Store previous order for drag direction
        order: newOrder + 1, // Order is 1-indexed
        project_kanban_cycle_column_id: overColumnId,
      };
      onBoardUpdate?.({
        board: newBoard,
        item: updatedCard,
        type: "card",
        moment: eventType === "card" ? "order" : "primary",
      });
    }
  }
};
