import { project_kanban_cycle_card_file } from '@/api/generator/types';
import { useNestedArray } from '@/api/hooks/use-nested-array';
import * as api from '@/api/req/project_kanban_cycle_card_file';
import { IUseCallerProps } from '@/api/types';

export const useProjectKanbanCycleCardFile = (props: IUseCallerProps<project_kanban_cycle_card_file>) => {
    return useNestedArray({
        ...props,
        api,
        rootCache: 'project_kanban_cycle_card',
        cache: 'project_kanban_cycle_card_file',
        field: 'project_kanban_cycle_card_files',
        accessKey: props.filters?.project_kanban_cycle_card_id
    });
};
