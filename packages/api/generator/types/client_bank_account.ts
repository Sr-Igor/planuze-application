import { company, companyCreateInput } from "./company";
import { client, clientCreateInput } from "./client";
import { log__client_bank_account, log__client_bank_accountCreateInput } from "./log__client_bank_account";

export interface client_bank_account {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  client_id: string;
  company_id: string;
  account: string;
  digit: string | null;
  bank_number: string | null;
  type: string;
  principal: boolean;
  comment: string | null;
  bank_name: string | null;
  agency: string;
  country: string;
  company?: company;
  client?: client;
  logs?: log__client_bank_account[];
}

export interface client_bank_accountCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  client_id?: string;
  company_id?: string;
  account: string;
  digit?: string | null;
  bank_number?: string | null;
  type: string;
  principal?: boolean;
  comment?: string | null;
  bank_name?: string | null;
  agency: string;
  country: string;
  company?: companyCreateInput;
  client?: clientCreateInput;
  logs?: log__client_bank_accountCreateInput[];
}

export type client_bank_accountUpdateInput = Partial<client_bank_accountCreateInput>;

