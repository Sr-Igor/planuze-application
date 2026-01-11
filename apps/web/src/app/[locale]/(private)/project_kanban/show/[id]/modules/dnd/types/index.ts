import {
  project_kanban_cycle,
  project_kanban_cycle_card,
  project_kanban_cycle_card_type,
  project_kanban_cycle_column,
} from "@repo/api/generator/types";

import { Mode } from "../../../types";
import { Position } from "../hooks/useDnd/types";

export type VisibleCards = Partial<
  Record<
    keyof project_kanban_cycle_card | "tag",
    string[] | { start?: string; end?: string } | { min?: string; max?: string }
  >
>;

// Interface estendida para incluir propriedades específicas do kanban
export interface ExtendedProjectKanbanCycleCard extends project_kanban_cycle_card {
  isUnlinked?: boolean;
}

export interface KanbanBoardProps {
  cycle?: project_kanban_cycle | null;
  cardTypes: project_kanban_cycle_card_type[];
  loading: boolean;
}

export interface OnOpenCardFormProps {
  columnId?: string;
  anchor?: project_kanban_cycle_card;
  card?: project_kanban_cycle_card;
  initialData?: Partial<project_kanban_cycle_card>;
  forcedMode?: Mode;
  close?: boolean;
}

export interface SortableKanbanColumnProps {
  column: project_kanban_cycle_column;
  insertPosition?: Position | null;
  isDragActive?: boolean;
  loading: boolean;
  visibleCards: VisibleCards;
}

export interface KanbanColumnProps extends SortableKanbanColumnProps {
  className?: string;
  dragListeners?: any;
}

export interface SortableKanbanCardProps
  extends Pick<SortableKanbanColumnProps, "column" | "loading"> {
  card: project_kanban_cycle_card;
  visibleCards: VisibleCards;
}

export interface KanbanCardProps extends Pick<SortableKanbanCardProps, "column" | "loading"> {
  card: project_kanban_cycle_card;
  isDragging?: boolean;
  className?: string;
  allSubTasks?: project_kanban_cycle_card[];
  completedSubtasks?: number;
  progressPercentage?: number;
  visibleCards?: VisibleCards;
  invisible?: boolean;
  isPlaceholder?: boolean;
}
