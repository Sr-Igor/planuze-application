"use client";

import { ChevronDown, ChevronRight } from "lucide-react";

import { useUserAccess } from "@repo/redux/hooks";
import { Badge, Button, cn } from "@repo/ui";

import { KanbanCard } from "../card";
import { TaskRowColumn } from "../task-column";
import { ITaskRowProps } from "./types";
import { useComponent } from "./use";

export const TaskRow = ({
  mainTask,
  columns,
  insertPosition,
  isDragActive,
  isCollapsed,
  onToggleCollapse,
  index,
  activeCard,
  loading,
}: ITaskRowProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_kanban_cycle_card");

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    style,
    subTasksByColumn,
    allSubTasks,
    completedSubtasks,
    progressPercentage,
    isMainTaskVisible,
  } = useComponent({
    mainTask,
    columns,
    index,
  });

  if (!isMainTaskVisible) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("border-border flex min-w-fit border-b", isDragging && "opacity-50")}
    >
      {/* Task Principal - Coluna Fixa */}
      <div className="bg-sidebar border-border mb-6 flex w-80 flex-shrink-0 items-start justify-start gap-2 border-r-3 p-1.5">
        <Button
          variant="secondary"
          size="sm"
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse?.();
          }}
        >
          {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>

        {isCollapsed && (
          <button
            onClick={onToggleCollapse}
            className="flex-1 truncate text-start text-sm font-medium"
          >
            {mainTask.title}
          </button>
        )}

        {!isCollapsed && (
          <div
            {...(mainTask?.isUnlinked || !perm.many ? {} : attributes)}
            {...(mainTask?.isUnlinked || !perm.many ? {} : listeners)}
            className={cn(
              "w-full",
              mainTask?.isUnlinked || !perm.many ? "cursor-default" : "cursor-grab"
            )}
          >
            <KanbanCard
              invisible={!isMainTaskVisible}
              card={mainTask}
              column={columns[0]}
              loading={loading}
              allSubTasks={allSubTasks}
              completedSubtasks={completedSubtasks}
              progressPercentage={progressPercentage}
            />
          </div>
        )}
      </div>

      {/* SubCards por Coluna - Alinhados Horizontalmente */}
      <div className="flex">
        {!isCollapsed &&
          columns.map((column) => (
            <TaskRowColumn
              key={column.id}
              column={column}
              subTasks={subTasksByColumn[column.id]}
              insertPosition={insertPosition?.mainTaskId === mainTask.id ? insertPosition : null}
              isDragActive={isDragActive}
              mainTaskId={mainTask.id}
              activeCard={activeCard}
              loading={loading}
            />
          ))}

        {isCollapsed &&
          columns.map((column) => (
            <button
              key={column.id}
              className="bg-sidebar border-border/50 mb-6 w-80 flex-shrink-0 border-r p-1"
              onClick={onToggleCollapse}
              disabled={loading}
            >
              <div className="text-muted-foreground flex h-full items-center justify-center text-xs">
                {!loading && subTasksByColumn[column.id].length > 0 && (
                  <Badge variant="outline" className="text-xs font-semibold">
                    {subTasksByColumn[column.id].length}
                  </Badge>
                )}
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};
