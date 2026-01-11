//Utils
import { callEndpoint } from '@/api/generator';
import { Prisma } from '@/api/generator/prisma-types';
import { handleReq } from '@/api/handle';
import { logs } from '@/utils/includeLogs';

const query: Record<'include', Prisma.project_kanban_cycle_columnInclude> = {
    include: {
        logs
    }
};

export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_column/store',
        body,
        query
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const update = async (id: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_column/update',
        body,
        query,
        params: { id }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const destroy = async (id: string, q: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_column/destroy',
        params: { id },
        query: {
            ...query,
            ...q
        }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const many = async (ids: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_column/many',
        params: { ids },
        body,
        query
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const trash = async (filters?: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_column/trash',
        query: { ...filters, ...query }
    });

    return handleReq({
        ...handle
    });
};

export const restore = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_column/restore',
        query,
        params: { id }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};
