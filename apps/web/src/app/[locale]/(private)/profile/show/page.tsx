'use client';

import { useProfile } from '@repo/api/web/callers/profile';
import { ShowTemplate } from '@/templates/show';

import { useTabs } from './use-tabs';

export default function Page() {
    return (
        <ShowTemplate
            useTabs={useTabs}
            path='profile'
            hookReq={useProfile}
            defaultTab='data'
            baseUrl='/profile'
            undeletableProps={(data, profile, translate) => {
                if (!data) {
                    return {
                        title: translate('show.alert.no_data.title'),
                        description: translate('show.alert.no_data.description'),
                        icon: 'AlertCircleIcon',
                        className: 'text-red-500'
                    };
                } else if (data?.anonymous) {
                    return {
                        title: translate('show.alert.anonymous.title'),
                        description: translate('show.alert.anonymous.description'),
                        icon: 'AlertCircleIcon',
                        className: 'text-red-500'
                    };
                } else if (data?.owner) {
                    return {
                        title: translate('show.alert.owner.title'),
                        description: translate('show.alert.owner.description'),
                        icon: 'AlertCircleIcon',
                        className: 'text-red-500'
                    };
                } else if (data?.id === profile?.id) {
                    return {
                        title: translate('show.alert.yourself.title'),
                        description: translate('show.alert.yourself.description'),
                        icon: 'AlertCircleIcon',
                        className: 'text-orange-500'
                    };
                }
            }}
        />
    );
}
