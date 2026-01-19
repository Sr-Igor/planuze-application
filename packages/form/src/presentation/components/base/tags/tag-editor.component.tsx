'use client';

import { Popover, PopoverContentInModal, PopoverTrigger, Command, cn } from '@repo/ui';

import { ITagsOption, ISelectedTag } from '../../../../shared/types/tags.types';
import { CommandListComponent } from './command-list.component';
import { TagInput } from './tag-input.component';

interface TagEditorProps<T> {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onAddTag: (title: string) => void;
    items: ITagsOption<T>[];
    onSelectItem: (item: ITagsOption<T>) => void;
    isLoading: boolean;
    isDebouncing: boolean;
    dataLength: number;
    isFetchingNextPage: boolean;
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    formatterOptions?: (item: T) => React.ReactNode;
    value?: ISelectedTag[];
}

export function TagEditor<T>({
    searchTerm,
    onSearchChange,
    onAddTag,
    items,
    onSelectItem,
    isLoading,
    isDebouncing,
    dataLength,
    isFetchingNextPage,
    onScroll,
    formatterOptions,
    value,
}: React.PropsWithChildren<TagEditorProps<T>>) {
    return (
        <Command shouldFilter={false} className="max-w-[140px]">
            <Popover open={true}>
                <PopoverTrigger className="bg-secondary p-0">
                    <TagInput
                        searchTerm={searchTerm}
                        onSearchChange={onSearchChange}
                        onAddTag={onAddTag}
                        selected={value ?? []}
                    />
                </PopoverTrigger>
                <PopoverContentInModal className={cn('max-h-80 w-[var(--radix-popover-trigger-width)] p-0')}>
                    <CommandListComponent
                        items={items}
                        onSelectItem={onSelectItem}
                        isLoading={isLoading}
                        isDebouncing={isDebouncing}
                        dataLength={dataLength}
                        isFetchingNextPage={isFetchingNextPage}
                        onScroll={onScroll}
                        formatterOptions={formatterOptions}
                    />
                </PopoverContentInModal>
            </Popover>
        </Command>
    );
}
