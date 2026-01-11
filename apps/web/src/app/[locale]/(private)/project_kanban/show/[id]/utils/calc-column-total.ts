import { project_kanban_cycle_column } from "@repo/api/generator/types";

import { checkVisibility } from "../modules/dnd/hooks/useDnd/utils/isVisible";
import { VisibleCards } from "../modules/dnd/types";

export const calcColumnTotal = (
  column: project_kanban_cycle_column,
  visibleCards: VisibleCards
) => {
  const cards = column.project_kanban_cycle_cards?.filter((card) =>
    checkVisibility(card, visibleCards)
  );

  return cards?.length || 0;
};
