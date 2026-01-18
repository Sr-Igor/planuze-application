'use client';

import { LoaderCircle, PackageOpen } from 'lucide-react';

import { useLang } from '@repo/language/hooks';
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@repo/ui';

import { ITagsOption } from '#/shared/types/tags.types';

interface CommandListProps<T> {
    items: ITagsOption<T>[];
    onSelectItem: (item: ITagsOption<T>) => void;
    isLoading: boolean;
    isDebouncing: boolean;
    dataLength: number;
    isFetchingNextPage: boolean;
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    formatterOptions?: (item: T) => React.ReactNode;
}

export function CommandListComponent<T>({
    items,
    onSelectItem,
    isLoading,
    isDebouncing,
    dataLength,
    isFetchingNextPage,
    onScroll,
    formatterOptions,
}: React.PropsWithChildren<CommandListProps<T>>) {
    const t = useLang();

    return (
        <CommandList
            className="max-h-64 overflow-auto"
            onWheel={(e) => {
                e.stopPropagation();
            }}
            onScroll={onScroll}
        >
            {(isLoading || isDebouncing) && items.length === 0 && (
                <span className="flex w-full items-center justify-center p-4">
                    <LoaderCircle className="animate-spin" size={20} />
                </span>
            )}

            {!isLoading && !isDebouncing && dataLength === 0 && (
                <CommandEmpty className="text-muted-foreground flex flex-col items-center justify-center gap-2 p-6 text-xs font-semibold">
                    <PackageOpen size={22} />
                    <span className="text-[10px]">{t.helper('no_results')}</span>
                </CommandEmpty>
            )}

            <CommandGroup>
                {items.map((item) => (
                    <CommandItem
                        key={`${item.value}-${item.label}`}
                        value={item.value}
                        onSelect={() => onSelectItem(item)}
                    >
                        {formatterOptions?.(item.item) || item.label}
                    </CommandItem>
                ))}

                {isFetchingNextPage && (
                    <div className="flex items-center justify-center p-2">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        <span className="text-muted-foreground ml-2 text-sm">{t.helper('loading_more')}</span>
                    </div>
                )}
            </CommandGroup>
        </CommandList>
    );
}
