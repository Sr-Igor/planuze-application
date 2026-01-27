"use client";

import { memo } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useUserAccess } from "@repo/redux/hooks";
import { cn } from "@repo/ui";

import { useKanbanShow } from "../../../../context";
import { SortableKanbanCardProps } from "../../types";
import { KanbanCard } from "./card";

const SortableKanbanCardComponent = ({
  card,
  column,
  loading,
  visibleCards,
}: SortableKanbanCardProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_kanban_cycle_card");

  const { general } = useKanbanShow();

  const disabled = general.state.inLoading?.includes(card.id);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(perm.many ? attributes : {})}
      {...(perm.many ? listeners : {})}
      className={cn(perm.many && "cursor-grab", disabled && "pointer-events-none cursor-progress")}
    >
      <KanbanCard
        card={card}
        isDragging={isDragging}
        column={column}
        loading={loading}
        visibleCards={visibleCards}
      />
    </div>
  );
};

export const SortableKanbanCard = memo(SortableKanbanCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.card.id === nextProps.card.id &&
    prevProps.loading === nextProps.loading &&
    prevProps.card.updatedAt === nextProps.card.updatedAt &&
    prevProps.card.title === nextProps.card.title &&
    prevProps.card.project_kanban_cycle_column_id ===
      nextProps.card.project_kanban_cycle_column_id &&
    prevProps.card.project_kanban_cycle_card_type_id ===
      nextProps.card.project_kanban_cycle_card_type_id &&
    prevProps.card.work_type_id === nextProps.card.work_type_id &&
    prevProps.card.estimate === nextProps.card.estimate &&
    prevProps.card.estimate_unit === nextProps.card.estimate_unit &&
    prevProps.card.profile_id === nextProps.card.profile_id &&
    prevProps.card.card_id === nextProps.card.card_id &&
    JSON.stringify(prevProps.visibleCards) === JSON.stringify(nextProps.visibleCards)
  );
});
