//Utils
import { callEndpoint } from '@/api/generator';
import { exporteXlsx } from '@/api/global/export-xlsx';
import { handleReq } from '@/api/handle';

export const index = async (filters: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_report/index',
        query: filters
    });

    return await handleReq({
        ...handle,
        config: filters.export ? { responseType: 'arraybuffer' } : undefined
    });
};

export const exported = async (filters: any) => {
    const response = await exporteXlsx('/api/private/project_kanban_report/index', filters);
    return response;
};
