import { kanban_template_card_type } from '@/api/generator/types';
import { useBase } from '@/api/hooks/use-base';
import * as api from '@/api/req/kanban_template_card_type';
import { IUseCallerProps } from '@/api/types';

export const useKanbanTemplateCardType = (props: IUseCallerProps<kanban_template_card_type>) => {
    return useBase({
        ...props,
        api,
        cache: 'kanban_template_card_type'
    });
};
