import { chat, chatCreateInput } from "./chat";

export interface chat_action {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  action_id: string;
  action: string | null;
  error: boolean;
  chat_id: string;
  chat?: chat;
}

export interface chat_actionCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  action_id: string;
  action?: string | null;
  error?: boolean;
  chat_id?: string;
  chat?: chatCreateInput;
}

export type chat_actionUpdateInput = Partial<chat_actionCreateInput>;

