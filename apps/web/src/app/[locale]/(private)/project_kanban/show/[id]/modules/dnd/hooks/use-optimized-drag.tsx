"use client";

import { useCallback, useMemo, useRef } from "react";

import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { throttle } from "lodash-es";

import { project_kanban_cycle } from "@repo/api/generator/types";

import { BoardUpdateProps } from "@/app/[locale]/(private)/project_kanban/show/[id]/types";

import { useDnd } from "./useDnd";

interface UseOptimizedDragProps {
  cycle?: project_kanban_cycle | null;
  onBoardUpdate?: (props: BoardUpdateProps) => void;
  view?: string;
}

export const useOptimizedDrag = ({ cycle, onBoardUpdate, view }: UseOptimizedDragProps) => {
  const dragOverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDragOverTimeRef = useRef<number>(0);

  const {
    sensors,
    activeItem,
    insertPosition,
    columns,
    handleTasksDragEnd,
    handleDragStart,
    handleTasksDragOver: originalHandleTasksDragOver,
    handleDragOver: originalHandleDragOver,
    handleDragEnd: originalHandleDragEnd,
  } = useDnd({
    cycle,
    onBoardUpdate,
  });

  const throttledDragOver = useMemo(
    () =>
      throttle((event: DragOverEvent) => {
        const isMainTask = event.active?.data?.current?.type === "main-task";
        const now = Date.now();
        const timeSinceLastDragOver = now - lastDragOverTimeRef.current;

        const handleDragOver =
          view === "tasks" && !isMainTask ? originalHandleTasksDragOver : originalHandleDragOver;

        if (timeSinceLastDragOver > 16) {
          handleDragOver(event);
          lastDragOverTimeRef.current = now;
        } else {
          if (dragOverTimeoutRef.current) {
            clearTimeout(dragOverTimeoutRef.current);
          }

          dragOverTimeoutRef.current = setTimeout(() => {
            handleDragOver(event);
            lastDragOverTimeRef.current = Date.now();
          }, 16 - timeSinceLastDragOver);
        }
      }, 16),
    [originalHandleDragOver, view]
  );

  const optimizedDragStart = useCallback(
    (event: DragStartEvent) => {
      handleDragStart(event);
    },
    [handleDragStart]
  );

  const optimizedDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (dragOverTimeoutRef.current) {
        clearTimeout(dragOverTimeoutRef.current);
        dragOverTimeoutRef.current = null;
      }

      originalHandleDragEnd(event);
    },
    [originalHandleDragEnd]
  );

  const optimizedDragOver = useCallback(
    (event: DragOverEvent) => {
      throttledDragOver(event);
    },
    [throttledDragOver]
  );

  const optimizedTasksDragOver = useCallback(
    (event: DragOverEvent) => {
      throttledDragOver(event);
    },
    [throttledDragOver]
  );

  const optimizedTasksDragEnd = useCallback(
    (event: DragEndEvent) => {
      if (dragOverTimeoutRef.current) {
        clearTimeout(dragOverTimeoutRef.current);
        dragOverTimeoutRef.current = null;
      }

      handleTasksDragEnd(event);
    },
    [handleTasksDragEnd]
  );

  return {
    sensors,
    activeItem,
    insertPosition,
    columns,
    handleDragStart: optimizedDragStart,
    handleDragOver: optimizedDragOver,
    handleDragEnd: optimizedDragEnd,
    handleTasksDragOver: optimizedTasksDragOver,
    handleTasksDragEnd: optimizedTasksDragEnd,
  };
};
