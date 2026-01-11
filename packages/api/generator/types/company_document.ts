import { company, companyCreateInput } from "./company";
import { log__company_document, log__company_documentCreateInput } from "./log__company_document";

export interface company_document {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  type: string;
  register: string;
  company?: company;
  logs?: log__company_document[];
}

export interface company_documentCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  type: string;
  register: string;
  company?: companyCreateInput;
  logs?: log__company_documentCreateInput[];
}

export type company_documentUpdateInput = Partial<company_documentCreateInput>;

