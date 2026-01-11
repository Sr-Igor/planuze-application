import { company, companyCreateInput } from "./company";
import { profile, profileCreateInput } from "./profile";
import { kanban_template_card, kanban_template_cardCreateInput } from "./kanban_template_card";
import { kanban_template_column, kanban_template_columnCreateInput } from "./kanban_template_column";
import { project_kanban_cycle, project_kanban_cycleCreateInput } from "./project_kanban_cycle";
import { log__kanban_template, log__kanban_templateCreateInput } from "./log__kanban_template";

export interface kanban_template {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  active: boolean;
  profile_id: string | null;
  company_id: string | null;
  company?: company;
  profile?: profile;
  kanban_template_cards?: kanban_template_card[];
  kanban_template_columns?: kanban_template_column[];
  project_kanban_cycles?: project_kanban_cycle[];
  logs?: log__kanban_template[];
}

export interface kanban_templateCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  active?: boolean;
  profile_id?: string | null;
  company_id?: string | null;
  company?: companyCreateInput;
  profile?: profileCreateInput;
  kanban_template_cards?: kanban_template_cardCreateInput[];
  kanban_template_columns?: kanban_template_columnCreateInput[];
  project_kanban_cycles?: project_kanban_cycleCreateInput[];
  logs?: log__kanban_templateCreateInput[];
}

export type kanban_templateUpdateInput = Partial<kanban_templateCreateInput>;

