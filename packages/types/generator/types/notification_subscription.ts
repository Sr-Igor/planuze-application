import { user, userCreateInput } from "./user";

export interface notification_subscription {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  device_id: string;
  user_id: string;
  subscription: any;
  user?: user;
}

export interface notification_subscriptionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  device_id: string;
  user_id?: string;
  subscription: any;
  user?: userCreateInput;
}

export type notification_subscriptionUpdateInput = Partial<notification_subscriptionCreateInput>;

