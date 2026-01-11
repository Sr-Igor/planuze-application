import { profile, profile_contact } from '@/api/generator/types';
import { CardListTemplate } from '@/templates/card-list';
import { RegisterCard } from '@/templates/card-list/cards/register';
import { useShow } from '@/templates/show/context';

import { useForm } from './use-form';

export const Contact = () => {
    return (
        <CardListTemplate<profile, profile_contact>
            path='me'
            translate='show.contact'
            dataAccess='profile_contacts'
            useShow={useShow}
            card={(props) => {
                return (
                    <RegisterCard<profile_contact>
                        {...props}
                        key={props.local_id}
                        useForm={useForm}
                        logs={{ hidden: true }}
                    />
                );
            }}
            getFilters={(data) => ({
                profile_id: data?.id
            })}
        />
    );
};
