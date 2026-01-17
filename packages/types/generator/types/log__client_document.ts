import { user, userCreateInput } from "./user";
import { integration, integrationCreateInput } from "./integration";
import { admin, adminCreateInput } from "./admin";
import { client_document, client_documentCreateInput } from "./client_document";

export interface log__client_document {
  id: string;
  ref_id: string | null;
  auth_api: string | null;
  auth_ref_api?: user;
  auth_integration: string | null;
  auth_ref_integration?: integration;
  auth_manager: string | null;
  auth_ref_manager?: admin;
  old: any | null;
  new: any | null;
  query: any | null;
  action: string;
  deleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  ref?: client_document;
}

export interface log__client_documentCreateInput {
  id?: string;
  ref_id?: string | null;
  auth_api?: string | null;
  auth_ref_api?: userCreateInput;
  auth_integration?: string | null;
  auth_ref_integration?: integrationCreateInput;
  auth_manager?: string | null;
  auth_ref_manager?: adminCreateInput;
  old?: any | null;
  new?: any | null;
  query?: any | null;
  action: string;
  deleted?: boolean;
  deletedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  ref?: client_documentCreateInput;
}

export type log__client_documentUpdateInput = Partial<log__client_documentCreateInput>;

