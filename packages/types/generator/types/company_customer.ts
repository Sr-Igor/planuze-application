import { company, companyCreateInput } from "./company";

export interface company_customer {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  customer_id: string;
  company?: company;
}

export interface company_customerCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  customer_id: string;
  company?: companyCreateInput;
}

export type company_customerUpdateInput = Partial<company_customerCreateInput>;

