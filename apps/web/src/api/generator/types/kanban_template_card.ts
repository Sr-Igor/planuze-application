import { company, companyCreateInput } from "./company";
import { kanban_template, kanban_templateCreateInput } from "./kanban_template";
import { kanban_template_card_type, kanban_template_card_typeCreateInput } from "./kanban_template_card_type";
import { log__kanban_template_card, log__kanban_template_cardCreateInput } from "./log__kanban_template_card";

export interface kanban_template_card {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  kanban_template_id: string;
  kanban_template_card_type_id: string;
  company?: company;
  kanban_template?: kanban_template;
  kanban_template_card_type?: kanban_template_card_type;
  logs?: log__kanban_template_card[];
}

export interface kanban_template_cardCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  kanban_template_id?: string;
  kanban_template_card_type_id?: string;
  company?: companyCreateInput;
  kanban_template?: kanban_templateCreateInput;
  kanban_template_card_type?: kanban_template_card_typeCreateInput;
  logs?: log__kanban_template_cardCreateInput[];
}

export type kanban_template_cardUpdateInput = Partial<kanban_template_cardCreateInput>;

