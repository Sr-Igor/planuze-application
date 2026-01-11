"use client";

import { useMemo } from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { project_kanban_cycle_card } from "@repo/api/generator/types";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";

import { checkVisibility } from "../../../hooks/useDnd/utils/isVisible";
import { ITaskRowProps } from "./types";

export const useComponent = ({
  mainTask,
  columns,
  index,
}: Pick<ITaskRowProps, "mainTask" | "columns" | "index">) => {
  const { data } = useKanbanShow();

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: mainTask.id,
    data: {
      type: "main-task",
      task: mainTask,
      index,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const subTasksByColumn = useMemo(() => {
    const result: Record<string, project_kanban_cycle_card[]> = {};

    columns.forEach((column) => {
      result[column.id] = [];

      column.project_kanban_cycle_cards?.forEach((card) => {
        const cardType = data.cardsTypes?.find(
          (cardType) => cardType.id === card.project_kanban_cycle_card_type_id
        );

        if (
          !cardType?.principal &&
          (card.card_id === mainTask.id || (mainTask.id === "unlinked" && card.card_id === null))
        ) {
          result[column.id].push(card);
        }
      });

      result[column.id].sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    return result;
  }, [columns, mainTask.id]);

  const allSubTasks = Object.values(subTasksByColumn).flat();
  const completedSubtasks = allSubTasks.filter((subtask) => {
    const column = columns.find((col) => col.id === subtask.project_kanban_cycle_column_id);
    return column?.finished === true;
  }).length;
  const progressPercentage =
    allSubTasks.length > 0 ? (completedSubtasks / allSubTasks.length) * 100 : 0;

  const isMainTaskVisible = useMemo(() => {
    const bySearch = checkVisibility(mainTask, data.visibleCards);

    const byChildren = allSubTasks.some((subtask) => {
      return checkVisibility(subtask, data.visibleCards);
    });

    return bySearch || byChildren;
  }, [mainTask, data.visibleCards]);

  return {
    attributes,
    listeners,
    setNodeRef,
    style,
    isDragging,
    subTasksByColumn,
    allSubTasks,
    completedSubtasks,
    progressPercentage,
    isMainTaskVisible,
  };
};
