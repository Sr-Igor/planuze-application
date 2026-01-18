'use client';

import { useLang } from '@repo/language/hooks';

import { cn } from '@repo/ui';

export interface PlaceholderProps {
    className?: string;
    placeholder?: string;
}

export const Placeholder = ({ className, placeholder }: PlaceholderProps) => {
    const t = useLang();

    return (
        <div
            className={cn(
                'h-fill text-muted-foreground pointer-events-none absolute top-0 left-0 h-full w-full cursor-pointer! px-2.5 py-2.5',
                className
            )}
        >
            {placeholder || t.editor('placeholder')}
        </div>
    );
};
