import { company, companyCreateInput } from "./company";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { project, projectCreateInput } from "./project";
import { log__project_kanban_cycle_card_file, log__project_kanban_cycle_card_fileCreateInput } from "./log__project_kanban_cycle_card_file";

export interface project_kanban_cycle_card_file {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  file: string;
  vector: boolean | null;
  vector_error: string | null;
  name: string | null;
  project_kanban_cycle_card_id: string;
  project_id: string;
  company?: company;
  project_kanban_cycle_card?: project_kanban_cycle_card;
  project?: project;
  logs?: log__project_kanban_cycle_card_file[];
}

export interface project_kanban_cycle_card_fileCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  file: string;
  vector?: boolean | null;
  vector_error?: string | null;
  name?: string | null;
  project_kanban_cycle_card_id?: string;
  project_id?: string;
  company?: companyCreateInput;
  project_kanban_cycle_card?: project_kanban_cycle_cardCreateInput;
  project?: projectCreateInput;
  logs?: log__project_kanban_cycle_card_fileCreateInput[];
}

export type project_kanban_cycle_card_fileUpdateInput = Partial<project_kanban_cycle_card_fileCreateInput>;

