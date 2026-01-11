import { user, userCreateInput } from "./user";

export interface user_token {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  user_id: string;
  token: string | null;
  device_id: string | null;
  user?: user;
}

export interface user_tokenCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  user_id?: string;
  token?: string | null;
  device_id?: string | null;
  user?: userCreateInput;
}

export type user_tokenUpdateInput = Partial<user_tokenCreateInput>;

