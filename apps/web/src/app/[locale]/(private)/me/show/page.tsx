'use client';

import { useMe } from '@/api/callers/me';
import { useAuth } from '@/hooks/auth';
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
