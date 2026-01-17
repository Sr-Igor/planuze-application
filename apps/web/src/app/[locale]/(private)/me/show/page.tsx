'use client';

import { useMe } from '@repo/api/web/callers/me';
import { useAuth } from '@repo/redux/hook';
import { ShowTemplate } from '@/templates/show';

import { useTabs } from './use-tabs';

export default function Page() {
    const { profile } = useAuth();

    return (
        <ShowTemplate
            useTabs={useTabs}
            path='me'
            id={profile?.id}
            hookReq={useMe}
            defaultTab='data'
            baseUrl='/me'
            undeletableProps={() => {
                return { title: '' };
            }}
        />
    );
}
