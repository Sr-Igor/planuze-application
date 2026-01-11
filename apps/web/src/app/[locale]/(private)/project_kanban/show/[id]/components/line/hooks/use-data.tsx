import { useMemo } from 'react';

import { useKanbanShow } from '../../../context';
import { IParams } from '../../../hooks/use-query/types';
import { listKeys, paramsKeys } from '../constants';
import { FilterKey } from '../types';

// Tipos para os valores dos filtros
type FilterValues = {
    [K in FilterKey]?: string | undefined;
};

// Tipos para valores de data
type DateValues = {
    end_date_estimate_start?: Date;
    end_date_estimate_end?: Date;
    end_date_execute_start?: Date;
    end_date_execute_end?: Date;
    startDate?: Date;
    endDate?: Date;
};

// Função helper para acessar valores dos params de forma type-safe
const getFilterValue = (params: IParams | undefined, key?: string): string | undefined => {
    if (!params) return undefined;
    return params[key as keyof IParams] as string | undefined;
};

// Função helper para converter string para Date
const parseDate = (dateString: string | undefined): Date | undefined => {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? undefined : date;
};

// Tipos para as opções
type Option = {
    label: string;
    value: string;
};

// Tipos para o retorno do hook
type UseDataReturn = {
    cycles: Option[];
    profileOptions: Option[];
    countFilters: {
        selects: number;
        dates: number;
        interval: number;
        open: number;
        total: number;
    };
    values: FilterValues;
    dateValues: DateValues;
    objectKeys: Partial<Record<FilterKey, string>>;
};

export const useData = (): UseDataReturn => {
    const { data, params } = useKanbanShow();

    const objectKeys = paramsKeys[params?.view as keyof typeof paramsKeys] || listKeys;

    const cycles = useMemo(() => {
        return data.cycles.map((cycle) => ({
            label: cycle.title,
            value: cycle.id,
            item: cycle
        }));
    }, [data.cycles]);

    const profileOptions = useMemo(() => {
        const options = data.profiles.map((profile) => ({
            label: profile.name!,
            value: profile.profile_id!
        }));

        return [{ label: 'unallocated', value: 'null' }, ...options];
    }, [data.profiles]);

    const values = useMemo((): FilterValues => {
        return {
            cycle: getFilterValue(params, objectKeys.cycle),
            search: getFilterValue(params, objectKeys.search),
            cardType: getFilterValue(params, objectKeys.cardType),
            member: getFilterValue(params, objectKeys.member),
            workType: getFilterValue(params, objectKeys.workType),
            objective: getFilterValue(params, objectKeys.objective),
            version: getFilterValue(params, objectKeys.version),
            end_date_estimate_start: getFilterValue(params, objectKeys.end_date_estimate_start),
            end_date_estimate_end: getFilterValue(params, objectKeys.end_date_estimate_end),
            end_date_execute_start: getFilterValue(params, objectKeys.end_date_execute_start),
            end_date_execute_end: getFilterValue(params, objectKeys.end_date_execute_end),
            startDate: getFilterValue(params, objectKeys.startDate),
            endDate: getFilterValue(params, objectKeys.endDate),
            severity_min: getFilterValue(params, objectKeys.severity_min),
            severity_max: getFilterValue(params, objectKeys.severity_max),
            priority_min: getFilterValue(params, objectKeys.priority_min),
            priority_max: getFilterValue(params, objectKeys.priority_max),
            estimate_min: getFilterValue(params, objectKeys.estimate_min),
            estimate_max: getFilterValue(params, objectKeys.estimate_max),
            execute_min: getFilterValue(params, objectKeys.execute_min),
            execute_max: getFilterValue(params, objectKeys.execute_max),
            work_in_progress_min: getFilterValue(params, objectKeys.work_in_progress_min),
            work_in_progress_max: getFilterValue(params, objectKeys.work_in_progress_max),
            public_id: getFilterValue(params, objectKeys.public_id),
            description: getFilterValue(params, objectKeys.description),
            tag: getFilterValue(params, objectKeys.tag)
        };
    }, [params, objectKeys]);

    const dateValues = useMemo((): DateValues => {
        return {
            end_date_estimate_start: parseDate(getFilterValue(params, objectKeys.end_date_estimate_start)),
            end_date_estimate_end: parseDate(getFilterValue(params, objectKeys.end_date_estimate_end)),
            end_date_execute_start: parseDate(getFilterValue(params, objectKeys.end_date_execute_start)),
            end_date_execute_end: parseDate(getFilterValue(params, objectKeys.end_date_execute_end)),
            startDate: parseDate(getFilterValue(params, objectKeys.startDate)),
            endDate: parseDate(getFilterValue(params, objectKeys.endDate))
        };
    }, [params, objectKeys]);

    const countFilters = useMemo(() => {
        const selects =
            (values.cardType?.split(',')?.filter(Boolean) || []).length +
            (values.member?.split(',')?.filter(Boolean) || []).length +
            (values.workType?.split(',')?.filter(Boolean) || []).length +
            (values.objective?.split(',')?.filter(Boolean) || []).length +
            (values.version?.split(',')?.filter(Boolean) || []).length;

        const dates =
            (values.end_date_estimate_start ? 1 : 0) +
            (values.end_date_estimate_end ? 1 : 0) +
            (values.end_date_execute_start ? 1 : 0) +
            (values.end_date_execute_end ? 1 : 0) +
            (values.startDate ? 1 : 0) +
            (values.endDate ? 1 : 0);

        const interval =
            (values.severity_min ? 1 : 0) +
            (values.severity_max ? 1 : 0) +
            (values.priority_min ? 1 : 0) +
            (values.priority_max ? 1 : 0) +
            (values.estimate_min ? 1 : 0) +
            (values.estimate_max ? 1 : 0) +
            (values.execute_min ? 1 : 0) +
            (values.execute_max ? 1 : 0) +
            (values.work_in_progress_min ? 1 : 0) +
            (values.work_in_progress_max ? 1 : 0);

        const open = (values.public_id ? 1 : 0) + (values.description ? 1 : 0) + (values.tag ? 1 : 0);

        return {
            selects,
            dates,
            interval,
            open,
            total: selects + dates + open
        };
    }, [values]);

    return {
        cycles,
        profileOptions,
        countFilters,
        values,
        dateValues,
        objectKeys
    };
};
