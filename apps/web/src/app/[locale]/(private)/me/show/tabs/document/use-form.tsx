import { profile_document } from '@/api/generator/types';
import { useConstants } from "@repo/hooks/constants";
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { IUseHookProps } from '@/templates/card-list/cards/register/types';

export type FormType = {
    type?: string;
    register?: string;
};

export const useForm = ({ disabled, item }: IUseHookProps<profile_document> = {}) => {
    const { documentType } = useConstants();

    const fields: Field<FormType>[] = [
        {
            field: 'select',
            name: 'type',
            ref_key: 'type',
            disabled,
            label: 'type_of_contact',
            options: documentType
        },
        {
            field: 'cnpj',
            ref_key: 'cnpj',
            name: 'register',
            disabled,
            label: 'cnpj'
        },
        {
            field: 'cpf',
            ref_key: 'cpf',
            name: 'register',
            disabled,
            label: 'cpf'
        },
        {
            field: 'input',
            ref_key: 'string',
            name: 'register',
            disabled,
            label: 'register'
        }
    ];

    const form = useFormList({
        fields,
        schema: {},
        values: item
    });

    return {
        ...form,
        formProps: {
            ...form.formProps,
            onlyRead: true,
            fields: form.formProps.fields.filter((field) => {
                if (field.ref_key !== 'type' && field.ref_key !== item?.type) return false;
                else return true;
            })
        }
    };
};
