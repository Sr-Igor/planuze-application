import { company, companyCreateInput } from "./company";
import { profile, profileCreateInput } from "./profile";
import { chat_message, chat_messageCreateInput } from "./chat_message";

export interface chat {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  profile_id: string;
  features: string;
  title: string;
  company?: company;
  profile?: profile;
  chat_messages?: chat_message[];
}

export interface chatCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  profile_id?: string;
  features: string;
  title: string;
  company?: companyCreateInput;
  profile?: profileCreateInput;
  chat_messages?: chat_messageCreateInput[];
}

export type chatUpdateInput = Partial<chatCreateInput>;

