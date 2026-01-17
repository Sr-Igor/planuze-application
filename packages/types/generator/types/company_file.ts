import { company, companyCreateInput } from "./company";
import { log__company_file, log__company_fileCreateInput } from "./log__company_file";

export interface company_file {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  file: string;
  vector: boolean | null;
  vector_error: string | null;
  name: string | null;
  company?: company;
  logs?: log__company_file[];
}

export interface company_fileCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  file: string;
  vector?: boolean | null;
  vector_error?: string | null;
  name?: string | null;
  company?: companyCreateInput;
  logs?: log__company_fileCreateInput[];
}

export type company_fileUpdateInput = Partial<company_fileCreateInput>;

