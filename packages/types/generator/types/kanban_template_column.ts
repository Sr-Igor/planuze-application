import { company, companyCreateInput } from "./company";
import { kanban_template, kanban_templateCreateInput } from "./kanban_template";
import { log__kanban_template_column, log__kanban_template_columnCreateInput } from "./log__kanban_template_column";

export interface kanban_template_column {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  order: number;
  kanban_template_id: string;
  company_id: string;
  color: string | null;
  limit: number | null;
  finished: boolean;
  description: string | null;
  company?: company;
  kanban_template?: kanban_template;
  logs?: log__kanban_template_column[];
}

export interface kanban_template_columnCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  order: number;
  kanban_template_id?: string;
  company_id?: string;
  color?: string | null;
  limit?: number | null;
  finished?: boolean;
  description?: string | null;
  company?: companyCreateInput;
  kanban_template?: kanban_templateCreateInput;
  logs?: log__kanban_template_columnCreateInput[];
}

export type kanban_template_columnUpdateInput = Partial<kanban_template_columnCreateInput>;

