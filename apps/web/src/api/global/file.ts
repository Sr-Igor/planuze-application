import { getModule } from '@/hooks/cookies/module';
import { getProfile } from '@/hooks/cookies/profile';
import { getToken } from '@/hooks/cookies/token';
import { store } from '@/store';
import { fingerprint } from '@/utils/fingerprint';

export async function getFile(url: string) {
    try {
        const token = getToken();
        const profileId = getProfile() || (store.getState() as any).module.profileId;
        const moduleId = getModule() || (store.getState() as any).module.moduleId;
        const device = await fingerprint();
        if (!device) return null;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'x-device': device,
                'x-profile': profileId ?? '',
                'x-module': moduleId ?? ''
            }
        });

        if (!response.ok) return null;

        const blob = await response.blob();

        return blob;
    } catch {
        return null;
    }
}
