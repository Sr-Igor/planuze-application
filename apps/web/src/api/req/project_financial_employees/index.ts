//Utils
import { callEndpoint } from '@/api/generator';
import { Prisma } from '@/api/generator/prisma-types';
import { handleReq } from '@/api/handle';
import { logs } from '@/utils/includeLogs';

const query: Record<'include', Prisma.project_financial_employeesInclude> = {
    include: {
        logs,
        project_financial: {
            include: {
                project_version: true,
                work_type: true
            }
        },
        role: true
    }
};

export const index = async (filters: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_financial_employees/index',
        query: {
            ...filters,
            ...query,
            orderKey: 'createdAt',
            orderValue: 'desc'
        }
    });

    return handleReq({
        ...handle
    });
};

export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_financial_employees/store',
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
        route: '/api/private/project_financial_employees/update',
        body,
        query,
        params: { id }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const destroy = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/project_financial_employees/destroy',
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
        route: '/api/private/project_financial_employees/trash',
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
        route: '/api/private/project_financial_employees/restore',
        query,
        params: { id }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};
