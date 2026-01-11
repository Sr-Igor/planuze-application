//Utils
import api from '@/api';
//Hooks
import { useSignOut } from '@/hooks/cookies/signout';

//Types
import { AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

const genericError = 'Connection Error';
const internalServerError = 'Internal Server Error';
class CustomError extends Error {
    public data: any;

    constructor(message: string, data: any, internal?: boolean) {
        super(message);
        this.data = data;
        this.cause = internal ? 'internal' : undefined;
    }
}
const methods = {
    POST: api.post,
    GET: api.get,
    PUT: api.put,
    DELETE: api.delete
};

type HandleApiRequestParams = {
    url: string;
    body?: object;
    successMessage?: string;
    showSuccess?: boolean;
    method: keyof typeof methods;
    config?: AxiosRequestConfig;
    hideError?: boolean;
    showError?: boolean;
};

export const handleReq = async ({
    url,
    body,
    method,
    successMessage,
    config,
    showSuccess,
    hideError,
    showError
}: HandleApiRequestParams) => {
    //DEBUG TIMER
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const isGetMethod = method === 'GET';
    if (isGetMethod && body) throw new Error('Body is not allowed in get method');

    const isFormData = config?.headers?.['Content-Type'] === 'multipart/form-data';

    const parsedBody = !isFormData
        ? Object.fromEntries(
              Object.entries(body || {}).map(([key, value]) => [key, value === undefined ? null : value])
          )
        : body;

    const response = await methods[method](url, parsedBody, config)
        .then((res) => {
            const isPartial = res?.data?.code === 'partial_many';

            showSuccess &&
                (res.data.message || successMessage) &&
                (!isPartial
                    ? toast.success(res.data.message || successMessage)
                    : toast.warning(res.data.message || successMessage));
            const data = res?.data?.data;

            return data;
        })
        .catch((err) => {
            const res = err?.response?.data;
            const status = err?.response?.status;

            if (status === 401) {
                const { out } = useSignOut(true);

                return out();
            }

            if (status === 422 && !window.location.pathname.includes('/config/two_auth')) {
                //Two-Auth Error
                window.location.href = '/config/two_auth';
                return;
            }

            const errorMessage = res?.error || genericError;
            const isGenericError = errorMessage === genericError;
            const isInternalServerError = errorMessage === internalServerError;

            ((!isGetMethod && !isGenericError && !hideError) || showError) &&
                toast.error(errorMessage, { duration: isGenericError ? 500 : 6000 });

            throw new CustomError(
                res?.error,
                {
                    ...res,
                    status: status || 400,
                    code: res?.code || (isGenericError ? 'connection_error' : 'internal_server_error'),
                    method,
                    connectionError: !!isGenericError
                },
                isInternalServerError
            );
        });

    return response;
};
