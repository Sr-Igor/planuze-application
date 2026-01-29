"use client";

import { useState } from "react";

import { cn } from "@repo/ui";

import { ISelectedTag, ITagsOption, ITagsProps } from "../../../../shared/types/tags.types";
import { useTags } from "../../../hooks/tags";
import { ActionButtons, SelectedTags, TagEditor } from "../../base/tags";

export function Tags<T>({
  cacheKey,
  formatter,
  request,
  queryParams,
  searchParam = "search",
  limit,
  formatterOptions,
  value,
  onChange,
  disabled,
  className,
}: React.PropsWithChildren<ITagsProps<T> & { className?: string }>) {
  const [overflowOpen, setOverflowOpen] = useState(false);

  const {
    containerRef,
    editing,
    setEditing,
    searchTerm,
    setSearchTerm,
    items,
    index,
    handleScroll,
    isDebouncing,
  } = useTags({
    cacheKey,
    formatter,
    request,
    queryParams,
    searchParam,
    limit,
    value,
  });

  const handleRemoveTag = (itemToRemove: ISelectedTag) => {
    onChange?.(
      value?.filter((i) => i.title.toLowerCase() !== itemToRemove.title.toLowerCase()) ?? []
    );
  };

  const handleAddTag = (title: string) => {
    onChange?.(value?.concat({ title }) ?? []);
  };

  const handleSelectItem = (item: ITagsOption<T>) => {
    const itemSelected = value?.find((i) => i.title.toLowerCase() === item.label.toLowerCase());
    if (itemSelected) return;
    onChange?.([...(value ?? []), { title: item.label }]);
  };

  const handleStartEditing = () => {
    setEditing(true);
    setOverflowOpen(false);
  };

  const handleOverflowOpen = () => {
    setOverflowOpen(true);
    setEditing(false);
  };

  const handleOverflowClose = () => {
    setOverflowOpen(false);
  };

  const dataLength = index.data?.pages.flatMap((page) => page.data).length ?? 0;

  return (
    <div
      ref={containerRef}
      id="input-tags-container"
      className={cn("flex items-center gap-2", className)}
    >
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
          isDebouncing={isDebouncing}
          dataLength={dataLength}
          isFetchingNextPage={index.isFetchingNextPage}
          onScroll={handleScroll}
          formatterOptions={formatterOptions}
          value={value}
        />
      )}
    </div>
  );
}
