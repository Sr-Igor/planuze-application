'use client';

//React && Hooks
import { useEffect, useMemo } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useAuth } from '@/api/callers/auth';
import { useAuth as userAuth } from '@/hooks/auth';
import { useModal } from '@/hooks/modal';
import { useAppDispatch } from '@/hooks/redux';
import { set as setModule } from '@/store/modules/module/actions';
import { create } from '@/store/modules/user/actions';
import { LoaderTemplate } from '@/templates/loader';

export default function HidratePage() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const callback = useSearchParams().get('callbackUrl');
    const moduleId = useSearchParams().get('moduleId');
    const profileId = useSearchParams().get('profileId');
    const openProfileModal = useSearchParams().get('openProfileModal');

    const { profile } = userAuth();

    const { setModal } = useModal();

    const inConfig = useMemo(() => {
        return !!profile?.company?.in_config;
    }, [profile]);

    const { hidrate } = useAuth({ enableHidrate: true });
    const user = hidrate?.data;
    const activeProfiles = user?.profiles?.filter((p: any) => p.active) || [];

    useEffect(() => {
        if (moduleId && profileId) dispatch(setModule({ profileId, moduleId }));
    }, [moduleId, profileId]);

    useEffect(() => {
        if (user) dispatch(create(user));
    }, [hidrate.data]);

    useEffect(() => {
        if (openProfileModal && activeProfiles?.length > 1) setModal({ profile: true });
    }, [openProfileModal, activeProfiles]);

    useEffect(() => {
        if (!inConfig && user) route.replace(callback || '/dashboard');
    }, [inConfig, user]);

    return <LoaderTemplate inConfig={inConfig} />;
}
