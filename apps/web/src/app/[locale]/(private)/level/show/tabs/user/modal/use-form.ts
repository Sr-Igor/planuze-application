'use client';

import { profile, project_member } from '@/api/generator/types';
import { index } from '@/api/req/profile';
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { Shallow } from '@/types/shallowType';
import { IValidatorRequest } from '@deviobr/validator';

type Form = Shallow<project_member>;

export interface IUseFormProps {
    disabled: boolean;
    profiles: profile[];
}

const schema: IValidatorRequest = {
    body: [
        {
            key: 'profile_id',
            method: 'string',
            coerse: 'string',
            model: 'profile',
            column: 'id'
        }
    ]
};

export const useForm = ({ disabled, profiles }: IUseFormProps) => {
    const defaultValues: Partial<Form> = {};

    const fields: Field<Form>[] = [
        {
            field: 'infinity_select',
            name: 'profile_id',
            label: 'profile_id',
            className: 'col-span-2',
            required: true,
            disabled,
            cacheKey: 'profile_infinity',
            request: index,
            formatter: (items: profile[]) =>
                items
                    ?.filter(
                        (profile) =>
                            !profiles.some((member) => member.id === profile.id) && !profile.owner && profile.user_id
                    )
                    ?.map((profile) => ({
                        label: profile.user?.name || '',
                        value: profile.id,
                        item: profile
                    })) || []
        }
    ];

    const form = useFormList<Form>({
        fields,
        schema,
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
