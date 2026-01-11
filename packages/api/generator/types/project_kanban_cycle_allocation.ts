import { project, projectCreateInput } from "./project";
import { project_kanban_cycle, project_kanban_cycleCreateInput } from "./project_kanban_cycle";
import { project_kanban, project_kanbanCreateInput } from "./project_kanban";
import { project_member, project_memberCreateInput } from "./project_member";
import { profile, profileCreateInput } from "./profile";
import { company, companyCreateInput } from "./company";
import { log__project_kanban_cycle_allocation, log__project_kanban_cycle_allocationCreateInput } from "./log__project_kanban_cycle_allocation";

export interface project_kanban_cycle_allocation {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  project_kanban_cycle_id: string;
  project_kanban_id: string;
  project_id: string;
  project_member_id: string | null;
  profile_id: string;
  time: number | null;
  unit: string;
  company_id: string;
  project?: project;
  project_kanban_cycle?: project_kanban_cycle;
  project_kanban?: project_kanban;
  project_member?: project_member;
  profile?: profile;
  company?: company;
  logs?: log__project_kanban_cycle_allocation[];
}

export interface project_kanban_cycle_allocationCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  project_kanban_cycle_id?: string;
  project_kanban_id?: string;
  project_id?: string;
  project_member_id?: string | null;
  profile_id?: string;
  time?: number | null;
  unit: string;
  company_id?: string;
  project?: projectCreateInput;
  project_kanban_cycle?: project_kanban_cycleCreateInput;
  project_kanban?: project_kanbanCreateInput;
  project_member?: project_memberCreateInput;
  profile?: profileCreateInput;
  company?: companyCreateInput;
  logs?: log__project_kanban_cycle_allocationCreateInput[];
}

export type project_kanban_cycle_allocationUpdateInput = Partial<project_kanban_cycle_allocationCreateInput>;

