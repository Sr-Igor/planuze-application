import { Over } from "@dnd-kit/core";

import { project_kanban_cycle, project_kanban_cycle_card } from "@repo/api/generator/types";

import { Position } from "../../../types";

export interface IComplexityProps {
  card?: project_kanban_cycle_card;
  overData?: Over["data"]["current"] | null;
  cycle?: project_kanban_cycle;
  updateInsertPosition: (insertPosition: Position | null) => void;
}

/**
 * Caso complexo de handleTasksDragOver - Ordenação alterando o card principal
 * @param param0 IComplexityProps
 * @returns
 */
export const complexity = ({
  card,
  overData,
  cycle,
  updateInsertPosition,
}: IComplexityProps): boolean => {
  const overCard = overData?.card as project_kanban_cycle_card;

  const overCardMainTaskId = overCard.card_id;

  // Tratar tanto cards com card_id definido quanto cards unlinked (card_id = null)
  const overColumn = cycle?.project_kanban_cycle_columns?.find((col) =>
    col.project_kanban_cycle_cards?.some((c) => c.id === overCard.id)
  );

  if (overColumn) {
    // Para cards unlinked, usar null como mainTaskId, senão usar o card_id
    const targetMainTaskId = overCardMainTaskId === null ? "unlinked" : overCardMainTaskId;

    const siblingSubTasks =
      overColumn.project_kanban_cycle_cards?.filter((c) => {
        // Para cards unlinked, comparar com null, senão comparar com o card_id
        if (overCardMainTaskId === null) {
          return (
            c.card_id === null && c.id !== card?.id && !c.project_kanban_cycle_card_type?.principal
          );
        }
        return c.card_id === overCardMainTaskId && c.id !== card?.id;
      }) || [];

    const sortedSiblingTasks = [...siblingSubTasks].sort((a, b) => (a.order || 0) - (b.order || 0));

    const overCardIndex = sortedSiblingTasks.findIndex((c) => c.id === overCard.id);
    const insertIndex = overCardIndex !== -1 ? overCardIndex : sortedSiblingTasks.length;

    updateInsertPosition({
      columnId: overColumn.id,
      mainTaskId: targetMainTaskId,
      index: insertIndex,
    });
    return true;
  }

  return false;
};
