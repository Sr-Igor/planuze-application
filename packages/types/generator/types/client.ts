import { company, companyCreateInput } from "./company";
import { client_address, client_addressCreateInput } from "./client_address";
import { client_bank_account, client_bank_accountCreateInput } from "./client_bank_account";
import { client_contact, client_contactCreateInput } from "./client_contact";
import { client_document, client_documentCreateInput } from "./client_document";
import { client_file, client_fileCreateInput } from "./client_file";
import { project, projectCreateInput } from "./project";
import { log__client, log__clientCreateInput } from "./log__client";

export interface client {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  name: string;
  phone: string | null;
  avatar: string | null;
  comment: string | null;
  email: string | null;
  company_id: string;
  avatar_original_name: string | null;
  company?: company;
  client_address?: client_address;
  client_bank_accounts?: client_bank_account[];
  client_contacts?: client_contact[];
  client_documents?: client_document[];
  client_files?: client_file[];
  projects?: project[];
  logs?: log__client[];
}

export interface clientCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  name: string;
  phone?: string | null;
  avatar?: string | null;
  comment?: string | null;
  email?: string | null;
  company_id?: string;
  avatar_original_name?: string | null;
  company?: companyCreateInput;
  client_address?: client_addressCreateInput;
  client_bank_accounts?: client_bank_accountCreateInput[];
  client_contacts?: client_contactCreateInput[];
  client_documents?: client_documentCreateInput[];
  client_files?: client_fileCreateInput[];
  projects?: projectCreateInput[];
  logs?: log__clientCreateInput[];
}

export type clientUpdateInput = Partial<clientCreateInput>;

