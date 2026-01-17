import { user, userCreateInput } from "./user";
import { integration, integrationCreateInput } from "./integration";
import { admin, adminCreateInput } from "./admin";
import { project_financial, project_financialCreateInput } from "./project_financial";

export interface log__project_financial {
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
  ref?: project_financial;
}

export interface log__project_financialCreateInput {
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
  ref?: project_financialCreateInput;
}

export type log__project_financialUpdateInput = Partial<log__project_financialCreateInput>;

