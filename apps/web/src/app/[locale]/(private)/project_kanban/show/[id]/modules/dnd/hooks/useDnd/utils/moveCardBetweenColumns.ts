import { project_kanban_cycle } from "@repo/api/generator/types";

export interface IMoveCardBetweenColumnsProps {
  cardId: string | number;
  sourceColumnId: string;
  targetColumnId: string;
  insertIndex?: number;
  cycle?: project_kanban_cycle | null;
}

export interface IReturnMoveCardBetweenColumns {
  board: project_kanban_cycle;
  changed: boolean;
}

export const moveCardBetweenColumns = ({
  cardId,
  sourceColumnId,
  targetColumnId,
  insertIndex,
  cycle,
}: IMoveCardBetweenColumnsProps): IReturnMoveCardBetweenColumns => {
  const columns = cycle?.project_kanban_cycle_columns;
  const sourceColumn = columns?.find((col) => col.id === sourceColumnId);
  const targetColumn = columns?.find((col) => col.id === targetColumnId);

  if (!sourceColumn || !targetColumn) return { board: cycle!, changed: false };

  const card = sourceColumn.project_kanban_cycle_cards?.find((card) => card.id === cardId);
  if (!card) return { board: cycle!, changed: false };

  // Check target column limit
  if (
    targetColumn.limit &&
    (targetColumn.project_kanban_cycle_cards?.length || 0) >= targetColumn.limit
  ) {
    return {
      board: cycle!,
      changed: false,
    };
  }

  const newColumns = columns?.map((column) => {
    if (column.id === sourceColumnId) {
      return {
        ...column,
        project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter(
          (card) => card.id !== cardId
        ),
      };
    } else if (column.id === targetColumnId) {
      const newCards = [...(column?.project_kanban_cycle_cards || [])];
      const updatedCard = { ...card, updatedAt: new Date().toISOString() };

      // Insert at specific position if provided, otherwise at the end
      if (insertIndex !== undefined && insertIndex >= 0 && insertIndex <= newCards.length) {
        newCards.splice(insertIndex, 0, updatedCard);
      } else {
        newCards.push(updatedCard);
      }

      return {
        ...column,
        project_kanban_cycle_cards: newCards,
      };
    }
    return column;
  });

  return {
    board: { ...cycle!, project_kanban_cycle_columns: newColumns },
    changed: true,
  };
};
