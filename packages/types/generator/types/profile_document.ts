import { profile, profileCreateInput } from "./profile";
import { company, companyCreateInput } from "./company";
import { log__profile_document, log__profile_documentCreateInput } from "./log__profile_document";

export interface profile_document {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  profile_id: string;
  type: string;
  register: string;
  company_id: string;
  profile?: profile;
  company?: company;
  logs?: log__profile_document[];
}

export interface profile_documentCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  profile_id?: string;
  type: string;
  register: string;
  company_id?: string;
  profile?: profileCreateInput;
  company?: companyCreateInput;
  logs?: log__profile_documentCreateInput[];
}

export type profile_documentUpdateInput = Partial<profile_documentCreateInput>;

