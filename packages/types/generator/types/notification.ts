import { user, userCreateInput } from "./user";
import { company, companyCreateInput } from "./company";

export interface notification {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  user_id: string;
  company_id: string | null;
  read: boolean;
  redirect: string | null;
  message_key: string;
  message_props: any | null;
  modal: string | null;
  module_id: string | null;
  profile_id: string | null;
  user?: user;
  company?: company;
}

export interface notificationCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  user_id?: string;
  company_id?: string | null;
  read?: boolean;
  redirect?: string | null;
  message_key: string;
  message_props?: any | null;
  modal?: string | null;
  module_id?: string | null;
  profile_id?: string | null;
  user?: userCreateInput;
  company?: companyCreateInput;
}

export type notificationUpdateInput = Partial<notificationCreateInput>;

