"use client";

import { memo, useCallback } from "react";

import { Loader2 } from "lucide-react";

import { project_kanban_cycle_card } from "@repo/api/generator/types";

import { useProjectKanbanCycleCard } from "@/api/callers/project_kanban_cycle_card";
import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { useAccess } from "@/hooks/access";
import { cn } from "@/lib/utils";

import { useCardForm } from "../../../../card-form-edit/use-form";
import { KanbanCardProps } from "../../../types";
import { Content, Header, Root } from "./components";
import { useClick, useComponent } from "./hooks";

const KanbanCardComponent = ({
  card,
  isDragging,
  className,
  column,
  loading: externalLoading,
  allSubTasks = [],
  completedSubtasks,
  progressPercentage,
  visibleCards = {},
  invisible = false,
  isPlaceholder = false,
}: KanbanCardProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle_card");

  const { page, general } = useKanbanShow();

  const { update } = useProjectKanbanCycleCard({
    id: card.id,
    cycleId: page.cycle?.id,
  });

  const loading = update.isPending || externalLoading || general.state.inLoading?.includes(card.id);

  const { selected, setSelected, cardRef, cardType, tags, isVisible, isUnlinked, cardId } =
    useComponent({
      card,
      visibleCards,
      invisible,
      loading: externalLoading,
    });

  const { hook, handleSubmit, isDisabled } = useCardForm({
    item: card,
    onSubmit: useCallback(
      (form) => {
        update.mutate(form as Partial<project_kanban_cycle_card>);
      },
      [update]
    ),
  });

  const handleReset = useCallback(() => {
    hook.reset(card);
  }, [hook, card]);

  useClick({
    selected,
    cardRef,
    setSelected,
    handleSubmit,
    isDisabled,
    reset: handleReset,
  });

  if (!isVisible) return null;

  return (
    <Root
      cardRef={cardRef}
      card={card}
      cardId={cardId}
      selected={selected}
      setSelected={setSelected}
      isDragging={isDragging}
      className={className}
      loading={loading}
      isUnlinked={isUnlinked}
      isPlaceholder={isPlaceholder}
      disabled={!perm.update}
    >
      <div
        className={cn(
          "bg-primary/10 absolute top-0 left-0 z-[-1] flex h-full w-full items-start justify-end pt-1.5 pr-1.5 opacity-0",
          "transition-all duration-300 ease-in-out",
          loading && "z-1 opacity-100"
        )}
      >
        <Loader2 className="animate-spin" size={35} strokeWidth={2} />
      </div>

      {!loading && (
        <div
          className="absolute top-0 left-0 h-full w-1"
          style={{
            backgroundColor: cardType?.color || "transparent",
          }}
        />
      )}
      <span
        className={cn(
          "flex flex-col justify-between gap-1 transition-opacity duration-300 ease-in-out"
        )}
      >
        <Header
          cardType={cardType}
          card={card}
          column={column}
          isUnlinked={isUnlinked}
          cardId={cardId}
        />

        <Content
          hook={hook}
          card={card}
          allSubTasks={allSubTasks}
          completedSubtasks={completedSubtasks}
          progressPercentage={progressPercentage}
          tags={tags}
          cardId={cardId}
          isUnlinked={isUnlinked}
          disabled={!perm.update}
        />
      </span>
    </Root>
  );
};

export const KanbanCard = memo(KanbanCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.card.id === nextProps.card.id &&
    prevProps.isDragging === nextProps.isDragging &&
    prevProps.loading === nextProps.loading &&
    prevProps.invisible === nextProps.invisible &&
    prevProps.isPlaceholder === nextProps.isPlaceholder &&
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
    prevProps.completedSubtasks === nextProps.completedSubtasks &&
    prevProps.progressPercentage === nextProps.progressPercentage &&
    JSON.stringify(prevProps.visibleCards) === JSON.stringify(nextProps.visibleCards)
  );
});
