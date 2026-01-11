import { getModule } from '@/hooks/cookies/module';
import { getProfile } from '@/hooks/cookies/profile';
import { getToken } from '@/hooks/cookies/token';
import { getTwoAuth } from '@/hooks/cookies/two_auth';
import { store } from '@/store';
import { fingerprint } from '@/utils/fingerprint';

import axios from 'axios';
import { toast } from 'sonner';

//Variables
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use(
    async (config) => {
        const token = getToken();
        const mdl = getModule() || (store.getState() as any).module.moduleId;
        const profile = getProfile() || (store.getState() as any).module.profileId;
        const twoAuth = getTwoAuth();
        const locale = window.location.pathname.split('/')[1]?.split('-')[0] || 'pt';

        const visitorId = await fingerprint();

        if (visitorId) config.headers['x-device'] = visitorId;

        config.timeout = 240000;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        if (mdl) config.headers['x-module'] = mdl;
        if (profile) config.headers['x-profile'] = profile;
        if (twoAuth) config.headers['x-code'] = twoAuth;
        config.headers['Accept-Language'] = locale;

        return config;
    },
    (error) => {
        toast.error('Erro ao se conectar com o servidor');
        throw new Error(error);
    }
);

export default api;
