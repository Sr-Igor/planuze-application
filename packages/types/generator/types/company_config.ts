import { company, companyCreateInput } from "./company";
import { log__company_config, log__company_configCreateInput } from "./log__company_config";

export interface company_config {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  util_hour_day: number;
  total_hour_day: number;
  company?: company;
  logs?: log__company_config[];
}

export interface company_configCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  util_hour_day?: number;
  total_hour_day?: number;
  company?: companyCreateInput;
  logs?: log__company_configCreateInput[];
}

export type company_configUpdateInput = Partial<company_configCreateInput>;

