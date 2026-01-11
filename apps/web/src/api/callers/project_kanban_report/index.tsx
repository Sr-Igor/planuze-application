import keys from '@/api/cache/keys';
import * as api from '@/api/req/project_kanban_report';
import { IUseCallerProps } from '@/api/types';
import { useMutation, useQuery } from '@tanstack/react-query';

import { IIndexResponseDTO } from './types';

export const useProjectKanbanReport = ({ filters, enabledIndex }: IUseCallerProps<any>) => {
    const indexKey = keys.project_kanban_report.index(filters);

    const index = useQuery<IIndexResponseDTO>({
        queryKey: indexKey,
        queryFn: () => api.index(filters),
        enabled: !!enabledIndex
    });

    const exported = useMutation({
        mutationKey: keys.project_kanban_report.export(filters),
        mutationFn: () => api.exported({ ...filters, export: true })
    });

    return { index, exported };
};
