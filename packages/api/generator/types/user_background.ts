export interface user_background {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  user_id: string;
  type: string;
  data: any | null;
  device_id: string | null;
}

export interface user_backgroundCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  user_id: string;
  type: string;
  data?: any | null;
  device_id?: string | null;
}

export type user_backgroundUpdateInput = Partial<user_backgroundCreateInput>;

