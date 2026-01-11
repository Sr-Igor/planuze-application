import { client, clientCreateInput } from "./client";
import { company, companyCreateInput } from "./company";
import { log__client_contact, log__client_contactCreateInput } from "./log__client_contact";

export interface client_contact {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  client_id: string;
  type: string;
  register: string;
  company_id: string;
  client?: client;
  company?: company;
  logs?: log__client_contact[];
}

export interface client_contactCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  client_id?: string;
  type: string;
  register: string;
  company_id?: string;
  client?: clientCreateInput;
  company?: companyCreateInput;
  logs?: log__client_contactCreateInput[];
}

export type client_contactUpdateInput = Partial<client_contactCreateInput>;

