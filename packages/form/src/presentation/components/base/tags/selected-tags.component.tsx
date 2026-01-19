'use client';

import { X } from 'lucide-react';

import { AppTooltip } from '@repo/ui';

import { ISelectedTag } from '#/shared/types/tags.types';
import { OverflowButton } from './overflow-button.component';

interface SelectedTagsProps {
    selected: ISelectedTag[];
    onRemove: (item: ISelectedTag) => void;
    onOverflowOpen: () => void;
    onOverflowClose: () => void;
    overflowOpen: boolean;
}

export function SelectedTags({
    selected,
    onRemove,
    onOverflowOpen,
    onOverflowClose,
    overflowOpen,
}: React.PropsWithChildren<SelectedTagsProps>) {
    const maxVisibleTags = 5;
    const visibleTags = selected.slice(0, maxVisibleTags);
    const hiddenTags = selected.slice(maxVisibleTags);

    return (
        <>
            {visibleTags.map((item, idx) => (
                <div
                    className="bg-secondary text-foreground line-clamp-1 flex max-w-[80px] items-center justify-between gap-2 truncate rounded-md px-2 py-1 text-[11px] font-semibold"
                    key={`${item.title}-${idx}`}
                >
                    <AppTooltip text={item.title} className="line-clamp-1 truncate">
                        <p className="line-clamp-1 truncate">{item.title}</p>
                    </AppTooltip>

                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemove(item);
                        }}
                        aria-label={`Remove ${item.title}`}
                    >
                        <X size={13} className="text-muted-foreground" />
                    </button>
                </div>
            ))}

            {hiddenTags.length > 0 && (
                <OverflowButton
                    hiddenTags={hiddenTags}
                    onRemove={onRemove}
                    onOpen={onOverflowOpen}
                    onClose={onOverflowClose}
                    open={overflowOpen}
                />
            )}
        </>
    );
}
