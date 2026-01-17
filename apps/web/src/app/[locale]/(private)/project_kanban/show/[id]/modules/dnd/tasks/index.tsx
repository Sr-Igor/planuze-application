"use client";

import { memo, useCallback, useMemo, useState } from "react";

import { DndContext, pointerWithin, rectIntersection } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { project_kanban_cycle_card } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { useKanbanShow } from "../../../context";
import { fakeColumn } from "../../../utils/fake-column";
import { HeaderColumn } from "../common/components/header-column";
import { OptimizedDragOverlay } from "../common/components/optimized-drag-overlay";
import { TaskRow } from "../common/components/task-row";
import { useOptimizedDrag } from "../hooks/use-optimized-drag";
import { ExtendedProjectKanbanCycleCard } from "../types";
import { useTasks } from "./hooks/use-tasks";

const TasksBoardComponent = () => {
  const lang = useLang();
  const t = lang.page.kanban;

  const { loadings, updateBoard, data, page, params } = useKanbanShow();

  const { mainTasks } = useTasks();
  const [collapsedTasks, setCollapsedTasks] = useState<Set<string>>(
    new Set(
      mainTasks
        .filter((task: ExtendedProjectKanbanCycleCard) => task.isUnlinked)
        .map((task) => task.id)
    )
  );

  const inLoading = !!loadings.cardType.index || !!loadings.cycle.index;

  const {
    sensors,
    activeItem,
    insertPosition,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    columns,
    handleTasksDragEnd,
    handleTasksDragOver,
  } = useOptimizedDrag({
    cycle: page.cycle,
    onBoardUpdate: updateBoard,
    view: params.view,
  });

  const toggleTaskCollapse = useCallback((taskId: string) => {
    setCollapsedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  }, []);

  const combinedDragEnd = useCallback(
    (event: any) => {
      const isMainTask = event.active?.data?.current?.type === "main-task";
      isMainTask ? handleDragEnd(event) : handleTasksDragEnd(event);
    },
    [handleTasksDragEnd, handleDragEnd]
  );

  const combinedDragOver = useCallback(
    (event: any) => {
      const isMainTask = event.active?.data?.current?.type === "main-task";
      isMainTask ? handleDragOver(event) : handleTasksDragOver(event);
    },
    [handleTasksDragOver, handleDragOver]
  );

  const customCollisionDetection = useMemo(
    () => (args: any) => {
      const pointerCollisions = pointerWithin(args);
      if (pointerCollisions.length > 0) {
        return pointerCollisions;
      }

      return rectIntersection(args);
    },
    []
  );

  return (
    <div className="h-full p-6">
      <div className="relative flex h-full flex-col overflow-x-scroll">
        <div className="border-border bg-background sticky top-0 z-10 flex min-w-max border-b">
          {/* Coluna de Tasks Principais */}
          <HeaderColumn
            column={{
              ...fakeColumn,
              title: t("principal_tasks"),
              project_kanban_cycle_cards: mainTasks,
            }}
            visibleCards={data.visibleCards}
            loading={inLoading}
            view={"principal"}
          />

          {columns?.map((column) => (
            <HeaderColumn
              key={column.id}
              column={column}
              visibleCards={data.visibleCards}
              loading={inLoading}
              view={"tasks"}
            />
          ))}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={customCollisionDetection}
          onDragStart={handleDragStart}
          onDragOver={combinedDragOver}
          onDragEnd={combinedDragEnd}
          autoScroll={true}
        >
          <SortableContext
            items={mainTasks
              .filter((task: ExtendedProjectKanbanCycleCard) => !task.isUnlinked)
              .map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {mainTasks.map((mainTask, index) => (
              <TaskRow
                key={mainTask.id}
                mainTask={mainTask}
                columns={columns || []}
                insertPosition={insertPosition}
                isDragActive={!!activeItem}
                activeCard={activeItem?.item as project_kanban_cycle_card}
                isCollapsed={collapsedTasks.has(mainTask.id)}
                onToggleCollapse={() => toggleTaskCollapse(mainTask.id)}
                index={index}
                loading={inLoading}
              />
            ))}
          </SortableContext>

          {mainTasks.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-muted-foreground">
                <p className="mb-2 text-lg font-medium">{t("no_principal_tasks_found")}</p>
                <p className="text-sm">{t("create_principal_task_to_see_here")}</p>
              </div>
            </div>
          )}

          <OptimizedDragOverlay
            activeItem={activeItem}
            columns={columns}
            visibleCards={data.visibleCards}
            loading={inLoading}
          />
        </DndContext>
      </div>
    </div>
  );
};

export const TasksBoard = memo(TasksBoardComponent);
