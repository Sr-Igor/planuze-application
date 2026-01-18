import { useFormList, Field } from '@repo/form';
import { IValidatorRequest } from '@deviobr/validator';

export type FormType = {
    email: string;
    password: string;
};

export const useForm = () => {
    const schema: IValidatorRequest = {
        body: [
            {
                key: 'email',
                method: 'email',
                coerse: 'string',
            },
            {
                key: 'password',
                method: 'string',
                coerse: 'string',
            },
        ],
    };

    const fields: Field<FormType>[] = [
        {
            field: 'input',
            name: 'email',
            label: 'email',
            required: true,
            className: 'col-span-2',
        },
        {
            field: 'input',
            name: 'password',
            label: 'password',
            required: true,
            type: 'password',
            className: 'col-span-2',
        },
    ];

    return useFormList<FormType>({ fields, schema });
};
