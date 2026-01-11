export interface InfosProps {
    children: React.ReactNode;
}

export const Infos = ({ children }: InfosProps) => {
    return (
        <div className='bg-secondary/50 flex h-28 min-w-0 items-center justify-between gap-4 overflow-x-auto overflow-y-hidden'>
            {children}
        </div>
    );
};

export const Line = ({ children }: InfosProps) => {
    return <div className='grid grid-cols-1 grid-rows-2 gap-2 text-sm'>{children}</div>;
};
