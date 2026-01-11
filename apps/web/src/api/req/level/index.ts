//Utils
import { callEndpoint } from '@/api/generator';
import { Prisma } from '@/api/generator/prisma-types';
import { handleReq } from '@/api/handle';
import { logs } from '@/utils/includeLogs';

const query: Record<'include', Prisma.levelInclude> = {
    include: {
        logs,
        level_actions: {
            include: {
                action: true,
                feature: true
            }
        },
        profiles: {
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        avatar: true,
                        email: true
                    }
                }
            }
        }
    }
};

export const index = async (filters: any) => {
    const handle = callEndpoint({
        route: '/api/private/level/index',
        query: { ...filters, include: { logs } }
    });

    return handleReq({
        ...handle
    });
};

export const show = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/level/show',
        params: { id },
        query
    });

    return handleReq({
        ...handle,
        hideError: true
    });
};

export const store = async (body: any, filters: any = {}) => {
    const handle = callEndpoint({
        route: '/api/private/level/store',
        body,
        query: {
            ...filters,
            ...query
        }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const many = async (ids: string, body: any, filters: any = {}) => {
    const handle = callEndpoint({
        route: '/api/private/level/many',
        params: { ids },
        body,
        query: {
            ...filters,
            ...query
        }
    });
    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const update = async (id: string, body: any, filters: any = {}) => {
    const handle = callEndpoint({
        route: '/api/private/level/update',
        body,
        query: {
            ...filters,
            ...query
        },
        params: { id }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const destroy = async (id: string, filters: any = {}) => {
    const handle = callEndpoint({
        route: '/api/private/level/destroy',
        params: { id },
        query: {
            ...filters,
            ...query
        }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const trash = async (filters?: any) => {
    const handle = callEndpoint({
        route: '/api/private/level/trash',
        query: {
            ...filters,
            include: { logs }
        }
    });

    return handleReq({
        ...handle
    });
};

export const restore = async (id: string, filters: any = {}) => {
    const handle = callEndpoint({
        route: '/api/private/level/restore',
        query: {
            ...filters,
            ...query
        },
        params: { id }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};
