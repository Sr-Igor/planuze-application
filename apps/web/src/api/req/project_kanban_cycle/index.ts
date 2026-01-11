//Utils
import { callEndpoint } from '@/api/generator';
import { Prisma } from '@/api/generator/prisma-types';
import { handleReq } from '@/api/handle';
import { logs } from '@/utils/includeLogs';

const query: Record<'include', Prisma.project_kanban_cycleInclude> = {
    include: {
        logs,
        work_type: true,
        project_version: true,
        project_kanban_cycle_columns: {
            include: {
                logs,
                project_kanban_cycle_cards: {
                    include: {
                        project_kanban_cycle_cards: {
                            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
                        },
                        project_kanban_cycle: {
                            select: {
                                title: true
                            }
                        },
                        project_kanban_cycle_card_type: {
                            select: {
                                id: true,
                                color: true,
                                icon: true,
                                title: true,
                                principal: true,
                                problem: true
                            }
                        },
                        project_kanban_cycle_card_tags: true,
                        work_type: true,
                        profile: {
                            select: {
                                id: true,
                                user: {
                                    select: {
                                        name: true,
                                        avatar: true
                                    }
                                }
                            }
                        }
                    },
                    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
                }
            },
            orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
        }
    }
};

// export const index = async (filters: any) => {
//     const handle = callEndpoint({
//         route: '/api/private/project_kanban_cycle/index',
//         query: {
//             ...filters,
//             ...query
//         }
//     });

//     return handleReq({
//         ...handle
//     });
// };

export const show = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle/show',
        params: { id },
        query
    });

    return handleReq({
        ...handle,
        hideError: true
    });
};

export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle/store',
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
        route: '/api/private/project_kanban_cycle/update',
        body,
        query,
        params: { id }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const destroy = async (id: string, qs: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle/destroy',
        params: { id },
        query: {
            ...query,
            ...qs
        }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const many = async (ids: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle/many',
        params: { ids },
        body
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const trash = async (filters?: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle/trash',
        query: { ...filters, ...query }
    });

    return handleReq({
        ...handle
    });
};

export const restore = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle/restore',
        query,
        params: { id }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};
