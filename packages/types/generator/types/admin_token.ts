import { admin, adminCreateInput } from "./admin";

export interface admin_token {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  admin_id: string;
  token: string | null;
  device_id: string | null;
  admin?: admin;
}

export interface admin_tokenCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  admin_id?: string;
  token?: string | null;
  device_id?: string | null;
  admin?: adminCreateInput;
}

export type admin_tokenUpdateInput = Partial<admin_tokenCreateInput>;

