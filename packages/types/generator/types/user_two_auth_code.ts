export interface user_two_auth_code {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  user_id: string;
  code: string;
  device_id: string;
  valid_days: number;
  two_auth_id: string;
}

export interface user_two_auth_codeCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  user_id: string;
  code: string;
  device_id: string;
  valid_days?: number;
  two_auth_id: string;
}

export type user_two_auth_codeUpdateInput = Partial<user_two_auth_codeCreateInput>;

