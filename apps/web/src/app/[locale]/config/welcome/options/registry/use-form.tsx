import { useEffect, useState } from 'react';

import { useConstants } from "@repo/hooks/constants";
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { IValidatorRequest } from '@deviobr/validator';

import { z } from 'zod';

type WType = 'cnpj' | 'cpf' | 'string';

export type FormType = {
    logo: string;
    name: string;
    email: string;
    entity: string;
    type: string;
    phone: string;
};

export interface IUseFieldsProps {
    disabled: boolean;
}

export const useForm = ({ disabled }: IUseFieldsProps) => {
    const { documentType } = useConstants();

    const defaultValues: Partial<FormType> = {
        type: 'cnpj'
    };

    const [wType, setWType] = useState<WType>('cnpj');

    const schema: IValidatorRequest = {
        body: [
            {
                key: 'name',
                method: 'string',
                coerse: 'string'
            },
            {
                key: 'type',
                method: 'enumeric',
                coerse: 'string',
                values: ['cnpj', 'cpf', 'string']
            },
            {
                key: 'logo',
                optional: true,
                coerse: 'File',
                custom: z.union([z.instanceof(File), z.string(), z.null()])
            },
            {
                key: 'email',
                method: 'email',
                coerse: 'string'
            },
            {
                key: 'phone',
                method: 'phone',
                coerse: 'string'
            },
            {
                key: 'entity',
                method: wType,
                coerse: 'string'
            }
        ]
    };

    const fields: Field<FormType>[] = [
        {
            field: 'avatar',
            name: 'logo',
            label: 'logo',
            required: true,
            publicFile: true,
            disabled,
            className: 'col-span-2'
        },
        {
            field: 'input',
            name: 'name',
            label: 'name_of_company',
            required: true,
            disabled,
            className: 'col-span-2'
        },
        {
            field: 'input',
            name: 'email',
            label: 'email_of_company',
            required: true,
            disabled,
            className: 'col-span-2'
        },
        {
            field: 'select',
            name: 'type',
            label: 'type_of_document',
            required: true,
            options: documentType,
            disabled,
            clearable: false,
            className: 'col-span-2'
        },
        {
            field: 'input',
            name: 'entity',
            label: 'document',
            required: true,
            disabled,
            className: 'col-span-2'
        },
        {
            field: 'phone',
            name: 'phone',
            label: 'phone_of_company',
            required: true,
            disabled,
            className: 'col-span-2'
        }
    ];

    const form = useFormList<FormType>({ fields, schema, defaultValues });

    const type = form.hook.watch('type');
    const isString = type === 'string';
    useEffect(() => {
        setWType(type as WType);
        form.hook.clearErrors();
    }, [type]);

    return {
        ...form,
        formProps: {
            ...form.formProps,
            fields: form.formProps.fields.map((field) => {
                const key = field.name;
                switch (key) {
                    case 'entity':
                        return {
                            ...field,
                            label: isString ? 'document' : type,
                            field: isString ? 'input' : type
                        };
                    default:
                        return field;
                }
            }) as Field<FormType>[]
        },
        config: {
            schema,
            fields
        }
    };
};
