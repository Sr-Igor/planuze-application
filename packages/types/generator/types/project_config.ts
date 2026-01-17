import { company, companyCreateInput } from "./company";
import { project, projectCreateInput } from "./project";
import { project_version, project_versionCreateInput } from "./project_version";
import { log__project_config, log__project_configCreateInput } from "./log__project_config";

export interface project_config {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  util_hour_day: number;
  total_hour_day: number;
  project_id: string;
  project_version_id: string;
  company_id: string;
  company?: company;
  project?: project;
  project_version?: project_version;
  logs?: log__project_config[];
}

export interface project_configCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  util_hour_day?: number;
  total_hour_day?: number;
  project_id?: string;
  project_version_id?: string;
  company_id?: string;
  company?: companyCreateInput;
  project?: projectCreateInput;
  project_version?: project_versionCreateInput;
  logs?: log__project_configCreateInput[];
}

export type project_configUpdateInput = Partial<project_configCreateInput>;

