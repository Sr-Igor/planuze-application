import { company, companyCreateInput } from "./company";

export interface billing_error {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string | null;
  customer_id: string | null;
  subscription_id: string | null;
  event_id: string | null;
  stage: string | null;
  operation: string | null;
  error: string | null;
  company?: company;
}

export interface billing_errorCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string | null;
  customer_id?: string | null;
  subscription_id?: string | null;
  event_id?: string | null;
  stage?: string | null;
  operation?: string | null;
  error?: string | null;
  company?: companyCreateInput;
}

export type billing_errorUpdateInput = Partial<billing_errorCreateInput>;

