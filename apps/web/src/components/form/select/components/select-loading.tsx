import { memo } from 'react';

import { Loader2, LoaderCircle } from 'lucide-react';

interface SelectLoadingProps {
    size?: number;
    className?: string;
    useLoaderCircle?: boolean;
    text?: string;
}

export const SelectLoading = memo(
    ({ size = 20, className = '', useLoaderCircle = false, text }: SelectLoadingProps) => {
        const Icon = useLoaderCircle ? LoaderCircle : Loader2;

        return (
            <div className={`flex min-h-10 w-full items-center justify-center p-4 ${className}`}>
                <Icon className='animate-spin' size={size} />
                {text && <span className='text-muted-foreground ml-2 text-sm'>{text}</span>}
            </div>
        );
    }
);
