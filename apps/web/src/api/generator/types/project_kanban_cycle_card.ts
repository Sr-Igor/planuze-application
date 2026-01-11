import { company, companyCreateInput } from './company';
import {
    log__project_kanban_cycle_card,
    log__project_kanban_cycle_cardCreateInput
} from './log__project_kanban_cycle_card';
import { profile, profileCreateInput } from './profile';
import { project, projectCreateInput } from './project';
import { project_kanban, project_kanbanCreateInput } from './project_kanban';
import { project_kanban_cycle, project_kanban_cycleCreateInput } from './project_kanban_cycle';
import {
    project_kanban_cycle_card_comment,
    project_kanban_cycle_card_commentCreateInput
} from './project_kanban_cycle_card_comment';
import {
    project_kanban_cycle_card_file,
    project_kanban_cycle_card_fileCreateInput
} from './project_kanban_cycle_card_file';
import {
    project_kanban_cycle_card_read,
    project_kanban_cycle_card_readCreateInput
} from './project_kanban_cycle_card_read';
import {
    project_kanban_cycle_card_tag,
    project_kanban_cycle_card_tagCreateInput
} from './project_kanban_cycle_card_tag';
import {
    project_kanban_cycle_card_type,
    project_kanban_cycle_card_typeCreateInput
} from './project_kanban_cycle_card_type';
// import { project_kanban_cycle_card, project_kanban_cycle_cardCreateInput } from "./project_kanban_cycle_card";
import { project_kanban_cycle_column, project_kanban_cycle_columnCreateInput } from './project_kanban_cycle_column';
import { project_kanban_objective, project_kanban_objectiveCreateInput } from './project_kanban_objective';
import {
    project_kanban_objective_target,
    project_kanban_objective_targetCreateInput
} from './project_kanban_objective_target';
import { project_member, project_memberCreateInput } from './project_member';
import { work_type, work_typeCreateInput } from './work_type';

export interface project_kanban_cycle_card {
    id: string;
    deleted: boolean;
    deletedAt: string | null;
    updatedAt: string;
    createdAt: string;
    title: string;
    description: string | null;
    project_kanban_cycle_card_type_id: string;
    card_id: string | null;
    project_kanban_cycle_column_id: string;
    company_id: string;
    order: number;
    project_kanban_cycle_id: string;
    project_kanban_id: string;
    project_id: string;
    project_member_id: string | null;
    profile_id: string | null;
    public_id: number;
    work_type_id: string | null;
    estimate: number | null;
    estimate_unit: string;
    execute: number | null;
    execute_unit: string;
    work_in_progress: number | null;
    work_in_progress_unit: string;
    priority: number | null;
    severity: number | null;
    end_date_estimate: string | null;
    end_date_execute: string | null;
    project_kanban_objective_id: string | null;
    project_kanban_objective_target_id: string | null;
    accept_description: string | null;
    project_kanban_cycle_card_type?: project_kanban_cycle_card_type;
    card?: project_kanban_cycle_card;
    project_kanban_cycle_column?: project_kanban_cycle_column;
    company?: company;
    project_kanban_cycle?: project_kanban_cycle;
    project_kanban?: project_kanban;
    project?: project;
    profile?: profile;
    project_member?: project_member;
    work_type?: work_type;
    project_kanban_objective?: project_kanban_objective;
    project_kanban_objective_target?: project_kanban_objective_target;
    project_kanban_cycle_cards?: project_kanban_cycle_card[];
    project_kanban_cycle_card_comments?: project_kanban_cycle_card_comment[];
    project_kanban_cycle_card_files?: project_kanban_cycle_card_file[];
    project_kanban_cycle_card_reads?: project_kanban_cycle_card_read[];
    project_kanban_cycle_card_tags?: project_kanban_cycle_card_tag[];
    logs?: log__project_kanban_cycle_card[];
}

export interface project_kanban_cycle_cardCreateInput {
    id?: string;
    deleted?: boolean;
    deletedAt?: string | null;
    updatedAt?: string;
    createdAt?: string;
    title: string;
    description?: string | null;
    project_kanban_cycle_card_type_id?: string;
    card_id?: string | null;
    project_kanban_cycle_column_id?: string;
    company_id?: string;
    order: number;
    project_kanban_cycle_id?: string;
    project_kanban_id?: string;
    project_id?: string;
    project_member_id?: string | null;
    profile_id?: string | null;
    public_id?: number;
    work_type_id?: string | null;
    estimate?: number | null;
    estimate_unit?: string;
    execute?: number | null;
    execute_unit?: string;
    work_in_progress?: number | null;
    work_in_progress_unit?: string;
    priority?: number | null;
    severity?: number | null;
    end_date_estimate?: string | null;
    end_date_execute?: string | null;
    project_kanban_objective_id?: string | null;
    project_kanban_objective_target_id?: string | null;
    accept_description?: string | null;
    project_kanban_cycle_card_type?: project_kanban_cycle_card_typeCreateInput;
    card?: project_kanban_cycle_cardCreateInput;
    project_kanban_cycle_column?: project_kanban_cycle_columnCreateInput;
    company?: companyCreateInput;
    project_kanban_cycle?: project_kanban_cycleCreateInput;
    project_kanban?: project_kanbanCreateInput;
    project?: projectCreateInput;
    profile?: profileCreateInput;
    project_member?: project_memberCreateInput;
    work_type?: work_typeCreateInput;
    project_kanban_objective?: project_kanban_objectiveCreateInput;
    project_kanban_objective_target?: project_kanban_objective_targetCreateInput;
    project_kanban_cycle_cards?: project_kanban_cycle_cardCreateInput[];
    project_kanban_cycle_card_comments?: project_kanban_cycle_card_commentCreateInput[];
    project_kanban_cycle_card_files?: project_kanban_cycle_card_fileCreateInput[];
    project_kanban_cycle_card_reads?: project_kanban_cycle_card_readCreateInput[];
    project_kanban_cycle_card_tags?: project_kanban_cycle_card_tagCreateInput[];
    logs?: log__project_kanban_cycle_cardCreateInput[];
}

export type project_kanban_cycle_cardUpdateInput = Partial<project_kanban_cycle_cardCreateInput>;
