export const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='from-primary/5 to-background/90 animate-gradient-shift min-h-screen bg-gradient-to-b'>
            {children}
        </div>
    );
};
