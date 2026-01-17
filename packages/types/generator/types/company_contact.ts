import { company, companyCreateInput } from "./company";
import { log__company_contact, log__company_contactCreateInput } from "./log__company_contact";

export interface company_contact {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  type: string;
  register: string;
  company?: company;
  logs?: log__company_contact[];
}

export interface company_contactCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  type: string;
  register: string;
  company?: companyCreateInput;
  logs?: log__company_contactCreateInput[];
}

export type company_contactUpdateInput = Partial<company_contactCreateInput>;

