import { useProjectMember } from '@/api/callers/project_member';
import { project_member } from '@/api/generator/types';
import { useLogs } from '@/hooks/logs';
import { useTrash } from '@/hooks/trash';
import { CardCrud } from '@/templates/card-crud';

import { useForm } from './use-form';

export const Member = () => {
    const logs = useLogs();
    const trash = useTrash();

    return (
        <CardCrud<project_member>
            card={{
                icon: 'User',
                title: (item) => `${item?.profile?.user?.name || item?.profile?.anonymous_name || '-'}`,
                descriptions: (item) => {
                    return [item?.profile?.user?.email || item?.profile?.anonymous_email || '-'];
                }
            }}
            hookReq={useProjectMember}
            page={'project'}
            translate='show.member'
            pathKey='project_member'
            getFilters={(data) => ({
                project_id: data?.id
            })}
            getBodyKeys={(data) => ({
                project_id: data?.id
            })}
            useForm={useForm}
            logs={logs.project_member()}
            trash={trash.project_member()}
        />
    );
};
