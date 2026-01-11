import { profile } from '@/api/generator/types';
import { useConstants } from "@repo/hooks/constants";
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';

export type FormType = {
    id?: string | null;
    active?: boolean | null;
    level_id?: string | null;
    type?: string | null;
    entity?: string | null;
    phone?: string | null;
    owner?: boolean | null;
};

export interface IUseFormProps {
    data?: profile;
    disabled?: boolean;
    profile?: profile;
}

type DocType = 'cpf' | 'cnpj' | undefined;

export const useForm = ({ data }: IUseFormProps) => {
    const { brazilDocumentType } = useConstants();

    const fields: Field<Partial<FormType>>[] = [
        {
            field: 'input',
            name: 'level_id',
            label: 'level_id',
            className: 'col-span-1'
        },
        {
            field: 'switch',
            name: 'active',
            label: 'active',
            className: 'col-span-1'
        },
        {
            field: 'select',
            name: 'type',
            label: 'type_of_document',
            className: 'col-span-1',
            options: brazilDocumentType
        },
        {
            field: (data?.type as DocType) || 'input',
            name: 'entity',
            label: (data?.type as DocType) || 'document',
            className: 'col-span-1'
        },
        {
            field: 'phone',
            name: 'phone',
            label: 'phone',
            className: 'col-span-1'
        }
    ];

    const form = useFormList<Partial<FormType>>({
        fields,
        schema: {},
        values: {
            ...data,
            level_id: data?.level?.title
        }
    });

    return {
        ...form,
        config: {
            fields
        }
    };
};
