'use client';

import { memo } from 'react';

import { cn } from '@repo/ui-new';

interface CardPlaceholderProps {
    className?: string;
    visible?: boolean;
}

const CardPlaceholderComponent = ({ className, visible = true }: CardPlaceholderProps) => {
    return (
        <div className={cn('relative z-2 h-2 w-full bg-transparent', className)}>
            <div className='pointer-events-none absolute h-[150px] w-full'>
                <div
                    className={cn(
                        'h-[2px] w-full bg-blue-500',
                        'mt-1 transition-all duration-200 ease-in-out',
                        !visible && 'opacity-0'
                    )}
                />
            </div>
        </div>
    );
};

export const CardPlaceholder = memo(CardPlaceholderComponent, (prevProps, nextProps) => {
    return prevProps.visible === nextProps.visible && prevProps.className === nextProps.className;
});
