export const EDITOR_SETTINGS = {
    BLUR_DELAY: 150,
    FOCUS_DELAY: 100,
    TABLE_DEFAULTS: {
        rows: 3,
        cols: 3,
        withHeaderRow: true
    }
} as const;

export const EDITOR_CLASSES = {
    BASE: 'min-h-[156px] border rounded-md py-2 px-3 focus:outline-none',
    DISABLED: 'border-transparent',
    MENU_BAR: {
        BASE: 'bg-background z-50 mb-1 flex flex-wrap items-center gap-1 rounded-md border p-2',
        HIDDEN: 'pointer-events-none mt-[-100px] opacity-0',
        TRANSITION: 'transition-all duration-300 ease-in-out'
    }
} as const;
