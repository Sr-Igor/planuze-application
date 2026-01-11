import { project_kanban_cycle_card } from "@repo/api/generator/types";

import { cases } from "./cases/_index";
import { IHandleTasksDragEndProps } from "./types";

export const handleTasksDragEnd = ({
  event,
  cycle,
  onBoardUpdate,
  insertPosition,
  updateInsertPosition,
}: IHandleTasksDragEndProps): boolean => {
  const { active, over } = event;

  // Limpar posição de inserção imediatamente
  updateInsertPosition(null);

  if (!over || !cycle) return false;

  const activeId = active.id;
  const overId = over.id;

  // Evitar atualizações desnecessárias - comparação mais rigorosa
  if (activeId === overId) return false;

  const activeData = active.data.current;
  const overData = over.data.current;

  // Drag de subCard para mudar de coluna ou task principal
  if (activeData?.type === "card" || activeData?.type === "main-task") {
    const card = activeData.card as project_kanban_cycle_card;

    // Drop em uma task row column (mudar coluna e/ou task principal)
    if (overData?.type === "task-row-column") {
      return cases.samePrincipalDiffColumn({
        card,
        overData,
        insertPosition,
        cycle,
        onBoardUpdate,
      });
    }

    // Drop sobre outro card (reordenação dentro da mesma task/coluna)
    if (overData?.type === "card" || overData?.type === "main-task") {
      // Para main-task, a propriedade é 'task', para card é 'card'
      const overCard =
        overData.type === "main-task"
          ? (overData.task as project_kanban_cycle_card)
          : (overData.card as project_kanban_cycle_card);

      // Verificar se overCard existe e tem as propriedades necessárias
      // Para cards unlinked, card_id pode ser null, então não verificar essa propriedade
      if (!overCard || !overCard.project_kanban_cycle_column_id) {
        return false;
      }

      // Verificar se é mesmo card principal e mesma coluna (reordenação)
      // Tratar cards unlinked (card_id = null) corretamente
      const isSameTask =
        (overCard.card_id === null && card.card_id === null) || overCard.card_id === card.card_id;
      const isSameColumn =
        overCard.project_kanban_cycle_column_id === card.project_kanban_cycle_column_id;
      const isDifferentTask = !isSameTask;
      const isDifferentColumn = !isSameColumn;

      if (isSameTask && isSameColumn) {
        return cases.samePrincipalSameColumn({
          card,
          overCard,
          cycle,
          onBoardUpdate,
        });
      } else if (
        // Mesma coluna mas task principal diferente
        isSameColumn &&
        isDifferentTask
      ) {
        return cases.diffPrincipalSameColumn({
          card,
          overCard,
          cycle,
          onBoardUpdate,
        });
      } else if (
        // Coluna diferente E task principal diferente
        isDifferentColumn &&
        isDifferentTask
      ) {
        return cases.diffPrincipalDiffColumn({
          card,
          overCard,
          cycle,
          onBoardUpdate,
        });
      } else if (
        // Coluna diferente MAS mesma task principal
        isDifferentColumn &&
        isSameTask
      ) {
        return cases.samePrincipalDiffColumnCard({
          card,
          overCard,
          cycle,
          onBoardUpdate,
        });
      }

      return false;
    }

    return false;
  }

  return false;
};
