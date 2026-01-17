"use client";

import { memo, useMemo } from "react";

import { DragOverlay } from "@dnd-kit/core";

import { project_kanban_cycle_card, project_kanban_cycle_column } from "@repo/types";

import { VisibleCards } from "../../types";
import { KanbanCard } from "./card";
import { KanbanColumn } from "./column";

interface OptimizedDragOverlayProps {
  activeItem: {
    type: "card" | "column" | "main-task";
    item: project_kanban_cycle_card | project_kanban_cycle_column;
  } | null;
  columns?: project_kanban_cycle_column[];
  visibleCards: VisibleCards;
  loading: boolean;
}

const OptimizedCardOverlay = memo(
  ({
    card,
    columns,
    visibleCards,
    loading,
  }: {
    card: project_kanban_cycle_card;
    columns?: project_kanban_cycle_column[];
    visibleCards: VisibleCards;
    loading: boolean;
  }) => {
    const column = useMemo(() => {
      return (
        columns?.find((col) => col.project_kanban_cycle_cards?.some((c) => c.id === card.id)) ||
        columns?.[0] ||
        null
      );
    }, [columns, card.id]);

    if (!column) return null;

    return (
      <KanbanCard
        card={card}
        isDragging
        isPlaceholder={true}
        column={column}
        loading={loading}
        visibleCards={visibleCards}
      />
    );
  }
);

OptimizedCardOverlay.displayName = "OptimizedCardOverlay";

const OptimizedColumnOverlay = memo(
  ({
    column,
    visibleCards,
    loading,
  }: {
    column: project_kanban_cycle_column;
    visibleCards: VisibleCards;
    loading: boolean;
  }) => {
    return (
      <KanbanColumn
        column={column}
        className="opacity-90 shadow-2xl"
        isDragActive={true}
        loading={loading}
        visibleCards={visibleCards}
      />
    );
  }
);

OptimizedColumnOverlay.displayName = "OptimizedColumnOverlay";

const OptimizedMainTaskOverlay = memo(
  ({
    mainTask,
    columns,
    visibleCards,
    loading,
  }: {
    mainTask: project_kanban_cycle_card;
    columns?: project_kanban_cycle_column[];
    visibleCards: VisibleCards;
    loading: boolean;
  }) => {
    return (
      <div className="flex min-w-fit rounded-lg opacity-90">
        <div className="bg-sidebar border-border flex w-80 flex-shrink-0 items-start justify-start gap-2 border-r-3 p-1.5">
          <div className="h-6 w-6 flex-shrink-0" />

          <KanbanCard
            card={mainTask}
            isDragging={true}
            isPlaceholder={true}
            column={
              columns?.[0] ||
              mainTask.project_kanban_cycle_column ||
              ({} as project_kanban_cycle_column)
            }
            loading={loading}
            visibleCards={visibleCards}
          />
        </div>
      </div>
    );
  }
);

OptimizedMainTaskOverlay.displayName = "OptimizedMainTaskOverlay";

export const OptimizedDragOverlay = memo(
  ({ activeItem, columns, visibleCards, loading }: OptimizedDragOverlayProps) => {
    const overlayContent = useMemo(() => {
      if (!activeItem) return null;

      if (activeItem.type === "card") {
        return (
          <OptimizedCardOverlay
            card={activeItem.item as project_kanban_cycle_card}
            columns={columns}
            visibleCards={visibleCards}
            loading={loading}
          />
        );
      }

      if (activeItem.type === "main-task") {
        return (
          <OptimizedMainTaskOverlay
            mainTask={activeItem.item as project_kanban_cycle_card}
            columns={columns}
            visibleCards={visibleCards}
            loading={loading}
          />
        );
      }

      if (activeItem.type === "column") {
        return (
          <OptimizedColumnOverlay
            column={activeItem.item as project_kanban_cycle_column}
            visibleCards={visibleCards}
            loading={loading}
          />
        );
      }

      return null;
    }, [activeItem, columns, visibleCards, loading]);

    return <DragOverlay>{overlayContent}</DragOverlay>;
  }
);

OptimizedDragOverlay.displayName = "OptimizedDragOverlay";
