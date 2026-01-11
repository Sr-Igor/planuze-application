import { useEffect } from 'react';

import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { IValidatorRequest } from '@deviobr/validator';

export type FormType = {
    email: string;
};

export const useForm = (data?: FormType) => {
    const schema: IValidatorRequest = {
        body: [
            {
                key: 'email',
                method: 'email',
                coerse: 'string'
            }
        ]
    };

    const fields: Field<FormType>[] = [
        {
            field: 'input',
            name: 'email',
            label: 'email',
            required: true,
            className: 'col-span-2'
        }
    ];

    const form = useFormList({ fields, schema });

    useEffect(() => {
        if (data) form.hook.setValue('email', data.email, { shouldDirty: true });
    }, []);

    return {
        ...form,
        config: {
            schema,
            fields
        }
    };
};
