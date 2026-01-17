'use client';

import { useAuth } from '@repo/redux/hook';
import { ShowTemplate } from '@/templates/show';

import { useTabs } from './use-tabs';

export default function Page() {
    const { user } = useAuth();

    return (
        <ShowTemplate
            useTabs={useTabs}
            path='my_profile'
            id={user?.id}
            defaultTab='data'
            undeletableProps={() => ({ title: '' })}
        />
    );
}
