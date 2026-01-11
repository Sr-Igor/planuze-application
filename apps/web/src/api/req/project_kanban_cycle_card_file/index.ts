//Utils
import { callEndpoint } from '@/api/generator';
import { Prisma } from '@/api/generator/prisma-types';
import { handleReq } from '@/api/handle';
import { logs } from '@/utils/includeLogs';
import { setFormData } from '@/utils/submitForm/formData';

const query: Record<'include', Prisma.project_kanban_cycle_card_fileInclude> = {
    include: {
        logs
    }
};
export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_card_file/store',
        body,
        query
    });

    return handleReq({
        ...handle,
        body: setFormData(body, ['file']),
        showSuccess: false,
        hideError: true,
        config: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    });
};

export const update = async (id: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_card_file/update',
        params: { id },
        body,
        query
    });

    return handleReq({
        ...handle,
        body,
        showSuccess: false,
        hideError: true
    });
};

export const destroy = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/project_kanban_cycle_card_file/destroy',
        params: { id },
        query
    });

    return handleReq({
        ...handle,
        showSuccess: false
    });
};
