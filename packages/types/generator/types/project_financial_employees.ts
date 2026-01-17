import { project_financial, project_financialCreateInput } from "./project_financial";
import { company, companyCreateInput } from "./company";
import { project, projectCreateInput } from "./project";
import { role, roleCreateInput } from "./role";
import { log__project_financial_employees, log__project_financial_employeesCreateInput } from "./log__project_financial_employees";

export interface project_financial_employees {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  project_financial_id: string;
  quantity: number;
  unit_value: number;
  currency: string;
  project_id: string;
  role_id: string;
  project_financial?: project_financial;
  company?: company;
  project?: project;
  role?: role;
  logs?: log__project_financial_employees[];
}

export interface project_financial_employeesCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  project_financial_id?: string;
  quantity: number;
  unit_value: number;
  currency: string;
  project_id?: string;
  role_id?: string;
  project_financial?: project_financialCreateInput;
  company?: companyCreateInput;
  project?: projectCreateInput;
  role?: roleCreateInput;
  logs?: log__project_financial_employeesCreateInput[];
}

export type project_financial_employeesUpdateInput = Partial<project_financial_employeesCreateInput>;

