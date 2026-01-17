import { company, companyCreateInput } from "./company";
import { project, projectCreateInput } from "./project";
import { project_version, project_versionCreateInput } from "./project_version";
import { log__project_tool, log__project_toolCreateInput } from "./log__project_tool";

export interface project_tool {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  project_id: string;
  project_version_id: string;
  title: string;
  description: string | null;
  currency: string;
  value: number;
  recurrence: string;
  start_date: string | null;
  end_date: string | null;
  company_id: string;
  consumption: string;
  type: string;
  company?: company;
  project?: project;
  project_version?: project_version;
  logs?: log__project_tool[];
}

export interface project_toolCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  project_id?: string;
  project_version_id?: string;
  title: string;
  description?: string | null;
  currency: string;
  value: number;
  recurrence?: string;
  start_date?: string | null;
  end_date?: string | null;
  company_id?: string;
  consumption?: string;
  type?: string;
  company?: companyCreateInput;
  project?: projectCreateInput;
  project_version?: project_versionCreateInput;
  logs?: log__project_toolCreateInput[];
}

export type project_toolUpdateInput = Partial<project_toolCreateInput>;

