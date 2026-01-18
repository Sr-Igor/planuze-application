import { cn } from '@repo/ui';

export const styles = {
    title: cn(
        'hover:border-foreground text-lg! font-bold border-none rounded-none mx-2 disabled:opacity-100! outline-none cursor-default'
    ),
    foreground: cn(
        'hover:border-foreground/50 bg-transparent border-muted-foreground/20 border-3 data-[disabled=true]:border-transparent w-60'
    ),
    planning: cn(
        'hover:border-foreground/50 bg-transparent border-sidebar border-3 disabled:opacity-100! outline-none cursor-default data-[disabled=true]:border-transparent'
    )
};
