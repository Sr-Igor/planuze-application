import { company, companyCreateInput } from "./company";
import { profile, profileCreateInput } from "./profile";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { project, projectCreateInput } from "./project";

export interface project_kanban_cycle_card_read {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  project_kanban_cycle_card_id: string;
  company_id: string;
  profile_id: string;
  action: string;
  project_id: string;
  company?: company;
  profile?: profile;
  project_kanban_cycle_card?: project_kanban_cycle_card;
  project?: project;
}

export interface project_kanban_cycle_card_readCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  project_kanban_cycle_card_id?: string;
  company_id?: string;
  profile_id?: string;
  action: string;
  project_id?: string;
  company?: companyCreateInput;
  profile?: profileCreateInput;
  project_kanban_cycle_card?: project_kanban_cycle_cardCreateInput;
  project?: projectCreateInput;
}

export type project_kanban_cycle_card_readUpdateInput = Partial<project_kanban_cycle_card_readCreateInput>;

