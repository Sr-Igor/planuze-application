'use client';

import * as React from 'react';
import { useMemo } from 'react';

import { useRouter } from 'next/navigation';

import { module } from '@/api/generator/types';
import { useAccess } from '@/hooks/access';
import { ModuleWithFeatures } from '@/hooks/access/types';
import { getModule } from '@/hooks/cookies/module';
import { useLang } from '@/hooks/language';
import { useNextRouter } from '@/hooks/next-router';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/registry/new-york-v4/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/registry/new-york-v4/ui/sidebar';
import { set } from '@/store/modules/module/actions';

import { AppTooltip } from './app-tooltip';
import { Icon } from './icon';
import { ChevronsUpDown, LockKeyhole } from 'lucide-react';

export function ModuleSwitcher() {
    const { isMobile } = useSidebar();
    const t = useLang();

    const { profile, module: currentModule, companyView, access, verifyAccess } = useAccess();

    const route = useRouter();

    const dispatch = useAppDispatch();

    const moduleIdCookie = getModule();
    const { all: allModules, moduleId: moduleIdStore } = useAppSelector((state) => state.module);
    const currentModuleId = moduleIdCookie || moduleIdStore;

    const nextRouter = useNextRouter();

    const activeModule: module | undefined = useMemo(() => {
        return allModules.find((m: module) => m.id === currentModule?.id);
    }, [allModules, currentModule]);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2'>
                            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                                <Icon name={activeModule?.icon} className='size-4 shrink-0' />
                            </div>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-medium'>
                                    {profile?.company?.name || t.helper('no_company')}
                                </span>{' '}
                                {activeModule?.title && (
                                    <span className='truncate font-medium'>{t.module(activeModule.title)}</span>
                                )}
                            </div>
                            <ChevronsUpDown className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-68 rounded-lg'
                        align='start'
                        side={isMobile ? 'bottom' : 'right'}
                        sideOffset={4}>
                        <DropdownMenuLabel className='text-muted-foreground text-xs'>
                            {t.module('modules')}
                        </DropdownMenuLabel>
                        {allModules.map((module: module) => {
                            const companyPermissions: ModuleWithFeatures | undefined = companyView?.[module.id];
                            const modulePermissions: ModuleWithFeatures | undefined = access?.[module.id];
                            const isContracted: boolean = !!companyPermissions;
                            const hasEffectiveAccess: boolean =
                                isContracted && (modulePermissions?.features.length > 0 || module.basic);
                            const { ok, moduleId } = verifyAccess('subscription', 'index');

                            if ((!isContracted && !ok) || !hasEffectiveAccess || module.integration) {
                                return null;
                            }

                            return (
                                <DropdownMenuItem
                                    key={module.id}
                                    className={cn(
                                        'flex cursor-pointer justify-between gap-2 p-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
                                        currentModule?.id === module.id ? 'bg-muted' : '',
                                        !hasEffectiveAccess && 'bg-muted-foreground/15'
                                    )}
                                    onClick={() => {
                                        if (hasEffectiveAccess && currentModuleId !== module.id) {
                                            nextRouter(module.id);
                                        } else if (!isContracted && ok) {
                                            dispatch(set({ moduleId }));
                                            route.push('/subscription?tab=plans');
                                        }
                                    }}>
                                    <span
                                        className={cn(
                                            'flex items-center gap-2 truncate text-sm leading-tight font-medium',
                                            !hasEffectiveAccess && 'text-muted-foreground'
                                        )}>
                                        <div className='flex items-center justify-center'>
                                            <Icon
                                                name={module.icon || 'Circle'}
                                                className={cn(currentModule?.id === module.id ? 'text-green-600' : '')}
                                            />
                                        </div>
                                        {t.module(module.title)}
                                    </span>

                                    {!isContracted && (
                                        <AppTooltip text={t.navBar('message.upgrade')}>
                                            <p className='flex items-center gap-1 rounded-full bg-blue-200 px-2 py-1 text-xs font-semibold text-blue-600'>
                                                {t.helper('upgrade')}
                                            </p>
                                        </AppTooltip>
                                    )}

                                    {isContracted && !hasEffectiveAccess && (
                                        <AppTooltip text={t.navBar('message.locked')}>
                                            <p className='flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold'>
                                                <LockKeyhole className='size-4' />
                                            </p>
                                        </AppTooltip>
                                    )}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
