import { client, clientCreateInput } from "./client";
import { company, companyCreateInput } from "./company";
import { log__client_address, log__client_addressCreateInput } from "./log__client_address";

export interface client_address {
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
  client_id: string;
  number: string | null;
  neighborhood: string | null;
  company_id: string;
  client?: client;
  company?: company;
  logs?: log__client_address[];
}

export interface client_addressCreateInput {
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
  client_id?: string;
  number?: string | null;
  neighborhood?: string | null;
  company_id?: string;
  client?: clientCreateInput;
  company?: companyCreateInput;
  logs?: log__client_addressCreateInput[];
}

export type client_addressUpdateInput = Partial<client_addressCreateInput>;

