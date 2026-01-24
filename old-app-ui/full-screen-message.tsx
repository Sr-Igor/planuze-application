import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const containerStyle = cn(
    'flex h-screen w-full flex-col items-center justify-center gap-5',
    'text-center text-lg font-semibold text-gray-500'
);

interface FullScreenMessageProps {
    icon: ReactNode;
    title: string;
    description: string;
    actions: ReactNode;
}

export const FullScreenMessage = ({ icon, title, description, actions }: FullScreenMessageProps) => {
    return (
        <div className={containerStyle}>
            {icon}
            <div className='flex flex-col'>
                <h1 className='mb-4 text-3xl font-semibold'>{title}</h1>
                <p>{description}</p>
            </div>
            <div className='flex flex-col items-center gap-2'>{actions}</div>
        </div>
    );
};
