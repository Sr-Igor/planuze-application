import { company, companyCreateInput } from "./company";
import { kanban_template_card, kanban_template_cardCreateInput } from "./kanban_template_card";
import { project_kanban_cycle_card_type, project_kanban_cycle_card_typeCreateInput } from "./project_kanban_cycle_card_type";
import { log__kanban_template_card_type, log__kanban_template_card_typeCreateInput } from "./log__kanban_template_card_type";

export interface kanban_template_card_type {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  icon: string;
  color: string;
  principal: boolean;
  company_id: string;
  problem: boolean;
  company?: company;
  kanban_template_cards?: kanban_template_card[];
  project_kanban_cycle_card_types?: project_kanban_cycle_card_type[];
  logs?: log__kanban_template_card_type[];
}

export interface kanban_template_card_typeCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  icon: string;
  color: string;
  principal?: boolean;
  company_id?: string;
  problem?: boolean;
  company?: companyCreateInput;
  kanban_template_cards?: kanban_template_cardCreateInput[];
  project_kanban_cycle_card_types?: project_kanban_cycle_card_typeCreateInput[];
  logs?: log__kanban_template_card_typeCreateInput[];
}

export type kanban_template_card_typeUpdateInput = Partial<kanban_template_card_typeCreateInput>;

