import { chat, chatCreateInput } from "./chat";

export interface chat_message {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  chat_id: string;
  sender: string;
  message: string;
  error: boolean;
  chat?: chat;
}

export interface chat_messageCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  chat_id?: string;
  sender: string;
  message: string;
  error?: boolean;
  chat?: chatCreateInput;
}

export type chat_messageUpdateInput = Partial<chat_messageCreateInput>;

