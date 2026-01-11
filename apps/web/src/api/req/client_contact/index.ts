//Utils
import { callEndpoint } from '@/api/generator';
import { Prisma } from '@/api/generator/prisma-types';
import { handleReq } from '@/api/handle';
import { logs } from '@/utils/includeLogs';

const query: Record<'include', Prisma.client_contactInclude> = {
    include: {
        logs
    }
};

export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/private/client_contact/store',
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
        route: '/api/private/client_contact/update',
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
        route: '/api/private/client_contact/destroy',
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
        route: '/api/private/client_contact/trash',
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
        route: '/api/private/client_contact/restore',
        params: { id },
        query
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};
