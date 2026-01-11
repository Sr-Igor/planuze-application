//Utils
import { callEndpoint } from '@/api/generator';
import { handleReq } from '@/api/handle';
import { setFormData } from '@/utils/submitForm/formData';

export const store = async (body: any) => {
    const handle = callEndpoint({
        route: '/api/public/user/store',
        body
    });

    return handleReq(handle);
};

export const update = async (id: string, body: any) => {
    const handle = callEndpoint({
        route: '/api/private/user/update',
        params: { id },
        body
    });

    return handleReq({
        ...handle,
        body: setFormData(body, ['avatar']),
        showSuccess: true,
        config: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    });
};
