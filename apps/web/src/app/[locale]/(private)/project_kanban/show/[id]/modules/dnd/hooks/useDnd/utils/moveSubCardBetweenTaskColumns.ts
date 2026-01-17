import { project_kanban_cycle } from "@repo/types";

type MoveSubCardBetweenTaskColumnsProps = {
  cardId: string;
  sourceColumnId: string;
  targetColumnId: string;
  targetMainTaskId: string | null;
  insertIndex: number;
  cycle?: project_kanban_cycle | null;
};
export const moveSubCardBetweenTaskColumns = ({
  cardId,
  sourceColumnId,
  targetColumnId,
  targetMainTaskId,
  insertIndex,
  cycle,
}: MoveSubCardBetweenTaskColumnsProps): {
  board: project_kanban_cycle;
  changed: boolean;
} => {
  if (!cycle?.project_kanban_cycle_columns) {
    return { board: cycle!, changed: false };
  }

  const sourceColumn = cycle.project_kanban_cycle_columns.find((col) => col.id === sourceColumnId);
  const targetColumn = cycle.project_kanban_cycle_columns.find((col) => col.id === targetColumnId);

  if (!sourceColumn || !targetColumn) {
    return { board: cycle, changed: false };
  }

  const card = sourceColumn.project_kanban_cycle_cards?.find((c) => c.id === cardId);
  if (!card) {
    return { board: cycle, changed: false };
  }

  // Criar novo board otimista
  const newColumns = cycle.project_kanban_cycle_columns.map((column) => {
    if (column.id === sourceColumnId && column.id === targetColumnId) {
      // Mesma coluna - apenas reorganizar cards
      const existingCards = column.project_kanban_cycle_cards || [];

      // Remover o card atual da lista
      const cardsWithoutCurrent = existingCards.filter((c) => c.id !== cardId);

      // Obter cards da task principal de destino e ordenar por ordem
      const targetSubCards = cardsWithoutCurrent.filter((c) => c.card_id === targetMainTaskId);
      const sortedTargetSubCards = [...targetSubCards].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );

      const updatedCard = {
        ...card,
        project_kanban_cycle_column_id: targetColumnId,
        card_id: targetMainTaskId,
        order: insertIndex + 1,
        updatedAt: new Date().toISOString(),
      };

      // Inserir na posição correta dentro da task principal
      const newSubCards = [...sortedTargetSubCards];
      const safeInsertIndex = Math.min(insertIndex, newSubCards.length);
      newSubCards.splice(safeInsertIndex, 0, updatedCard);

      // Recalcular as ordens de forma sequencial
      const reorderedSubCards = newSubCards.map((c, index) => ({
        ...c,
        order: index + 1,
      }));

      // Adicionar outros cards que não são da task principal de destino
      const otherCards = cardsWithoutCurrent.filter((c) => c.card_id !== targetMainTaskId);

      return {
        ...column,
        project_kanban_cycle_cards: [...otherCards, ...reorderedSubCards],
      };
    } else if (column.id === sourceColumnId) {
      // Remover card da coluna de origem (colunas diferentes)
      return {
        ...column,
        project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
          (c) => c.id !== cardId
        ),
      };
    } else if (column.id === targetColumnId) {
      // Adicionar card na coluna de destino (colunas diferentes)
      const existingCards = column.project_kanban_cycle_cards || [];
      const targetSubCards = existingCards.filter((c) => {
        // Para cards unlinked, comparar com null, senão comparar com o card_id
        if (targetMainTaskId === null) {
          return c.card_id === null && c.id !== cardId;
        }
        return c.card_id === targetMainTaskId && c.id !== cardId;
      });

      // Ordenar por ordem para calcular a posição correta
      const sortedTargetSubCards = [...targetSubCards].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );

      const updatedCard = {
        ...card,
        project_kanban_cycle_column_id: targetColumnId,
        card_id: targetMainTaskId,
        order: insertIndex + 1,
        updatedAt: new Date().toISOString(),
      };

      // Inserir na posição correta
      const newCards = [...sortedTargetSubCards];

      // Ajustar insertIndex se for maior que o array
      const safeInsertIndex = Math.min(insertIndex, newCards.length);
      newCards.splice(safeInsertIndex, 0, updatedCard);

      // Recalcular as ordens de forma sequencial
      const reorderedCards = newCards.map((c, index) => ({
        ...c,
        order: index + 1,
      }));

      // Adicionar outros cards que não são da mesma task principal
      const otherCards = existingCards.filter(
        (c) => c.card_id !== targetMainTaskId && c.id !== cardId
      );

      return {
        ...column,
        project_kanban_cycle_cards: [...otherCards, ...reorderedCards],
      };
    }
    return column;
  });

  return {
    board: { ...cycle, project_kanban_cycle_columns: newColumns },
    changed: true,
  };
};
