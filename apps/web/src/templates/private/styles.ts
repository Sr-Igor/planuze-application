import { cn } from '@repo/ui';

export const main = cn('relative w-full overflow-hidden');

export const content = cn('mt-[68px] h-[calc(100vh-68px)] overflow-auto px-5', 'relative');

export const forbidden = cn(
    'flex h-full flex-col items-center justify-center gap-5',
    'text-center text-lg font-semibold text-gray-500'
);
