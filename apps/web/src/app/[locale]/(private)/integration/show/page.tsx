'use client';

import { useIntegration } from '@/api/callers/integration';
import { integration } from '@/api/generator/types';
import { ShowTemplate } from '@/templates/show';

import { useTabs } from './use-tabs';

export default function Page() {
    return (
        <ShowTemplate<integration>
            useTabs={useTabs}
            path='integration'
            hookReq={useIntegration}
            defaultTab='data'
            baseUrl='/integration'
        />
    );
}
