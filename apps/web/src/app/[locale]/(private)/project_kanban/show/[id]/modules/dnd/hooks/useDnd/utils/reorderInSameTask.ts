import { arrayMove } from "@dnd-kit/sortable";

import { project_kanban_cycle } from "@repo/api/generator/types";

type ReorderCardsInSameTaskProps = {
  columnId: string;
  activeCardId: string;
  overCardId: string;
  taskMainId: string | null; // Permitir null para cards unlinked
  cycle?: project_kanban_cycle | null;
};

// Função para reordenar cards dentro da mesma task principal
export const reorderCardsInSameTask = ({
  columnId,
  activeCardId,
  overCardId,
  taskMainId,
  cycle,
}: ReorderCardsInSameTaskProps): {
  board: project_kanban_cycle;
  changed: boolean;
} => {
  if (!cycle?.project_kanban_cycle_columns) {
    return { board: cycle!, changed: false };
  }

  const column = cycle.project_kanban_cycle_columns.find((col) => col.id === columnId);
  if (!column) {
    return { board: cycle, changed: false };
  }

  // Obter apenas os cards da mesma task principal
  const taskCards =
    column.project_kanban_cycle_cards?.filter((c) => {
      // Para cards unlinked, comparar com null, senão comparar com o card_id
      if (taskMainId === null) {
        return c.card_id === null;
      }
      return c.card_id === taskMainId;
    }) || [];

  const activeIndex = taskCards.findIndex((card) => card.id === activeCardId);
  const overIndex = taskCards.findIndex((card) => card.id === overCardId);

  if (activeIndex === -1 || overIndex === -1 || activeIndex === overIndex) {
    return { board: cycle, changed: false };
  }

  // Reordenar apenas os cards da mesma task
  const reorderedTaskCards = arrayMove(taskCards, activeIndex, overIndex);

  // Atualizar as ordens dos cards reordenados
  const updatedTaskCards = reorderedTaskCards.map((card, index) => ({
    ...card,
    order: index + 1,
  }));

  // Obter outros cards da coluna (de outras tasks principais)
  const otherCards =
    column.project_kanban_cycle_cards?.filter((c) => {
      // Para cards unlinked, comparar com null, senão comparar com o card_id
      if (taskMainId === null) {
        return c.card_id !== null;
      }
      return c.card_id !== taskMainId;
    }) || [];

  // Criar nova coluna com cards reordenados
  const newColumns = cycle.project_kanban_cycle_columns.map((col) =>
    col.id === columnId
      ? {
          ...col,
          project_kanban_cycle_cards: [...otherCards, ...updatedTaskCards],
        }
      : col
  );

  return {
    board: { ...cycle, project_kanban_cycle_columns: newColumns },
    changed: true,
  };
};
