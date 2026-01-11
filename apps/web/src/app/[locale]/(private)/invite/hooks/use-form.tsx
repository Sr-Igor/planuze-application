'use client';

import { invite, level } from '@/api/generator/types';
import { index } from '@/api/req/level';
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { IUseHookProps } from '@/templates/list/base/types';
import { IValidatorRequest } from '@deviobr/validator';

export const useForm = ({ disabled, state }: IUseHookProps<invite>) => {
    const defaultValues: Partial<invite> = {};

    const schema: IValidatorRequest = {
        body: [
            {
                key: 'email',
                method: 'email',
                coerse: 'string'
            },
            {
                key: 'level_id',
                method: 'string',
                coerse: 'string'
            },
            {
                key: 'expire_date',
                method: 'date',
                coerse: 'Date',
                optional: true,
                nullable: true
            }
        ]
    };

    const fields: Field<Partial<invite>>[] = [
        {
            field: 'input',
            name: 'email',
            label: 'email',
            required: true,
            disabled: disabled || !!state?.item?.email,
            className: 'col-span-2'
        },
        {
            field: 'infinity_select',
            name: 'level_id',
            label: 'level_id',
            required: true,
            disabled,
            className: 'col-span-2',
            cacheKey: 'level_infinity',
            fallbackValue: state?.item?.level?.title,
            request: index,
            formatter: (items: level[]) =>
                items?.map((level) => ({
                    label: level.title,
                    value: level.id,
                    item: level
                })) || []
        },
        {
            field: 'calendar',
            name: 'expire_date',
            label: 'expire_date',
            className: 'col-span-2',
            disabled,
            disabledPast: true
        }
    ];

    const form = useFormList<Partial<invite>>({
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
