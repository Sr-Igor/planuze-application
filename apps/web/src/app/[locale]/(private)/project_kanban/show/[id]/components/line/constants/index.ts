import { FilterKey } from '../types';

export const listKeys: Record<FilterKey, string> = {
    search: 'list_search',
    cycle: 'list_cycle',
    cardType: 'list_cardType',
    member: 'list_member',
    workType: 'list_workType',
    objective: 'list_objective',
    end_date_estimate_start: 'list_end_date_estimate_start',
    end_date_estimate_end: 'list_end_date_estimate_end',
    end_date_execute_start: 'list_end_date_execute_start',
    end_date_execute_end: 'list_end_date_execute_end',
    startDate: 'list_startDate',
    endDate: 'list_endDate',
    public_id: 'list_public_id',
    description: 'list_description',
    tag: 'list_tag',
    version: 'list_version',
    severity_min: 'list_severity_min',
    severity_max: 'list_severity_max',
    priority_min: 'list_priority_min',
    priority_max: 'list_priority_max',
    estimate_min: 'list_estimate_min',
    estimate_max: 'list_estimate_max',
    execute_min: 'list_execute_min',
    execute_max: 'list_execute_max',
    work_in_progress_min: 'list_work_in_progress_min',
    work_in_progress_max: 'list_work_in_progress_max'
};

export const reportKeys: Partial<Record<FilterKey, string>> = {
    cycle: 'report_cycle',
    cardType: 'report_cardType',
    member: 'report_member',
    workType: 'report_workType',
    objective: 'report_objective',
    version: 'report_version'
};

export const taskKeys: Partial<Record<FilterKey, string>> = {
    search: 'search',
    cycle: 'cycle',
    cardType: 'cardType',
    member: 'member',
    workType: 'workType',
    objective: 'objective',
    end_date_estimate_start: 'end_date_estimate_start',
    end_date_estimate_end: 'end_date_estimate_end',
    end_date_execute_start: 'end_date_execute_start',
    end_date_execute_end: 'end_date_execute_end',
    startDate: 'startDate',
    endDate: 'endDate',
    public_id: 'public_id',
    description: 'description',
    tag: 'tag',
    severity_min: 'severity_min',
    severity_max: 'severity_max',
    priority_min: 'priority_min',
    priority_max: 'priority_max',
    estimate_min: 'estimate_min',
    estimate_max: 'estimate_max',
    execute_min: 'execute_min',
    execute_max: 'execute_max',
    work_in_progress_min: 'work_in_progress_min',
    work_in_progress_max: 'work_in_progress_max'
};

export const paramsKeys = {
    list: listKeys,
    reports: reportKeys,
    tasks: taskKeys,
    principal: taskKeys
};
