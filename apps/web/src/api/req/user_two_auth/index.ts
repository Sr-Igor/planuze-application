//Utils
import { callEndpoint } from '@/api/generator';
import { handleReq } from '@/api/handle';

export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/private/user_two_auth/store',
        body
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const update = async (id: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/user_two_auth/update',
        params: { id },
        body
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};

export const destroy = async (id: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/user_two_auth/destroy',
        params: { id },
        body
    });

    return handleReq({
        ...handle,
        body,
        showSuccess: true
    });
};

export const resend = async (id: string) => {
    const handle = callEndpoint({
        route: '/api/private/user_two_auth/resend',
        params: { id }
    });

    return handleReq({
        ...handle,
        showError: true,
        showSuccess: true
    });
};

export const confirm = async (id: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/user_two_auth/confirm',
        params: { id },
        body
    });

    return handleReq({
        ...handle,
        showSuccess: true
    });
};
