import { company, companyCreateInput } from "./company";
import { work_type, work_typeCreateInput } from "./work_type";
import { project_version, project_versionCreateInput } from "./project_version";
import { project, projectCreateInput } from "./project";
import { project_financial_employees, project_financial_employeesCreateInput } from "./project_financial_employees";
import { log__project_financial, log__project_financialCreateInput } from "./log__project_financial";

export interface project_financial {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  work_type_id: string;
  cycles: number;
  total_value: number;
  discount: number;
  project_version_id: string;
  currency: string;
  project_id: string;
  title: string | null;
  company?: company;
  work_type?: work_type;
  project_version?: project_version;
  project?: project;
  project_financial_employees?: project_financial_employees[];
  logs?: log__project_financial[];
}

export interface project_financialCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  work_type_id?: string;
  cycles: number;
  total_value: number;
  discount?: number;
  project_version_id?: string;
  currency: string;
  project_id?: string;
  title?: string | null;
  company?: companyCreateInput;
  work_type?: work_typeCreateInput;
  project_version?: project_versionCreateInput;
  project?: projectCreateInput;
  project_financial_employees?: project_financial_employeesCreateInput[];
  logs?: log__project_financialCreateInput[];
}

export type project_financialUpdateInput = Partial<project_financialCreateInput>;

