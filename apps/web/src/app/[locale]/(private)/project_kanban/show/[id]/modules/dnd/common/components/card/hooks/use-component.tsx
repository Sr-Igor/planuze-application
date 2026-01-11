import { useMemo, useRef, useState } from "react";

import { project_kanban_cycle_card } from "@repo/api/generator/types";

import { useKanbanShow } from "../../../../../../context";
import { checkVisibility } from "../../../../hooks/useDnd/utils/isVisible";
import { VisibleCards } from "../../../../types";

export interface IUseComponentProps {
  card: project_kanban_cycle_card;
  visibleCards: VisibleCards;
  invisible: boolean;
  loading: boolean;
}

export const useComponent = ({ card, visibleCards, invisible, loading }: IUseComponentProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { data } = useKanbanShow();

  const [selected, setSelected] = useState(false);

  const cardType = data.cardsTypes?.find(
    (cardType) => cardType.id === card.project_kanban_cycle_card_type_id
  );
  const tags = card.project_kanban_cycle_card_tags;

  const isVisible = useMemo(() => {
    return (checkVisibility(card, visibleCards) && !invisible) || loading;
  }, [card, visibleCards]);

  const isUnlinked = card.id === "unlinked";
  const cardId = `kanban-card-${card.id}`;

  return {
    selected,
    setSelected,
    cardRef,
    cardType,
    tags,
    isVisible,
    isUnlinked,
    cardId,
  };
};
