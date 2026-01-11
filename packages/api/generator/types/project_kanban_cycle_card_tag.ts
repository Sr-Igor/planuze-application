import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { company, companyCreateInput } from "./company";

export interface project_kanban_cycle_card_tag {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  project_kanban_cycle_card_id: string;
  title: string;
  company_id: string;
  project_kanban_cycle_card?: project_kanban_cycle_card;
  company?: company;
}

export interface project_kanban_cycle_card_tagCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  project_kanban_cycle_card_id?: string;
  title: string;
  company_id?: string;
  project_kanban_cycle_card?: project_kanban_cycle_cardCreateInput;
  company?: companyCreateInput;
}

export type project_kanban_cycle_card_tagUpdateInput = Partial<project_kanban_cycle_card_tagCreateInput>;

