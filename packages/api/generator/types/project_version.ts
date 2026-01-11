import { project, projectCreateInput } from "./project";
import { company, companyCreateInput } from "./company";
import { profile, profileCreateInput } from "./profile";
import { project_allocation, project_allocationCreateInput } from "./project_allocation";
import { project_config, project_configCreateInput } from "./project_config";
import { project_financial, project_financialCreateInput } from "./project_financial";
import { project_kanban_cycle, project_kanban_cycleCreateInput } from "./project_kanban_cycle";
import { project_tool, project_toolCreateInput } from "./project_tool";
import { log__project_version, log__project_versionCreateInput } from "./log__project_version";

export interface project_version {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  name: string | null;
  original_start_date: string | null;
  original_end_date: string | null;
  real_start_date: string | null;
  real_end_date: string | null;
  version: number;
  project_id: string;
  company_id: string;
  owner_id: string;
  project?: project;
  company?: company;
  owner?: profile;
  project_allocations?: project_allocation[];
  project_configs?: project_config[];
  project_financials?: project_financial[];
  project_kanban_cycles?: project_kanban_cycle[];
  project_tools?: project_tool[];
  logs?: log__project_version[];
}

export interface project_versionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  name?: string | null;
  original_start_date?: string | null;
  original_end_date?: string | null;
  real_start_date?: string | null;
  real_end_date?: string | null;
  version?: number;
  project_id?: string;
  company_id?: string;
  owner_id?: string;
  project?: projectCreateInput;
  company?: companyCreateInput;
  owner?: profileCreateInput;
  project_allocations?: project_allocationCreateInput[];
  project_configs?: project_configCreateInput[];
  project_financials?: project_financialCreateInput[];
  project_kanban_cycles?: project_kanban_cycleCreateInput[];
  project_tools?: project_toolCreateInput[];
  logs?: log__project_versionCreateInput[];
}

export type project_versionUpdateInput = Partial<project_versionCreateInput>;

