import { company, companyCreateInput } from "./company";
import { project_kanban_cycle, project_kanban_cycleCreateInput } from "./project_kanban_cycle";
import { project_kanban, project_kanbanCreateInput } from "./project_kanban";
import { project, projectCreateInput } from "./project";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { log__project_kanban_cycle_column, log__project_kanban_cycle_columnCreateInput } from "./log__project_kanban_cycle_column";

export interface project_kanban_cycle_column {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  order: number;
  project_kanban_cycle_id: string;
  company_id: string;
  color: string | null;
  limit: number | null;
  finished: boolean;
  project_kanban_id: string;
  project_id: string;
  description: string | null;
  company?: company;
  project_kanban_cycle?: project_kanban_cycle;
  project_kanban?: project_kanban;
  project?: project;
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  logs?: log__project_kanban_cycle_column[];
}

export interface project_kanban_cycle_columnCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  order: number;
  project_kanban_cycle_id?: string;
  company_id?: string;
  color?: string | null;
  limit?: number | null;
  finished?: boolean;
  project_kanban_id?: string;
  project_id?: string;
  description?: string | null;
  company?: companyCreateInput;
  project_kanban_cycle?: project_kanban_cycleCreateInput;
  project_kanban?: project_kanbanCreateInput;
  project?: projectCreateInput;
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  logs?: log__project_kanban_cycle_columnCreateInput[];
}

export type project_kanban_cycle_columnUpdateInput = Partial<project_kanban_cycle_columnCreateInput>;

