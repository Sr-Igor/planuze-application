import { Over } from "@dnd-kit/core";

import { project_kanban_cycle, project_kanban_cycle_card } from "@repo/types";

import { Position } from "../../../types";

export interface ISimpleProps {
  card?: project_kanban_cycle_card;
  overData?: Over["data"]["current"] | null;
  cycle?: project_kanban_cycle;
  updateInsertPosition: (insertPosition: Position | null) => void;
}

/**
 * Caso simples de handleTasksDragOver - Ordenação em mesma linha (mantendo o card principal)
 * @param param0 ISimpleProps
 * @returns
 */

export const simple = ({ card, overData, cycle, updateInsertPosition }: ISimpleProps): boolean => {
  const targetColumnId = overData?.columnId;
  const targetMainTaskId = overData?.mainTaskId;

  const targetColumn = cycle?.project_kanban_cycle_columns?.find(
    (col) => col.id === targetColumnId
  );

  if (!targetColumn) {
    updateInsertPosition(null);
    return false;
  }

  const existingSubTasks =
    targetColumn?.project_kanban_cycle_cards?.filter((c) => {
      // Para cards unlinked, comparar com null, senão comparar com o card_id
      if (targetMainTaskId === "unlinked") {
        return (
          c.card_id === null && c.id !== card?.id && !c.project_kanban_cycle_card_type?.principal
        );
      }
      return c.card_id === targetMainTaskId && c.id !== card?.id;
    }) || [];

  let insertIndex = 0;

  if (overData?.position === "bottom") {
    insertIndex = existingSubTasks.length;
  } else if (overData?.position === "top") {
    insertIndex = 0;
  } else {
    insertIndex = existingSubTasks.length;
  }

  updateInsertPosition({
    columnId: targetColumnId,
    mainTaskId: targetMainTaskId,
    index: insertIndex,
  });
  return true;
};
