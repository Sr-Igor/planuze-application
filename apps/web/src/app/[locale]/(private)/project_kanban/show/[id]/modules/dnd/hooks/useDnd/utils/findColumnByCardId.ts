import { project_kanban_cycle } from "@repo/types";

export interface IFindColumnByCardIdProps {
  cardId: string | number;
  cycle?: project_kanban_cycle | null;
}

export const findColumnByCardId = ({ cardId, cycle }: IFindColumnByCardIdProps) => {
  const columns = cycle?.project_kanban_cycle_columns;
  return columns?.find((column) =>
    column.project_kanban_cycle_cards?.some((card) => card.id === cardId)
  );
};
