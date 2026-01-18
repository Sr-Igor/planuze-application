'use client';

import { memo } from 'react';

import { PopoverContentInModal, cn } from '@repo/ui';

interface SelectContentProps {
    children: React.ReactNode;
    className?: string;
}

export const SelectContent = memo(({ children, className = '' }: SelectContentProps) => {
    const modalClassName = 'max-h-80 w-[var(--radix-popover-trigger-width)] min-w-60 p-0';

    return <PopoverContentInModal className={cn(modalClassName, className)}>{children}</PopoverContentInModal>;
});

SelectContent.displayName = 'SelectContent';
