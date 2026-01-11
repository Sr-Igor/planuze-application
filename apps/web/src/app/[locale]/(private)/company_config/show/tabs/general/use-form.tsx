import { company_config } from '@/api/generator/types';
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { IValidatorRequest } from '@deviobr/validator';

export type FormType = {
    util_hour_day?: number | null;
    total_hour_day?: number | null;
};

export interface IUseFormProps {
    data?: Partial<company_config>;
    disabled?: boolean;
}

export const useForm = ({ data, disabled }: IUseFormProps) => {
    const defaultValues = {
        util_hour_day: 6.5,
        total_hour_day: 8
    };

    const schema: IValidatorRequest = {
        body: [
            {
                key: 'util_hour_day',
                method: 'numeric',
                coerse: 'number',
                positive: true
            },
            {
                key: 'total_hour_day',
                method: 'numeric',
                coerse: 'number',
                positive: true
            }
        ]
    };

    const fields: Field<FormType>[] = [
        {
            field: 'numeric',
            name: 'util_hour_day',
            label: 'util_hour_day',
            required: true,
            className: 'col-span-1',
            disabled,
            positive: true
        },
        {
            field: 'numeric',
            name: 'total_hour_day',
            label: 'total_hour_day',
            required: true,
            className: 'col-span-1',
            disabled,
            positive: true
        }
    ];

    const form = useFormList<FormType>({
        fields,
        schema,
        values: data,
        defaultValues
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
