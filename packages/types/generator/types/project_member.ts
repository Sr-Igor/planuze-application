import { project, projectCreateInput } from "./project";
import { profile, profileCreateInput } from "./profile";
import { company, companyCreateInput } from "./company";
import { project_kanban_cycle_allocation, project_kanban_cycle_allocationCreateInput } from "./project_kanban_cycle_allocation";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { log__project_member, log__project_memberCreateInput } from "./log__project_member";

export interface project_member {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  project_id: string;
  profile_id: string;
  company_id: string;
  project?: project;
  profile?: profile;
  company?: company;
  project_kanban_cycle_allocations?: project_kanban_cycle_allocation[];
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  logs?: log__project_member[];
}

export interface project_memberCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  project_id?: string;
  profile_id?: string;
  company_id?: string;
  project?: projectCreateInput;
  profile?: profileCreateInput;
  company?: companyCreateInput;
  project_kanban_cycle_allocations?: project_kanban_cycle_allocationCreateInput[];
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  logs?: log__project_memberCreateInput[];
}

export type project_memberUpdateInput = Partial<project_memberCreateInput>;

