import { kanban_template } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/kanban_template';
import { IUseCallerProps } from '@/api/types';

export const useKanbanTemplate = (props: IUseCallerProps<kanban_template>) => {
    return useBase({
        ...props,
        api,
        cache: 'kanban_template'
    });
};
