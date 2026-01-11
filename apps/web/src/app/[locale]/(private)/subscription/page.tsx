'use client';

import { ShowTemplate } from '@/templates/show';

import { useTabs } from './use-tabs';

export default function SubscriptionPage() {
    return <ShowTemplate path='subscription' defaultTab='current' useTabs={useTabs} pageKey={null} />;
}
