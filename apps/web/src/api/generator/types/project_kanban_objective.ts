import { company, companyCreateInput } from "./company";
import { project_kanban, project_kanbanCreateInput } from "./project_kanban";
import { project, projectCreateInput } from "./project";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { project_kanban_objective_target, project_kanban_objective_targetCreateInput } from "./project_kanban_objective_target";
import { log__project_kanban_objective, log__project_kanban_objectiveCreateInput } from "./log__project_kanban_objective";

export interface project_kanban_objective {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  description: string | null;
  concluded: boolean;
  company_id: string;
  project_id: string;
  project_kanban_id: string;
  public_id: number;
  company?: company;
  project_kanban?: project_kanban;
  project?: project;
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  project_kanban_objective_targets?: project_kanban_objective_target[];
  logs?: log__project_kanban_objective[];
}

export interface project_kanban_objectiveCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  description?: string | null;
  concluded?: boolean;
  company_id?: string;
  project_id?: string;
  project_kanban_id?: string;
  public_id?: number;
  company?: companyCreateInput;
  project_kanban?: project_kanbanCreateInput;
  project?: projectCreateInput;
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  project_kanban_objective_targets?: project_kanban_objective_targetCreateInput[];
  logs?: log__project_kanban_objectiveCreateInput[];
}

export type project_kanban_objectiveUpdateInput = Partial<project_kanban_objectiveCreateInput>;

