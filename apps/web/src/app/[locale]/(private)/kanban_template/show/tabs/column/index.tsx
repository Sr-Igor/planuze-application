import { useKanbanTemplateColumn } from '@/api/callers/kanban_template_column';
import { kanban_template, kanban_template_column } from '@/api/generator/types';
import { useLogs } from '@/hooks/logs';
import { useTrash } from '@/hooks/trash';
import { CardListTemplate } from '@/templates/card-list';
import { RegisterCard } from '@/templates/card-list/cards/register';
import { useShow } from '@/templates/show/context';

import { useForm } from './use-form';

export const Column = () => {
    const logs = useLogs();
    const trash = useTrash();
    const { data } = useShow<kanban_template>();

    return (
        <CardListTemplate<kanban_template, kanban_template_column>
            path='kanban_template'
            translate='show.column'
            dataAccess='kanban_template_columns'
            useShow={useShow}
            card={(props) => {
                return (
                    <RegisterCard<kanban_template_column>
                        {...props}
                        key={props.local_id}
                        useForm={useForm}
                        logs={logs.kanban_template_column()}
                    />
                );
            }}
            hookReq={useKanbanTemplateColumn}
            getBodyKeys={() => ({
                kanban_template_id: data?.id
            })}
            getFilters={(data) => ({
                kanban_template_id: data?.id
            })}
            trash={trash.kanban_template_column()}
            order={{
                titleKey: 'title'
            }}
        />
    );
};
