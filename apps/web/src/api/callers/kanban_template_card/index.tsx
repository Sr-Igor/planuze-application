import { kanban_template_card } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/kanban_template_card';
import { IUseCallerProps } from '@/api/types';

export const useKanbanTemplateCard = (props: IUseCallerProps<kanban_template_card>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'kanban_template',
        cache: 'kanban_template_card',
        field: 'kanban_template_cards',
        accessKey: props.filters?.kanban_template_id,
        nestedArrayOptions: {
            orderKey: 'createdAt',
            orderValue: 'desc',
            dataType: 'date'
        }
    });
};
