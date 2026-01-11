import { company, companyCreateInput } from "./company";
import { project, projectCreateInput } from "./project";
import { profile, profileCreateInput } from "./profile";
import { project_version, project_versionCreateInput } from "./project_version";
import { log__project_allocation, log__project_allocationCreateInput } from "./log__project_allocation";

export interface project_allocation {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  project_id: string;
  start_date: string | null;
  end_date: string | null;
  profile_id: string;
  project_version_id: string;
  company?: company;
  project?: project;
  profile?: profile;
  project_version?: project_version;
  logs?: log__project_allocation[];
}

export interface project_allocationCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  project_id?: string;
  start_date?: string | null;
  end_date?: string | null;
  profile_id?: string;
  project_version_id?: string;
  company?: companyCreateInput;
  project?: projectCreateInput;
  profile?: profileCreateInput;
  project_version?: project_versionCreateInput;
  logs?: log__project_allocationCreateInput[];
}

export type project_allocationUpdateInput = Partial<project_allocationCreateInput>;

