'use client';

//React && Hooks
import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import keys from '@/api/cache/keys';
import { profile } from '@/api/generator/types';
import { useAuth } from '@/hooks/auth';
import { getProfile } from '@/hooks/cookies/profile';
import { getToken } from '@/hooks/cookies/token';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { set as setModule } from '@/store/modules/module/actions';
import { update as updateSocket } from '@/store/modules/socket/actions';
import { update as updateUser } from '@/store/modules/user/actions';
import { fingerprint } from '@/utils/fingerprint';
import { useQueryClient } from '@tanstack/react-query';

import io from 'socket.io-client';

//Global
const URL = process.env.NEXT_PUBLIC_API_URL;

export const socket = io(URL, {
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 500
});

export const Provider = () => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();
    const { activeSubscription, user } = useAuth();
    const token = getToken();
    const router = useRouter();
    const { all } = useAppSelector((state) => state.module);

    useEffect(() => {
        actions();

        return clear;
    }, [user?.id]);

    const actions = async () => {
        if (!user) return;
        socket.auth = { ...socket.auth, token };
        socket.connect();

        socket.on('connect', async () => {
            dispatch(updateSocket({ connected: true, loading: false }));
            const currentDeviceId = await fingerprint();
            socket.emit('client', { id: user.id, device_id: currentDeviceId });
        });

        socket.on('disconnect', () => {
            dispatch(updateSocket({ connected: false, loading: false }));
        });

        socket.on('server', () => {});

        //Emits
        socket.on('user_hidrate', async (data, device_id) => {
            if (device_id) {
                const currentDeviceId = await fingerprint();
                if (currentDeviceId !== device_id) return;
            }

            const profileId = getProfile();
            const wasExcluded = !data.profiles.some((p: profile) => p.id === profileId);

            if (wasExcluded) {
                const firstProfile = data.profiles[0];
                const personalModule = all.find((m) => m.title === 'personal');
                if (personalModule?.id && firstProfile?.id) {
                    dispatch(setModule({ profileId: firstProfile?.id, moduleId: personalModule?.id }));
                    setTimeout(() => {
                        dispatch(updateUser(data));
                        router.push(`/dashboard`);
                    }, 500);
                }
            } else {
                dispatch(updateUser(data));
                const activeProfile = data?.profiles?.find((p: profile) => p.id === profileId)?.active;

                if (activeSubscription && activeProfile) {
                    queryClient.refetchQueries({ queryKey: keys.chat.category() });
                    queryClient.refetchQueries({ queryKey: keys.subscription.index() });
                }
            }
        });

        socket.on('invalidate_plans', async () => {
            queryClient.refetchQueries({ queryKey: keys.plan.index() });
        });

        socket.on('new_invite', async () => {
            queryClient.refetchQueries({ queryKey: keys.invite.me() });
        });

        socket.on('notification', async () => {
            queryClient.refetchQueries({ queryKey: keys.notification.index() });
        });

        socket.on('project_kanban_cycle', async (data) => {
            const currentRoute = window.location.pathname;
            const isProjectKanban = currentRoute.includes('/project_kanban/show/');

            if (!isProjectKanban) return;

            const projectKanbanId = currentRoute.split('/')?.pop()?.split('?')[0];

            if (!projectKanbanId || projectKanbanId !== data.project_kanban_id) return;

            if (data.cycle_id || data.column)
                data.cycle_id?.map((cycleId: string) =>
                    queryClient.refetchQueries({ queryKey: keys.project_kanban_cycle.show(cycleId) })
                );

            if (data.card_type) queryClient.refetchQueries({ queryKey: keys.project_kanban_cycle_card_type.index({}) });

            if (data.cycle) queryClient.refetchQueries({ queryKey: keys.project_kanban.show(data.project_kanban_id) });

            if (data.allocation)
                queryClient.refetchQueries({ queryKey: keys.project_kanban_cycle_allocation.index({}) });

            if (data.member) queryClient.refetchQueries({ queryKey: keys.project_member.index({}) });

            if (data.objective) queryClient.refetchQueries({ queryKey: keys.project_kanban_objective.index({}) });

            if (data.target) queryClient.refetchQueries({ queryKey: keys.project_kanban_objective_target.index({}) });

            if (data.version) queryClient.refetchQueries({ queryKey: keys.project_version.index({}) });
        });
    };

    const clear = () => {
        socket.removeAllListeners();
        socket.disconnect();
    };

    return null;
};
