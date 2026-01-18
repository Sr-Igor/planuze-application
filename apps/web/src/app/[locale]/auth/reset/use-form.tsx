import { useEffect } from 'react';

import { useFormList } from '@repo/form';
import { Field } from '@repo/form';
import { IValidatorRequest } from '@deviobr/validator';

export type FormType = {
    password: string;
    password_confirm: string;
};

export const useForm = () => {
    const schema: IValidatorRequest = {
        body: [
            {
                key: 'password',
                coerse: 'string',
                method: 'password'
            },
            {
                key: 'password_confirm',
                coerse: 'string',
                method: 'password'
            }
        ],
        relations: {
            body: [
                {
                    keys: ['password', 'password_confirm'],
                    type: 'equal'
                }
            ]
        }
    };

    const fields: Field<FormType>[] = [
        {
            field: 'input',
            name: 'password',
            label: 'password',
            required: true,
            type: 'password',
            className: 'col-span-2'
        },
        {
            field: 'input',
            name: 'password_confirm',
            label: 'password_confirm',
            required: true,
            type: 'password',
            className: 'col-span-2'
        }
    ];

    const form = useFormList({ fields, schema });

    const password = form.hook.watch('password');
    const passwordConfirm = form.hook.watch('password_confirm');

    useEffect(() => {
        form.hook.clearErrors('password_confirm');
    }, [password]);

    useEffect(() => {
        form.hook.clearErrors('password');
    }, [passwordConfirm]);

    return {
        ...form,
        config: {
            schema,
            fields
        }
    };
};
