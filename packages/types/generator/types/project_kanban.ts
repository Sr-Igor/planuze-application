import { company, companyCreateInput } from "./company";
import { project, projectCreateInput } from "./project";
import { profile, profileCreateInput } from "./profile";
import { project_kanban_cycle, project_kanban_cycleCreateInput } from "./project_kanban_cycle";
import { project_kanban_cycle_allocation, project_kanban_cycle_allocationCreateInput } from "./project_kanban_cycle_allocation";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { project_kanban_cycle_card_comment, project_kanban_cycle_card_commentCreateInput } from "./project_kanban_cycle_card_comment";
import { project_kanban_cycle_card_type, project_kanban_cycle_card_typeCreateInput } from "./project_kanban_cycle_card_type";
import { project_kanban_cycle_column, project_kanban_cycle_columnCreateInput } from "./project_kanban_cycle_column";
import { project_kanban_objective, project_kanban_objectiveCreateInput } from "./project_kanban_objective";
import { project_kanban_objective_target, project_kanban_objective_targetCreateInput } from "./project_kanban_objective_target";
import { log__project_kanban, log__project_kanbanCreateInput } from "./log__project_kanban";

export interface project_kanban {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  project_id: string;
  profile_id: string;
  company_id: string;
  company?: company;
  project?: project;
  profile?: profile;
  project_kanban_cycles?: project_kanban_cycle[];
  project_kanban_cycle_allocations?: project_kanban_cycle_allocation[];
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  project_kanban_cycle_card_comments?: project_kanban_cycle_card_comment[];
  project_kanban_cycle_card_types?: project_kanban_cycle_card_type[];
  project_kanban_cycle_columns?: project_kanban_cycle_column[];
  project_kanban_objectives?: project_kanban_objective[];
  project_kanban_objective_targets?: project_kanban_objective_target[];
  logs?: log__project_kanban[];
}

export interface project_kanbanCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  project_id?: string;
  profile_id?: string;
  company_id?: string;
  company?: companyCreateInput;
  project?: projectCreateInput;
  profile?: profileCreateInput;
  project_kanban_cycles?: project_kanban_cycleCreateInput[];
  project_kanban_cycle_allocations?: project_kanban_cycle_allocationCreateInput[];
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  project_kanban_cycle_card_comments?: project_kanban_cycle_card_commentCreateInput[];
  project_kanban_cycle_card_types?: project_kanban_cycle_card_typeCreateInput[];
  project_kanban_cycle_columns?: project_kanban_cycle_columnCreateInput[];
  project_kanban_objectives?: project_kanban_objectiveCreateInput[];
  project_kanban_objective_targets?: project_kanban_objective_targetCreateInput[];
  logs?: log__project_kanbanCreateInput[];
}

export type project_kanbanUpdateInput = Partial<project_kanbanCreateInput>;

