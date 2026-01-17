import { user, userCreateInput } from "./user";
import { integration, integrationCreateInput } from "./integration";
import { admin, adminCreateInput } from "./admin";
import { project_kanban_cycle_column, project_kanban_cycle_columnCreateInput } from "./project_kanban_cycle_column";

export interface log__project_kanban_cycle_column {
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
  ref?: project_kanban_cycle_column;
}

export interface log__project_kanban_cycle_columnCreateInput {
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
  ref?: project_kanban_cycle_columnCreateInput;
}

export type log__project_kanban_cycle_columnUpdateInput = Partial<log__project_kanban_cycle_columnCreateInput>;

