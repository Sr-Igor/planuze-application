import { profile, profileCreateInput } from "./profile";
import { company, companyCreateInput } from "./company";
import { log__profile_file, log__profile_fileCreateInput } from "./log__profile_file";

export interface profile_file {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  profile_id: string;
  file: string;
  vector: boolean | null;
  vector_error: string | null;
  company_id: string;
  name: string | null;
  profile?: profile;
  company?: company;
  logs?: log__profile_file[];
}

export interface profile_fileCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  profile_id?: string;
  file: string;
  vector?: boolean | null;
  vector_error?: string | null;
  company_id?: string;
  name?: string | null;
  profile?: profileCreateInput;
  company?: companyCreateInput;
  logs?: log__profile_fileCreateInput[];
}

export type profile_fileUpdateInput = Partial<profile_fileCreateInput>;

