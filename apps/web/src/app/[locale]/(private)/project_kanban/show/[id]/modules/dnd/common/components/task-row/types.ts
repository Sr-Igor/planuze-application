import { project_kanban_cycle_card, project_kanban_cycle_column } from "@repo/api/generator/types";

import { Position } from "../../../hooks/useDnd/types";
import { ExtendedProjectKanbanCycleCard } from "../../../types";

export interface ITaskRowProps {
  mainTask: ExtendedProjectKanbanCycleCard;
  columns: project_kanban_cycle_column[];
  insertPosition?: Position | null;
  isDragActive?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  index?: number;
  activeCard?: project_kanban_cycle_card | null;
  loading: boolean;
}
