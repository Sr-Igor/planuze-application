import { profile, profile_document } from '@/api/generator/types';
import { CardListTemplate } from '@/templates/card-list';
import { RegisterCard } from '@/templates/card-list/cards/register';
import { useShow } from '@/templates/show/context';

import { useForm } from './use-form';

export const Document = () => {
    return (
        <CardListTemplate<profile, profile_document>
            path='me'
            translate='show.document'
            dataAccess='profile_documents'
            useShow={useShow}
            card={(props) => {
                return (
                    <RegisterCard<profile_document>
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
