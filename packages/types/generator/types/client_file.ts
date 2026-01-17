import { client, clientCreateInput } from "./client";
import { company, companyCreateInput } from "./company";
import { log__client_file, log__client_fileCreateInput } from "./log__client_file";

export interface client_file {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  client_id: string;
  file: string;
  vector: boolean | null;
  vector_error: string | null;
  company_id: string;
  name: string | null;
  client?: client;
  company?: company;
  logs?: log__client_file[];
}

export interface client_fileCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  client_id?: string;
  file: string;
  vector?: boolean | null;
  vector_error?: string | null;
  company_id?: string;
  name?: string | null;
  client?: clientCreateInput;
  company?: companyCreateInput;
  logs?: log__client_fileCreateInput[];
}

export type client_fileUpdateInput = Partial<client_fileCreateInput>;

