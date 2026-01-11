import { company, companyCreateInput } from "./company";
import { level, levelCreateInput } from "./level";
import { log__invite, log__inviteCreateInput } from "./log__invite";

export interface invite {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  email: string;
  accepted: boolean | null;
  feedback_in: string | null;
  level_id: string;
  email_send_at: string | null;
  expire_date: string | null;
  company?: company;
  level?: level;
  logs?: log__invite[];
}

export interface inviteCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  email: string;
  accepted?: boolean | null;
  feedback_in?: string | null;
  level_id?: string;
  email_send_at?: string | null;
  expire_date?: string | null;
  company?: companyCreateInput;
  level?: levelCreateInput;
  logs?: log__inviteCreateInput[];
}

export type inviteUpdateInput = Partial<inviteCreateInput>;

