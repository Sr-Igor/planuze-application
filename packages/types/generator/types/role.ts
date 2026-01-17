import { company, companyCreateInput } from "./company";
import { cost_center, cost_centerCreateInput } from "./cost_center";
import { work_type, work_typeCreateInput } from "./work_type";
import { profile_role, profile_roleCreateInput } from "./profile_role";
import { project_financial_employees, project_financial_employeesCreateInput } from "./project_financial_employees";
import { log__role, log__roleCreateInput } from "./log__role";

export interface role {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  title: string;
  recurrence: string;
  pay: number;
  active: boolean;
  company_id: string;
  cost_center_id: string | null;
  currency: string;
  work_type_id: string;
  company?: company;
  cost_center?: cost_center;
  work_type?: work_type;
  profile_roles?: profile_role[];
  project_financial_employees?: project_financial_employees[];
  logs?: log__role[];
}

export interface roleCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  title: string;
  recurrence?: string;
  pay: number;
  active?: boolean;
  company_id?: string;
  cost_center_id?: string | null;
  currency: string;
  work_type_id?: string;
  company?: companyCreateInput;
  cost_center?: cost_centerCreateInput;
  work_type?: work_typeCreateInput;
  profile_roles?: profile_roleCreateInput[];
  project_financial_employees?: project_financial_employeesCreateInput[];
  logs?: log__roleCreateInput[];
}

export type roleUpdateInput = Partial<roleCreateInput>;

