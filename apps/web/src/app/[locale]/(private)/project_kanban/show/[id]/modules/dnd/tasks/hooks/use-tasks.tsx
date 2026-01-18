"use client";

import { useMemo } from "react";

import { project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hooks";

import { useKanbanShow } from "../../../../context";
import { ExtendedProjectKanbanCycleCard } from "../../types";
import { fakeCard } from "./constants";

export const useTasks = () => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { page } = useKanbanShow();

  const { mainTasks, subTasks } = useMemo(() => {
    if (!page.cycle?.project_kanban_cycle_columns) return { mainTasks: [], subTasks: [] };

    const allCards: project_kanban_cycle_card[] = [];

    page.cycle.project_kanban_cycle_columns.forEach((column) => {
      if (column.project_kanban_cycle_cards) {
        allCards.push(...column.project_kanban_cycle_cards);
      }
    });

    const mainTasks: project_kanban_cycle_card[] = [];
    const subTasks: project_kanban_cycle_card[] = [];

    allCards.forEach((card) => {
      const cardType = card.project_kanban_cycle_card_type;

      if (cardType?.principal) {
        mainTasks.push(card);
      } else {
        subTasks.push(card);
      }
    });

    return { mainTasks, subTasks };
  }, [page.cycle]);

  const tasksWithSubtasks = useMemo(() => {
    return mainTasks.map((mainTask) => {
      const relatedSubtasks = subTasks.filter((subTask) => subTask.card_id === mainTask.id);
      return {
        ...mainTask,
        subtasks: relatedSubtasks,
      };
    });
  }, [mainTasks, subTasks]);

  const orphanSubtasks = useMemo(() => {
    return subTasks.filter(
      (subTask) =>
        !subTask.card_id || !mainTasks.some((mainTask) => mainTask.id === subTask.card_id)
    );
  }, [subTasks, mainTasks]);

  const unlinkedTask: ExtendedProjectKanbanCycleCard = useMemo(() => {
    return { ...fakeCard, id: "unlinked", title: t("unlinked") };
  }, []);

  return {
    tasksWithSubtasks,
    orphanSubtasks,
    mainTasks: orphanSubtasks?.length > 0 ? [unlinkedTask, ...mainTasks] : mainTasks,
    subTasks,
  };
};
