'use client';

import { profile, project_allocation, project_version } from '@/api/generator/types';
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { IUseHookProps } from '@/templates/card-list/cards/register/types';
import { Shallow } from '@/types/shallowType';
import { IValidatorRequest } from '@deviobr/validator';

import { useKanbanShow } from '../../../context';

export type Form = Shallow<project_allocation>;

export const useForm = ({ disabled, item }: IUseHookProps<Form>) => {
    const { select } = useKanbanShow();

    const defaultValues: Partial<Form> = {};

    const schema: IValidatorRequest = {
        body: [
            {
                key: 'start_date',
                method: 'date',
                coerse: 'Date',
                optional: true,
                nullable: true
            },
            {
                key: 'end_date',
                optional: true,
                nullable: true,
                method: 'date',
                coerse: 'Date'
            },
            {
                key: 'profile_id',
                model: 'profile',
                column: 'id',
                method: 'string',
                coerse: 'string'
            },
            {
                key: 'project_version_id',
                method: 'string',
                coerse: 'string',
                model: 'project_version',
                column: 'id'
            }
        ]
    };

    const fields: Field<Partial<Form>>[] = [
        {
            field: 'infinity_select',
            name: 'profile_id',
            label: 'profile_id',
            className: 'col-span-1',
            required: true,
            disabled,
            cacheKey: 'profile_infinity',
            index: select.profile,
            search: select.search.profile,
            formatter: (items: profile[]) =>
                items?.map((profile) => ({
                    label: profile.user?.name || '',
                    value: profile.id,
                    item: profile
                })) || [],
            fallbackValue: item?.profile?.user?.name
        },
        {
            field: 'infinity_select',
            name: 'project_version_id',
            label: 'project_version_id',
            disabled,
            className: 'col-span-1',
            cacheKey: 'project_version_infinity',
            index: select.version,
            search: select.search.version,
            setSearch: (search) => select.handleSearch('version', search),
            formatter: (items: project_version[]) =>
                items?.map((projectVersion) => ({
                    label: `V${projectVersion.version}`,
                    value: projectVersion.id,
                    item: projectVersion
                })) || [],
            fallbackValue: item?.project_version ? `V${item?.project_version?.version}` : undefined
        },
        {
            field: 'calendar',
            name: 'start_date',
            label: 'start_date',
            disabled
        },
        {
            field: 'calendar',
            name: 'end_date',
            label: 'end_date',
            disabled
        }
    ];

    const form = useFormList<Partial<Form>>({
        fields,
        schema,
        values: item,
        defaultValues
    });

    return {
        ...form,
        config: {
            schema,
            fields,
            defaultValues
        }
    };
};
