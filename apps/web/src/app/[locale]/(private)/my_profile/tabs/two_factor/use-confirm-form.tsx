import { user_two_auth } from '@/api/generator/types';
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { IValidatorRequest } from '@deviobr/validator';

export type FormType = {
    code?: string;
};

export interface IUseFormProps {
    disabled?: boolean;
}

export const useConfirmForm = ({ disabled }: IUseFormProps) => {
    const schema: IValidatorRequest = {
        body: [
            {
                key: 'code',
                coerse: 'string',
                method: 'string'
            }
        ]
    };

    const fields: Field<FormType>[] = [
        {
            field: 'input',
            name: 'code',
            label: 'code',
            required: true,
            className: 'col-span-3',
            disabled
        }
    ];

    const form = useFormList<FormType>({ fields, schema });

    return {
        ...form,
        config: {
            schema,
            fields
        }
    };
};
