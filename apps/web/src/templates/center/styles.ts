import { cn } from '@repo/ui-new';

export const container = cn('flex min-h-screen w-full flex-col items-center justify-start gap-y-8 p-4 md:p-8');

export const header = cn('flex flex-col items-center justify-center min-h-[200px]');

export const contentWrapper = cn(
    'flex w-full max-w-md flex-col items-center justify-center md:bg-sidebar/20 rounded-lg md:border-2 border-border md:shadow-lg dark:shadow-white/10 light:shadow-black/10 py-10 mt-5 md:px-2'
);
