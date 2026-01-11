export const Image = () => {
    return (
        <section className='container mx-auto px-4 py-12'>
            <div className='bg-muted/50 relative mx-auto max-w-6xl overflow-hidden rounded-2xl border shadow-2xl'>
                <div className='aspect-video w-full'>
                    <img
                        src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop'
                        alt='Planuze Dashboard'
                        className='h-full w-full object-cover'
                    />
                </div>
            </div>
        </section>
    );
};
