import Cookies from '@/hooks/cookies';

export const getToken = () => {
    const local_token = Cookies.get(process.env.NEXT_PUBLIC_TOKEN_LOCAL!);

    return local_token;
};

export const setToken = async (token: string) => {
    token && Cookies.set(process.env.NEXT_PUBLIC_TOKEN_LOCAL!, token);
};
