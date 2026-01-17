'use client';

import { useCompany } from '@repo/api/web/callers/company';
import { useAccess } from '@/hooks/access';
import { ShowTemplate } from '@/templates/show';

import { useTabs } from './use-tabs';

export default function Page() {
    const { profile } = useAccess();
    const id = profile?.company_id || '';

    return (
        <ShowTemplate
            useTabs={useTabs}
            path='company'
            hookReq={useCompany}
            id={id}
            defaultTab='data'
            undeletableProps={() => ({ title: '' })}
        />
    );
}
