import { company, companyCreateInput } from "./company";
import { project_kanban_objective, project_kanban_objectiveCreateInput } from "./project_kanban_objective";
import { project, projectCreateInput } from "./project";
import { project_kanban, project_kanbanCreateInput } from "./project_kanban";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { log__project_kanban_objective_target, log__project_kanban_objective_targetCreateInput } from "./log__project_kanban_objective_target";

export interface project_kanban_objective_target {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  description: string | null;
  concluded: boolean;
  project_kanban_objective_id: string;
  company_id: string;
  project_id: string;
  project_kanban_id: string;
  public_id: number;
  company?: company;
  project_kanban_objective?: project_kanban_objective;
  project?: project;
  project_kanban?: project_kanban;
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  logs?: log__project_kanban_objective_target[];
}

export interface project_kanban_objective_targetCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  description?: string | null;
  concluded?: boolean;
  project_kanban_objective_id?: string;
  company_id?: string;
  project_id?: string;
  project_kanban_id?: string;
  public_id?: number;
  company?: companyCreateInput;
  project_kanban_objective?: project_kanban_objectiveCreateInput;
  project?: projectCreateInput;
  project_kanban?: project_kanbanCreateInput;
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  logs?: log__project_kanban_objective_targetCreateInput[];
}

export type project_kanban_objective_targetUpdateInput = Partial<project_kanban_objective_targetCreateInput>;

