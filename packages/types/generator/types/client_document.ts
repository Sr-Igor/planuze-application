import { client, clientCreateInput } from "./client";
import { company, companyCreateInput } from "./company";
import { log__client_document, log__client_documentCreateInput } from "./log__client_document";

export interface client_document {
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
  logs?: log__client_document[];
}

export interface client_documentCreateInput {
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
  logs?: log__client_documentCreateInput[];
}

export type client_documentUpdateInput = Partial<client_documentCreateInput>;

