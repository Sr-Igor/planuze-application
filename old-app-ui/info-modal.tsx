import type { ReactNode } from 'react';

interface InfoModalLayoutProps {
    icon: ReactNode;
    title: ReactNode;
    description: ReactNode;
}

export const InfoModalLayout = ({ icon, title, description }: InfoModalLayoutProps) => {
    return (
        <div className='flex flex-col items-center justify-center gap-4 p-5 text-center'>
            <div className='scale-125'>{icon}</div>
            <h2 className='text-muted-foreground text-2xl font-semibold'>{title}</h2>
            <p className='text-muted-foreground text-sm font-semibold'>{description}</p>
        </div>
    );
};
