import { useEffect } from 'react';

import { useFormList } from '@repo/form';
import { Field } from '@repo/form';
import { IValidatorRequest } from '@deviobr/validator';

export type FormType = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
};

export const useForm = () => {
    const schema: IValidatorRequest = {
        body: [
            {
                key: 'name',
                method: 'string',
                coerse: 'string'
            },
            {
                key: 'email',
                method: 'email',
                coerse: 'string'
            },
            {
                key: 'active',
                method: 'boolean',
                coerse: 'boolean',
                optional: true
            },
            {
                key: 'password',
                method: 'password',
                coerse: 'string'
            },
            {
                key: 'password_confirm',
                method: 'password',
                coerse: 'string'
            }
        ],
        relations: {
            query: [],
            params: [],
            body: [
                {
                    type: 'equal',
                    keys: ['password', 'password_confirm']
                }
            ]
        }
    };

    const fields: Field<FormType>[] = [
        {
            field: 'input',
            name: 'name',
            label: 'name',
            required: true,
            className: 'col-span-2'
        },
        {
            field: 'input',
            name: 'email',
            label: 'email',
            required: true,
            className: 'col-span-2'
        },
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
