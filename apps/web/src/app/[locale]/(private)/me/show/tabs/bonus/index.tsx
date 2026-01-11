import { useProfileBonus } from '@/api/callers/profile_bonus';
import { profile, profile_bonus } from '@/api/generator/types';
import { CardListTemplate } from '@/templates/card-list';
import { RegisterCard } from '@/templates/card-list/cards/register';
import { useShow } from '@/templates/show/context';

import { useForm } from './use-form';

export const Bonus = () => {
    return (
        <CardListTemplate<profile, profile_bonus>
            path='profile'
            translate='show.bonus'
            dataAccess='profile_bonus'
            useShow={useShow}
            card={(props) => {
                return (
                    <RegisterCard<profile_bonus>
                        {...props}
                        key={props.local_id}
                        useForm={useForm}
                        logs={{
                            hidden: true
                        }}
                    />
                );
            }}
            hookReq={useProfileBonus}
            getFilters={(data) => ({
                profile_id: data?.id
            })}
        />
    );
};
