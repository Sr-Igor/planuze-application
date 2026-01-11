//Utils
import { callEndpoint } from '@/api/generator';
import { Prisma } from '@/api/generator/prisma-types';
import { handleReq } from '@/api/handle';
import { logs } from '@/utils/includeLogs';

const query: Record<'include', Prisma.project_kanban_objective_targetInclude> = {
    include: {
        logs
    }
};

export const index = async (filters: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_objective_target/index',
        query: {
            ...filters,
            ...query
        }
    });

    return handleReq({
        ...handle
    });
};

export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_objective_target/store',
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
        route: '/api/private/project_kanban_objective_target/update',
        body,
        params: { id },
        query
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const destroy = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_objective_target/destroy',
        params: { id },
        query
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const trash = async (filters?: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_objective_target/trash',
        query: {
            ...filters,
            ...query
        }
    });

    return handleReq({
        ...handle
    });
};

export const restore = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_objective_target/restore',
        params: { id },
        query
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};
