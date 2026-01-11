import { company, companyCreateInput } from "./company";
import { kanban_template, kanban_templateCreateInput } from "./kanban_template";
import { project_kanban, project_kanbanCreateInput } from "./project_kanban";
import { project, projectCreateInput } from "./project";
import { work_type, work_typeCreateInput } from "./work_type";
import { project_version, project_versionCreateInput } from "./project_version";
import { project_kanban_cycle_allocation, project_kanban_cycle_allocationCreateInput } from "./project_kanban_cycle_allocation";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { project_kanban_cycle_card_type, project_kanban_cycle_card_typeCreateInput } from "./project_kanban_cycle_card_type";
import { project_kanban_cycle_column, project_kanban_cycle_columnCreateInput } from "./project_kanban_cycle_column";
import { log__project_kanban_cycle, log__project_kanban_cycleCreateInput } from "./log__project_kanban_cycle";

export interface project_kanban_cycle {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  order: number;
  kanban_template_id: string | null;
  project_kanban_id: string;
  company_id: string;
  start_date: string | null;
  end_date: string | null;
  project_id: string;
  prepare: boolean;
  work_type_id: string | null;
  util_day: number | null;
  project_version_id: string;
  company?: company;
  kanban_template?: kanban_template;
  project_kanban?: project_kanban;
  project?: project;
  work_type?: work_type;
  project_version?: project_version;
  project_kanban_cycle_allocations?: project_kanban_cycle_allocation[];
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  project_kanban_cycle_card_types?: project_kanban_cycle_card_type[];
  project_kanban_cycle_columns?: project_kanban_cycle_column[];
  logs?: log__project_kanban_cycle[];
}

export interface project_kanban_cycleCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  order: number;
  kanban_template_id?: string | null;
  project_kanban_id?: string;
  company_id?: string;
  start_date?: string | null;
  end_date?: string | null;
  project_id?: string;
  prepare?: boolean;
  work_type_id?: string | null;
  util_day?: number | null;
  project_version_id?: string;
  company?: companyCreateInput;
  kanban_template?: kanban_templateCreateInput;
  project_kanban?: project_kanbanCreateInput;
  project?: projectCreateInput;
  work_type?: work_typeCreateInput;
  project_version?: project_versionCreateInput;
  project_kanban_cycle_allocations?: project_kanban_cycle_allocationCreateInput[];
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  project_kanban_cycle_card_types?: project_kanban_cycle_card_typeCreateInput[];
  project_kanban_cycle_columns?: project_kanban_cycle_columnCreateInput[];
  logs?: log__project_kanban_cycleCreateInput[];
}

export type project_kanban_cycleUpdateInput = Partial<project_kanban_cycleCreateInput>;

