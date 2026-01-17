import { company, companyCreateInput } from "./company";
import { project_financial, project_financialCreateInput } from "./project_financial";
import { project_kanban_cycle, project_kanban_cycleCreateInput } from "./project_kanban_cycle";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { role, roleCreateInput } from "./role";
import { log__work_type, log__work_typeCreateInput } from "./log__work_type";

export interface work_type {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  active: boolean;
  company_id: string;
  company?: company;
  project_financials?: project_financial[];
  project_kanban_cycles?: project_kanban_cycle[];
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  roles?: role[];
  logs?: log__work_type[];
}

export interface work_typeCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  active?: boolean;
  company_id?: string;
  company?: companyCreateInput;
  project_financials?: project_financialCreateInput[];
  project_kanban_cycles?: project_kanban_cycleCreateInput[];
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  roles?: roleCreateInput[];
  logs?: log__work_typeCreateInput[];
}

export type work_typeUpdateInput = Partial<work_typeCreateInput>;

