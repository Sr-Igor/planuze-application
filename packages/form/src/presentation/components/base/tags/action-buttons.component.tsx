'use client';

import { Plus } from 'lucide-react';

import { useLang } from '@repo/language/hook';

interface ActionButtonsProps {
    editing: boolean;
    selectedLength: number;
    onStartEditing: () => void;
}

export function ActionButtons({ editing, selectedLength, onStartEditing }: React.PropsWithChildren<ActionButtonsProps>) {
    const t = useLang();
    if (editing) return null;

    if (selectedLength === 0) {
        return (
            <button
                type="button"
                onClick={onStartEditing}
                className="text-foreground bg-secondary hover:bg-secondary/80 cursor-pointer rounded-md px-2 py-1 text-[11px] font-semibold"
                aria-label={t.helper('new_tag')}
            >
                {t.helper('new_tag')}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={onStartEditing}
            className="text-foreground bg-secondary hover:bg-secondary/80 flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1.5 text-[11px] font-semibold"
            aria-label={t.helper('add_tag')}
        >
            <Plus size={13} />
        </button>
    );
}
