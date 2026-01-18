"use client";

import { useState } from "react";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { project_kanban_cycle_card_type } from "@repo/types";

import { Permission } from "@/components/permission";

import { useKanbanShow } from "../../../../../context";
import { AddCard } from "../add-card";
import { KanbanCardForm } from "../card-form";
import { CardPlaceholder } from "../placeholder";
import { SortableKanbanCard } from "../sortable-card";
import { ITaskRowColumnProps } from "./types";
import { useComponent } from "./use";

export const TaskRowColumn = ({
  column,
  subTasks,
  insertPosition,
  isDragActive,
  mainTaskId,
  activeCard,
  loading,
}: ITaskRowColumnProps) => {
  const {
    setNodeRef,
    setTopDropRef,
    setBottomDropRef,
    shouldShowPlaceholder,
    shouldShowBottomPlaceholder,
  } = useComponent({
    column,
    mainTaskId,
    insertPosition,
    isDragActive,
    subTasks,
    activeCard,
  });

  const { data, page, general } = useKanbanShow();

  const [fakeCardType, setFakeCardType] = useState<project_kanban_cycle_card_type | null>(null);

  const handleAddCard = (cardType: project_kanban_cycle_card_type) => {
    setFakeCardType(cardType);
    general.handleState({
      type: "card",
    });
    page.setIsCreatingLCard(true);
  };

  const handleCancelCard = () => {
    setFakeCardType(null);
    page.setIsCreatingLCard(false);
  };

  const inCreating = page.isCreatingLCard && fakeCardType;

  return (
    <div className="border-border bg-sidebar mb-6 min-h-[120px] w-80 flex-shrink-0 border-t-3 border-r-3 border-b-3 p-1">
      <div ref={setNodeRef} className="h-full">
        <SortableContext
          items={subTasks.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="relative flex h-full min-h-[180px] flex-col pb-10">
            {/* Drop zone para inserção no início (apenas quando há cards) */}
            {(subTasks.length > 0 || inCreating) && (
              <div ref={setTopDropRef}>
                {<CardPlaceholder visible={shouldShowPlaceholder(0)} />}
              </div>
            )}

            {subTasks.map((card, index) => {
              return (
                <div key={card.id}>
                  {index > 0 && <CardPlaceholder visible={shouldShowPlaceholder(index)} />}
                  <SortableKanbanCard
                    visibleCards={data.visibleCards}
                    card={card}
                    column={column}
                    loading={loading}
                  />
                </div>
              );
            })}

            {/* Criação inline - sempre na primeira posição */}
            {inCreating && (
              <KanbanCardForm
                cardType={fakeCardType}
                columnId={column.id}
                parentCardId={mainTaskId}
                onCancel={handleCancelCard}
              />
            )}

            {/* Drop zone para inserção no final */}
            <div ref={setBottomDropRef}>
              {<CardPlaceholder visible={shouldShowBottomPlaceholder()} />}
            </div>
            <Permission permission={["store"]} feature="project_kanban_cycle_card">
              <div className="absolute right-0 bottom-0 left-0">
                <AddCard loading={loading} handleAddCard={handleAddCard} />
              </div>
            </Permission>
          </div>
        </SortableContext>
      </div>
    </div>
  );
};
