import { company, companyCreateInput } from "./company";
import { log__company_address, log__company_addressCreateInput } from "./log__company_address";

export interface company_address {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  street: string | null;
  complement: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip_code: string | null;
  company_id: string;
  number: string | null;
  neighborhood: string | null;
  company?: company;
  logs?: log__company_address[];
}

export interface company_addressCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  street?: string | null;
  complement?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zip_code?: string | null;
  company_id?: string;
  number?: string | null;
  neighborhood?: string | null;
  company?: companyCreateInput;
  logs?: log__company_addressCreateInput[];
}

export type company_addressUpdateInput = Partial<company_addressCreateInput>;

