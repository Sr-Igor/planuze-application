'use client';

import React, { memo, useCallback, useState } from 'react';

import { useLang } from '@/hooks/language';
import { cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/registry/new-york-v4/ui/alert-dialog';
import { Button } from '@/registry/new-york-v4/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/registry/new-york-v4/ui/dropdown-menu';

import { BaseTableItem, TableActionsProps } from '../types/index';
import { Loader2, MoreHorizontal } from 'lucide-react';

function TableActionsComponent<T extends BaseTableItem>({ item, actions, isLoading }: TableActionsProps<T>) {
    const t = useLang();
    const [openAlert, setOpenAlert] = useState<string | null>(null);
    const [executingAction, setExecutingAction] = useState<string | null>(null);

    const visibleActions = actions.filter((action) => {
        if (action.isVisible) {
            return action.isVisible(item);
        }
        return true;
    });

    const handleActionClick = useCallback(
        async (
            actionLabel: string,
            preOnClick: () => Promise<void> | void,
            actionFn: () => Promise<void> | void,
            confirmText?: string
        ) => {
            if (confirmText) {
                preOnClick?.();
                setOpenAlert(actionLabel);
                return;
            }

            setExecutingAction(actionLabel);
            try {
                await actionFn();
            } catch (error) {
                console.error('Error while executing action:', error);
            } finally {
                setExecutingAction(null);
            }
        },
        []
    );

    const handleConfirmAction = useCallback(async (actionLabel: string, actionFn: () => Promise<void> | void) => {
        setOpenAlert(null);
        setExecutingAction(actionLabel);
        try {
            await actionFn();
        } catch (error) {
            console.error('Error while executing action:', error);
        } finally {
            setExecutingAction(null);
        }
    }, []);

    if (visibleActions.length === 0) {
        return (
            <div className='flex h-8 w-8 items-center justify-center'>
                <span className='text-muted-foreground text-xs'>-</span>
            </div>
        );
    }

    const isActionDisabled = (actionLabel: string) => {
        return isLoading || executingAction === actionLabel;
    };

    const getActionIcon = (actionLabel: string, icon?: React.ReactNode) => {
        if (executingAction === actionLabel) {
            return <Loader2 size={14} className='animate-spin' />;
        }
        return icon;
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='ghost'
                        size='sm'
                        className='h-8 w-8 p-0'
                        disabled={isLoading || executingAction !== null}>
                        <MoreHorizontal size={14} />
                        <span className='sr-only'>{t.helper('open_menu')}</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-48'>
                    <DropdownMenuGroup>
                        {visibleActions.map((action, index) => {
                            const isDisabled = action.isDisabled?.(item) || isActionDisabled(action.label);

                            return (
                                <React.Fragment key={action.label}>
                                    {action.separatorTop && <DropdownMenuSeparator />}

                                    <DropdownMenuItem
                                        className={cn('cursor-pointer gap-2')}
                                        variant={action.variant}
                                        disabled={isDisabled}
                                        onClick={() =>
                                            handleActionClick(
                                                action.label,
                                                () => action?.preOnClick?.(item),
                                                () => action.onClick(item),
                                                action.confirmText
                                            )
                                        }>
                                        {getActionIcon(action.label, action.icon)}
                                        <span className='flex-1'>{action.label}</span>
                                    </DropdownMenuItem>

                                    {action.separatorBottom && <DropdownMenuSeparator />}
                                </React.Fragment>
                            );
                        })}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {openAlert && (
                <AlertDialog open={true} onOpenChange={() => setOpenAlert(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{t.helper('confirm_action')}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {actions.find((a) => a.label === openAlert)?.confirmText}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setOpenAlert(null)}>
                                {t.helper('cancel')}
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    const action = actions.find((a) => a.label === openAlert);
                                    if (action) {
                                        handleConfirmAction(action.label, () => action.onClick(item));
                                    }
                                }}
                                className={cn(
                                    actions.find((a) => a.label === openAlert)?.variant === 'destructive' &&
                                        'bg-destructive hover:bg-destructive/90 text-white'
                                )}>
                                {t.helper('confirm')}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}

export const AppTableActions = memo(TableActionsComponent) as typeof TableActionsComponent;
