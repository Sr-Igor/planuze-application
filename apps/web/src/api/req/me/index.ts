//Utils
import { callEndpoint } from '@/api/generator';
import { handleReq } from '@/api/handle';

export const show = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/me/show',
        params: { id }
    });

    return handleReq({
        ...handle,
        hideError: true
    });
};
