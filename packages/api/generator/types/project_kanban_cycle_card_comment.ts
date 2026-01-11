import { company, companyCreateInput } from "./company";
import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { profile, profileCreateInput } from "./profile";
//@ts-ignore
import { project_kanban_cycle_card_comment, project_kanban_cycle_card_commentCreateInput } from "./project_kanban_cycle_card_comment";
import { project_kanban, project_kanbanCreateInput } from "./project_kanban";
import { project, projectCreateInput } from "./project";

export interface project_kanban_cycle_card_comment {
  id: string;
  deleted: boolean;
  deletedAt: string | null;
  updatedAt: string;
  createdAt: string;
  project_kanban_cycle_card_id: string;
  profile_id: string;
  company_id: string;
  text: string;
  project_kanban_cycle_comment_id: string | null;
  project_kanban_id: string;
  project_id: string;
  company?: company;
  project_kanban_cycle_card?: project_kanban_cycle_card;
  profile?: profile;
  project_kanban_cycle_comment?: project_kanban_cycle_card_comment;
  project_kanban?: project_kanban;
  project?: project;
  project_kanban_cycle_card_comments?: project_kanban_cycle_card_comment[];
}

export interface project_kanban_cycle_card_commentCreateInput {
  id?: string;
  deleted?: boolean;
  deletedAt?: string | null;
  updatedAt?: string;
  createdAt?: string;
  project_kanban_cycle_card_id?: string;
  profile_id?: string;
  company_id?: string;
  text: string;
  project_kanban_cycle_comment_id?: string | null;
  project_kanban_id?: string;
  project_id?: string;
  company?: companyCreateInput;
  project_kanban_cycle_card?: project_kanban_cycle_cardCreateInput;
  profile?: profileCreateInput;
  project_kanban_cycle_comment?: project_kanban_cycle_card_commentCreateInput;
  project_kanban?: project_kanbanCreateInput;
  project?: projectCreateInput;
  project_kanban_cycle_card_comments?: project_kanban_cycle_card_commentCreateInput[];
}

export type project_kanban_cycle_card_commentUpdateInput = Partial<project_kanban_cycle_card_commentCreateInput>;

