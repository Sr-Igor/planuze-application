//Utils
import { callEndpoint } from '@/api/generator';
import { handleReq } from '@/api/handle';

export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/private/notification_subscription/store',
        body
    });

    return handleReq(handle);
};

export const key = async () => {
    const handle = callEndpoint({
        route: '/api/private/notification_subscription/key'
    });

    return handleReq(handle);
};
