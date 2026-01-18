import { cn } from '@repo/ui';

import { Loader2 } from 'lucide-react';

export interface LoaderProps {
    loading?: boolean;
    isCharging?: boolean;
}

export const Loader = ({ loading, isCharging }: LoaderProps) => {
    return (
        <>
            {(loading || isCharging) && (
                <div
                    className={cn(
                        'bg-background/60 absolute inset-0 z-2 flex h-full w-full items-center justify-center',
                        isCharging && 'bg-sidebar/100'
                    )}>
                    <Loader2 size={40} className='animate-spin' />
                </div>
            )}
        </>
    );
};
