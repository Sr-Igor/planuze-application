import { company, companyCreateInput } from "./company";
import { log__kanban_template_tag, log__kanban_template_tagCreateInput } from "./log__kanban_template_tag";

export interface kanban_template_tag {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  company_id: string;
  company?: company;
  logs?: log__kanban_template_tag[];
}

export interface kanban_template_tagCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  company_id?: string;
  company?: companyCreateInput;
  logs?: log__kanban_template_tagCreateInput[];
}

export type kanban_template_tagUpdateInput = Partial<kanban_template_tagCreateInput>;

