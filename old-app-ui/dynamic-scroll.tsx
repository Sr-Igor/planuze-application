import React, { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { ScrollArea } from '@/registry/new-york-v4/ui/scroll-area';

interface DynamicScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollArea> {
    height?: number;
    containerClassName?: string;
}

export const DynamicScrollArea = React.forwardRef<React.ElementRef<typeof ScrollArea>, DynamicScrollAreaProps>(
    ({ children, className, containerClassName, height, ...props }, ref) => {
        const [h, setH] = useState(typeof window === 'undefined' ? 0 : window.innerHeight);

        useEffect(() => {
            const onResize = () => setH(window.innerHeight);
            window.addEventListener('resize', onResize);

            return () => window.removeEventListener('resize', onResize);
        }, []);

        const containerRef = useRef<HTMLDivElement>(null);

        return (
            <div
                ref={containerRef}
                className={cn('relative', containerClassName)}
                style={{ height: `${height}px`, maxHeight: `${h - 300}px` }}>
                <ScrollArea ref={ref} className={cn('h-full', className)} {...props}>
                    {children}
                </ScrollArea>
            </div>
        );
    }
);

DynamicScrollArea.displayName = 'DynamicScrollArea';
