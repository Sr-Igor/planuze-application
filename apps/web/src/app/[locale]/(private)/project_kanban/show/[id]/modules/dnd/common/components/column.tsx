"use client";

import { memo, useMemo } from "react";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, Card, CardContent, ScrollArea } from "@repo/ui";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { Permission } from "@/components/ui/permission";
import { cn } from "@repo/ui";

import { KanbanColumnProps } from "../../types";
import { HeaderColumn } from "./header-column";
import { CardPlaceholder } from "./placeholder";
import { SortableKanbanCard } from "./sortable-card";

const KanbanColumnComponent = ({
  column,
  className,
  insertPosition,
  isDragActive,
  dragListeners,
  loading,
  visibleCards,
}: KanbanColumnProps) => {
  const t = useLang();
  const tKanban = t.page.kanban;

  const { state } = useKanbanShow();

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const { setNodeRef: setBottomDropZoneRef } = useDroppable({
    id: `${column.id}-bottom`,
  });

  const cards = useMemo(
    () => column.project_kanban_cycle_cards || [],
    [column.project_kanban_cycle_cards]
  );

  return (
    <div className="bg-sidebar flex h-full flex-col">
      <HeaderColumn
        column={column}
        loading={loading}
        dragListeners={dragListeners}
        visibleCards={visibleCards}
      />
      <Card
        className={cn(
          "w-80 flex-shrink-0 rounded-none border-none bg-transparent p-0",
          "h-[calc(100%-50px)] overflow-hidden",
          className
        )}
      >
        <ScrollArea className="h-full">
          <CardContent
            ref={setNodeRef}
            className="relative h-full overflow-hidden bg-transparent p-1"
          >
            <SortableContext
              items={cards.map((card) => card.id)}
              strategy={verticalListSortingStrategy}
            >
              {cards.map((card, index) => {
                const shouldShowPlaceholder =
                  isDragActive &&
                  insertPosition?.columnId === column.id &&
                  insertPosition.index === index;

                return (
                  <div key={card.id}>
                    {<CardPlaceholder visible={shouldShowPlaceholder} />}
                    <SortableKanbanCard
                      card={card}
                      column={column}
                      loading={loading}
                      visibleCards={visibleCards}
                    />
                  </div>
                );
              })}

              {
                <CardPlaceholder
                  visible={
                    isDragActive &&
                    insertPosition?.columnId === column.id &&
                    insertPosition.index >= cards.length
                  }
                />
              }
            </SortableContext>
            {cards.length === 0 && !isDragActive && (
              <div className="text-muted-foreground py-8 text-center">
                <p className="mb-2 text-sm">{tKanban("component.column.no_card_in_column")}</p>
                <Permission permission={["store"]} feature="project_kanban_cycle_card">
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      state.card.store({ columnId: column.id });
                    }}
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    {tKanban("component.column.add_first_card")}
                  </Button>
                </Permission>
              </div>
            )}
            {isDragActive && (
              <div ref={setBottomDropZoneRef} className={cn("h-8 min-h-8 w-full")} />
            )}
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export const KanbanColumn = memo(KanbanColumnComponent, (prevProps, nextProps) => {
  const jsonOldCards = JSON.stringify(prevProps.column.project_kanban_cycle_cards);
  const jsonNewCards = JSON.stringify(nextProps.column.project_kanban_cycle_cards);

  return (
    prevProps.column.id === nextProps.column.id &&
    prevProps.loading === nextProps.loading &&
    prevProps.isDragActive === nextProps.isDragActive &&
    prevProps.column.updatedAt === nextProps.column.updatedAt &&
    prevProps.column.title === nextProps.column.title &&
    prevProps.column.limit === nextProps.column.limit &&
    jsonOldCards === jsonNewCards &&
    JSON.stringify(prevProps.visibleCards) === JSON.stringify(nextProps.visibleCards) &&
    JSON.stringify(prevProps.insertPosition) === JSON.stringify(nextProps.insertPosition)
  );
});
