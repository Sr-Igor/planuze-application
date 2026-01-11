import { useState } from 'react';

import { ActionButtons } from './components/action-buttons';
import { SelectedTags } from './components/selected-tags';
import { TagEditor } from './components/tag-editor';
import { useTags } from './hooks/use-tags';
import { IOption, ITagsProps } from './types';

export function Tags<T>({
    cacheKey,
    formatter,
    request,
    queryParams,
    searchParam = 'search',
    limit,
    formatterOptions,
    value,
    onChange,
    disabled
}: ITagsProps<T>) {
    const [overflowOpen, setOverflowOpen] = useState(false);

    const { containerRef, editing, setEditing, searchTerm, setSearchTerm, items, index, handleScroll } = useTags({
        cacheKey,
        formatter,
        request,
        queryParams,
        searchParam,
        limit,
        value
    });

    const handleRemoveTag = (itemToRemove: { title: string }) => {
        onChange?.(value?.filter((i) => i.title.toLowerCase() !== itemToRemove.title.toLowerCase()) ?? []);
    };

    const handleAddTag = (title: string) => {
        onChange?.(value?.concat({ title }) ?? []);
    };

    const handleSelectItem = (item: IOption<T>) => {
        const itemSelected = value?.find((i) => i.title.toLowerCase() === item.label.toLowerCase());
        if (itemSelected) return;
        onChange?.([...(value ?? []), { title: item.label }]);
    };

    const handleStartEditing = () => {
        setEditing(true);
        setOverflowOpen(false); // Fechar overflow quando abrir editor
    };

    const handleOverflowOpen = () => {
        setOverflowOpen(true);
        setEditing(false); // Fechar editor quando abrir overflow
    };

    const handleOverflowClose = () => {
        setOverflowOpen(false);
    };

    return (
        <div ref={containerRef} id='input-tags-container' className='flex items-center gap-2'>
            <SelectedTags
                selected={value ?? []}
                onRemove={handleRemoveTag}
                onOverflowOpen={handleOverflowOpen}
                onOverflowClose={handleOverflowClose}
                overflowOpen={overflowOpen}
            />

            {!disabled && (
                <ActionButtons
                    editing={editing}
                    selectedLength={value?.length ?? 0}
                    onStartEditing={handleStartEditing}
                />
            )}

            {editing && (
                <TagEditor
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onAddTag={handleAddTag}
                    items={items}
                    onSelectItem={handleSelectItem}
                    isLoading={index.isLoading}
                    isDebouncing={searchTerm !== searchTerm}
                    dataLength={index.data?.pages.flatMap((page) => page.data).length ?? 0}
                    isFetchingNextPage={index.isFetchingNextPage}
                    onScroll={handleScroll}
                    formatterOptions={formatterOptions}
                    value={value}
                />
            )}
        </div>
    );
}

// Re-export types
export type { IOption, ISelected, ITagsProps } from './types';
