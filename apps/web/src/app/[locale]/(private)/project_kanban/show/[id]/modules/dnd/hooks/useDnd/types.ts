import {
  project_kanban_cycle,
  project_kanban_cycle_card,
  project_kanban_cycle_column,
} from "@repo/api/generator/types";

import { BoardUpdateProps } from "@/app/[locale]/(private)/project_kanban/show/[id]/types";

export interface IUseDndProps {
  cycle?: project_kanban_cycle | null;
  onBoardUpdate?: (props: BoardUpdateProps) => void;
}

export interface Position {
  columnId: string;
  mainTaskId?: string;
  index: number;
  card?: project_kanban_cycle_card;
}

export interface ActiveItem {
  type: "card" | "column" | "main-task";
  item: project_kanban_cycle_card | project_kanban_cycle_column;
}
