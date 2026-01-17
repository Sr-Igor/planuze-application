import { project_kanban_cycle } from "@repo/types";

import { IUseDndProps, Position } from "../../../types";
import { findColumnByCardId, reorderCardsInColumn } from "../../../utils";

export interface ISameColumnProps {
  activeColumnId: string | number;
  activeId: string | number;
  overId: string | number;
  cycle?: project_kanban_cycle | null;
  updateInsertPosition: (insertPosition: Position | null) => void;
  onBoardUpdate?: IUseDndProps["onBoardUpdate"];
  eventType: "card" | "main-task";
}

export const sameColumn = ({
  activeColumnId,
  activeId,
  overId,
  cycle,
  updateInsertPosition,
  onBoardUpdate,
  eventType,
}: ISameColumnProps) => {
  const columns = cycle?.project_kanban_cycle_columns;
  const overColumnId = findColumnByCardId({ cardId: overId, cycle })?.id;

  if (!overColumnId) {
    updateInsertPosition(null);
    return;
  }

  if (activeColumnId === overColumnId) {
    // Reorder within same column
    const newBoard = reorderCardsInColumn({
      columnId: activeColumnId,
      activeCardId: activeId,
      overCardId: overId,
      cycle: cycle!,
    });
    const card = columns
      ?.find((col) => col.id === activeColumnId)
      ?.project_kanban_cycle_cards?.find((c) => c.id === activeId);
    if (card) {
      // Calculate new order based on position in the reordered array
      const newColumn = newBoard.project_kanban_cycle_columns?.find(
        (col) => col.id === activeColumnId
      );
      const newOrder =
        newColumn?.project_kanban_cycle_cards?.findIndex((c) => c.id === activeId) || 0;

      const updatedCard = {
        ...card,
        order: newOrder + 1, // Order is 1-indexed
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
