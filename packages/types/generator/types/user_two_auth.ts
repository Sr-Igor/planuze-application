import { user, userCreateInput } from "./user";

export interface user_two_auth {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  user_id: string;
  method: string;
  target: string;
  active: boolean;
  confirmed: boolean;
  confirmed_in: string | null;
  confirmed_code: string;
  confirmed_send_in: string | null;
  user?: user;
}

export interface user_two_authCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  user_id?: string;
  method: string;
  target: string;
  active?: boolean;
  confirmed?: boolean;
  confirmed_in?: string | null;
  confirmed_code: string;
  confirmed_send_in?: string | null;
  user?: userCreateInput;
}

export type user_two_authUpdateInput = Partial<user_two_authCreateInput>;

