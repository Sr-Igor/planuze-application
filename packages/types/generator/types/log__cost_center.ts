import { user, userCreateInput } from "./user";
import { integration, integrationCreateInput } from "./integration";
import { admin, adminCreateInput } from "./admin";
import { cost_center, cost_centerCreateInput } from "./cost_center";

export interface log__cost_center {
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
  ref?: cost_center;
}

export interface log__cost_centerCreateInput {
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
  ref?: cost_centerCreateInput;
}

export type log__cost_centerUpdateInput = Partial<log__cost_centerCreateInput>;

