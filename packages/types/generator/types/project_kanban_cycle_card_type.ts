import { company, companyCreateInput } from "./company";
import { project_kanban_cycle, project_kanban_cycleCreateInput } from "./project_kanban_cycle";
import { project_kanban, project_kanbanCreateInput } from "./project_kanban";
import { project, projectCreateInput } from "./project";
import { kanban_template_card_type, kanban_template_card_typeCreateInput } from "./kanban_template_card_type";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { log__project_kanban_cycle_card_type, log__project_kanban_cycle_card_typeCreateInput } from "./log__project_kanban_cycle_card_type";

export interface project_kanban_cycle_card_type {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  icon: string;
  company_id: string;
  project_kanban_cycle_id: string | null;
  color: string | null;
  principal: boolean;
  project_kanban_id: string;
  project_id: string;
  kanban_template_card_type_id: string | null;
  problem: boolean;
  company?: company;
  project_kanban_cycle?: project_kanban_cycle;
  project_kanban?: project_kanban;
  project?: project;
  kanban_template_card_type?: kanban_template_card_type;
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  logs?: log__project_kanban_cycle_card_type[];
}

export interface project_kanban_cycle_card_typeCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  icon: string;
  company_id?: string;
  project_kanban_cycle_id?: string | null;
  color?: string | null;
  principal?: boolean;
  project_kanban_id?: string;
  project_id?: string;
  kanban_template_card_type_id?: string | null;
  problem?: boolean;
  company?: companyCreateInput;
  project_kanban_cycle?: project_kanban_cycleCreateInput;
  project_kanban?: project_kanbanCreateInput;
  project?: projectCreateInput;
  kanban_template_card_type?: kanban_template_card_typeCreateInput;
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  logs?: log__project_kanban_cycle_card_typeCreateInput[];
}

export type project_kanban_cycle_card_typeUpdateInput = Partial<project_kanban_cycle_card_typeCreateInput>;

