import { Over } from "@dnd-kit/core";

import { project_kanban_cycle, project_kanban_cycle_card } from "@repo/types";

import { IUseDndProps, Position } from "../../../types";
import { moveSubCardBetweenTaskColumns } from "../../../utils/moveSubCardBetweenTaskColumns";

type SamePrincipalDiffColumnProps = {
  card: project_kanban_cycle_card;
  overData: Over["data"]["current"];
  insertPosition: Position | null;
  cycle?: project_kanban_cycle | null;
  onBoardUpdate?: IUseDndProps["onBoardUpdate"];
};

export const samePrincipalDiffColumn = ({
  card,
  overData,
  insertPosition,
  cycle,
  onBoardUpdate,
}: SamePrincipalDiffColumnProps): boolean => {
  const targetColumnId = overData?.columnId;
  const targetMainTaskId = overData?.mainTaskId;

  // Verificar se realmente há mudança
  const hasColumnChange = targetColumnId !== card.project_kanban_cycle_column_id;

  // Para cards unlinked, comparar corretamente com null
  const hasTaskChange = (() => {
    if (targetMainTaskId === "unlinked" && card.card_id === null) return false;
    if (targetMainTaskId === "unlinked" && card.card_id !== null) return true;
    if (targetMainTaskId !== "unlinked" && card.card_id === null) return true;
    return targetMainTaskId !== card.card_id;
  })();

  // Se não há mudança real, não fazer nada
  if (!hasColumnChange && !hasTaskChange) return false;

  if (hasColumnChange || hasTaskChange) {
    // Calcular nova ordem baseada na posição de inserção
    let insertIndex = 0;

    if (overData?.position === "bottom") {
      // Encontrar quantos subCards existem para inserir no final
      const targetColumn = cycle?.project_kanban_cycle_columns?.find(
        (col) => col.id === targetColumnId
      );
      const existingSubTasks =
        targetColumn?.project_kanban_cycle_cards?.filter((c) => {
          // Para cards unlinked, comparar com null, senão comparar com o card_id
          if (targetMainTaskId === "unlinked") {
            return c.card_id === null && c.id !== card.id;
          }
          return c.card_id === targetMainTaskId && c.id !== card.id;
        }) || [];
      insertIndex = existingSubTasks.length;
    } else if (
      insertPosition &&
      insertPosition.columnId === targetColumnId &&
      insertPosition.mainTaskId === targetMainTaskId
    ) {
      // Usar a posição calculada pelo drag over
      insertIndex = insertPosition.index;
    } else {
      // Inserir no início
      insertIndex = 0;
    }

    // Encontrar coluna de origem
    const sourceColumnId = card.project_kanban_cycle_column_id;

    // Se o targetMainTaskId for 'unlinked', definir card_id como nulo
    const finalTargetMainTaskId = targetMainTaskId === "unlinked" ? null : targetMainTaskId;

    // Usar função otimista para mover o card
    const { board: newBoard, changed } = moveSubCardBetweenTaskColumns({
      cardId: card.id,
      sourceColumnId,
      targetColumnId,
      targetMainTaskId: finalTargetMainTaskId,
      insertIndex,
      cycle,
    });

    if (changed && onBoardUpdate) {
      // Encontrar o card atualizado no novo board
      const targetColumn = newBoard.project_kanban_cycle_columns?.find(
        (col) => col.id === targetColumnId
      );
      const updatedCard = targetColumn?.project_kanban_cycle_cards?.find((c) => c.id === card.id);

      if (updatedCard) {
        onBoardUpdate({ board: newBoard, item: updatedCard, type: "card", moment: "secondary" });
      }
    }
  }
  return true;
};
