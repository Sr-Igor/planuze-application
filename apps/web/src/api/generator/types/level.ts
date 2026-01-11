import { company, companyCreateInput } from "./company";
import { invite, inviteCreateInput } from "./invite";
import { level_action, level_actionCreateInput } from "./level_action";
import { profile, profileCreateInput } from "./profile";
import { log__level, log__levelCreateInput } from "./log__level";

export interface level {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  company_id: string;
  title: string;
  active: boolean;
  description: string | null;
  administrator: boolean;
  company?: company;
  invites?: invite[];
  level_actions?: level_action[];
  profiles?: profile[];
  logs?: log__level[];
}

export interface levelCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  company_id?: string;
  title: string;
  active?: boolean;
  description?: string | null;
  administrator?: boolean;
  company?: companyCreateInput;
  invites?: inviteCreateInput[];
  level_actions?: level_actionCreateInput[];
  profiles?: profileCreateInput[];
  logs?: log__levelCreateInput[];
}

export type levelUpdateInput = Partial<levelCreateInput>;

