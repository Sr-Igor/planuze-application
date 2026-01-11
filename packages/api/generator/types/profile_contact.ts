import { profile, profileCreateInput } from "./profile";
import { company, companyCreateInput } from "./company";
import { log__profile_contact, log__profile_contactCreateInput } from "./log__profile_contact";

export interface profile_contact {
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
  logs?: log__profile_contact[];
}

export interface profile_contactCreateInput {
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
  logs?: log__profile_contactCreateInput[];
}

export type profile_contactUpdateInput = Partial<profile_contactCreateInput>;

