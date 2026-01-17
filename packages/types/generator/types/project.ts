import { client, clientCreateInput } from "./client";
import { company, companyCreateInput } from "./company";
import { project_allocation, project_allocationCreateInput } from "./project_allocation";
import { project_config, project_configCreateInput } from "./project_config";
import { project_financial, project_financialCreateInput } from "./project_financial";
import { project_financial_employees, project_financial_employeesCreateInput } from "./project_financial_employees";
import { project_kanban, project_kanbanCreateInput } from "./project_kanban";
import { project_kanban_cycle, project_kanban_cycleCreateInput } from "./project_kanban_cycle";
import { project_kanban_cycle_allocation, project_kanban_cycle_allocationCreateInput } from "./project_kanban_cycle_allocation";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { project_kanban_cycle_card_comment, project_kanban_cycle_card_commentCreateInput } from "./project_kanban_cycle_card_comment";
import { project_kanban_cycle_card_file, project_kanban_cycle_card_fileCreateInput } from "./project_kanban_cycle_card_file";
import { project_kanban_cycle_card_read, project_kanban_cycle_card_readCreateInput } from "./project_kanban_cycle_card_read";
import { project_kanban_cycle_card_type, project_kanban_cycle_card_typeCreateInput } from "./project_kanban_cycle_card_type";
import { project_kanban_cycle_column, project_kanban_cycle_columnCreateInput } from "./project_kanban_cycle_column";
import { project_kanban_objective, project_kanban_objectiveCreateInput } from "./project_kanban_objective";
import { project_kanban_objective_target, project_kanban_objective_targetCreateInput } from "./project_kanban_objective_target";
import { project_member, project_memberCreateInput } from "./project_member";
import { project_tool, project_toolCreateInput } from "./project_tool";
import { project_version, project_versionCreateInput } from "./project_version";
import { log__project, log__projectCreateInput } from "./log__project";

export interface project {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  name: string;
  client_id: string | null;
  company_id: string;
  client?: client;
  company?: company;
  project_allocations?: project_allocation[];
  project_configs?: project_config[];
  project_financials?: project_financial[];
  project_financial_employees?: project_financial_employees[];
  project_kanbans?: project_kanban[];
  project_kanban_cycles?: project_kanban_cycle[];
  project_kanban_cycle_allocations?: project_kanban_cycle_allocation[];
  project_kanban_cycle_cards?: project_kanban_cycle_card[];
  project_kanban_cycle_card_comments?: project_kanban_cycle_card_comment[];
  project_kanban_cycle_card_files?: project_kanban_cycle_card_file[];
  project_kanban_cycle_card_reads?: project_kanban_cycle_card_read[];
  project_kanban_cycle_card_types?: project_kanban_cycle_card_type[];
  project_kanban_cycle_columns?: project_kanban_cycle_column[];
  project_kanban_objectives?: project_kanban_objective[];
  project_kanban_objective_targets?: project_kanban_objective_target[];
  project_members?: project_member[];
  project_tools?: project_tool[];
  project_versions?: project_version[];
  logs?: log__project[];
}

export interface projectCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  name: string;
  client_id?: string | null;
  company_id?: string;
  client?: clientCreateInput;
  company?: companyCreateInput;
  project_allocations?: project_allocationCreateInput[];
  project_configs?: project_configCreateInput[];
  project_financials?: project_financialCreateInput[];
  project_financial_employees?: project_financial_employeesCreateInput[];
  project_kanbans?: project_kanbanCreateInput[];
  project_kanban_cycles?: project_kanban_cycleCreateInput[];
  project_kanban_cycle_allocations?: project_kanban_cycle_allocationCreateInput[];
  project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
  project_kanban_cycle_card_comments?: project_kanban_cycle_card_commentCreateInput[];
  project_kanban_cycle_card_files?: project_kanban_cycle_card_fileCreateInput[];
  project_kanban_cycle_card_reads?: project_kanban_cycle_card_readCreateInput[];
  project_kanban_cycle_card_types?: project_kanban_cycle_card_typeCreateInput[];
  project_kanban_cycle_columns?: project_kanban_cycle_columnCreateInput[];
  project_kanban_objectives?: project_kanban_objectiveCreateInput[];
  project_kanban_objective_targets?: project_kanban_objective_targetCreateInput[];
  project_members?: project_memberCreateInput[];
  project_tools?: project_toolCreateInput[];
  project_versions?: project_versionCreateInput[];
  logs?: log__projectCreateInput[];
}

export type projectUpdateInput = Partial<projectCreateInput>;

