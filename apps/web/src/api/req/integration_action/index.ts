//Utils
import { callEndpoint } from '@/api/generator';
import { handleReq } from '@/api/handle';

export const update = async (id: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/integration_action/update',
        body,
        params: { id },
        query: {
            include: {
                action: true,
                feature: true
            }
        }
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};
