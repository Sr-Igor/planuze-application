import Cookies from '@/hooks/cookies';

export interface IUserInfos {
    confirm: boolean;
    welcome: boolean;
    plans: boolean;
}

export const getUser = (): IUserInfos => {
    return JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_USER_LOCAL!) || '{}');
};

export const setUser = async (data: IUserInfos) => {
    Cookies.set(process.env.NEXT_PUBLIC_USER_LOCAL!, JSON.stringify(data));
};
