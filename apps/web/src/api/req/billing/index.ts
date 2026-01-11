//Utils
import { callEndpoint } from '@/api/generator';
import { handleReq } from '@/api/handle';

export const checkout = async (price_id: string) => {
    const handle = callEndpoint({
        route: '/api/private/billing/checkout',
        params: { price_id }
    });

    return handleReq({
        ...handle
    });
};

export const test = async (test: string) => {
    const handle = callEndpoint({
        route: '/api/private/billing/test',
        params: { test }
    });

    return handleReq({
        ...handle
    });
};
