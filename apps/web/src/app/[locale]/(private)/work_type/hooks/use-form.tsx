'use client';

import { work_type } from '@/api/generator/types';
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { IUseHookProps } from '@/templates/list/base/types';
import { IValidatorRequest } from '@deviobr/validator';

export const useForm = ({ disabled, state }: IUseHookProps<work_type>) => {
    const defaultValues: Partial<work_type> = {
        title: '',
        active: true
    };

    const schema: IValidatorRequest = {
        body: [
            {
                key: 'title',
                method: 'string',
                coerse: 'string'
            },
            {
                key: 'active',
                method: 'boolean',
                coerse: 'boolean'
            }
        ]
    };

    const fields: Field<Partial<work_type>>[] = [
        {
            field: 'input',
            name: 'title',
            label: 'title',
            required: true,
            disabled,
            className: 'col-span-2'
        },
        {
            label: 'active',
            field: 'switch',
            name: 'active',
            disabled
        }
    ];

    const form = useFormList<Partial<work_type>>({
        fields,
        schema,
        values: state.item,
        defaultValues: defaultValues
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
