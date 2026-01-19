"use client";

import { useEffect, useState } from "react";

import { useLang } from "@repo/language/hooks";
import { Input } from "@repo/ui";
import {
  AppTable,
  type TableAction,
  type TableColumn,
  TableEventHandlers,
  type TableFilters,
} from "@repo/ui";

import { useDebounce } from "@repo/hooks";
import { cn } from "@repo/ui";

import * as styles from "./styles";

export interface ListTemplateProps<T extends { id: string }> {
  searchLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  headerLeft?: React.ReactNode;
  titlePage: React.ReactNode;
  rootClassName?: string;
  table: {
    data?: T[];
    columns: TableColumn<T>[];
    filters: TableFilters;
    actions?: TableAction<T>[];
    loading?: boolean;
    loadingLines?: string[];
    selected?: string[];
    // setSelected?: (selects: string[]) => void;
    // onClickRow?: (item: T) => void;
    // handleEvent: (newFilter: Record<string, any>) => void;
    disabledCheckbox?: (item: T) => boolean;
    events: TableEventHandlers<T>;
  };
  search?: {
    value: string;
    onValueChange: (value?: string) => void;
    placeholder?: string;
  };
}

export function ListTemplate<T extends { id: string }>({
  table,
  headerRight,
  headerLeft,
  search,
  titlePage,
  searchLeft,
  rootClassName,
}: ListTemplateProps<T>) {
  const [inputValue, setInputValue] = useState(search?.value ?? "");
  const debouncedValue = useDebounce(inputValue, 500);
  const isDebouncing = inputValue !== debouncedValue;
  const t = useLang();

  useEffect(() => {
    search?.onValueChange(debouncedValue || undefined);
  }, [debouncedValue]);

  useEffect(() => {
    if (search && search.value !== inputValue) {
      setInputValue(search.value);
    }
  }, [search?.value]);

  return (
    <div className={cn(styles.container, rootClassName)}>
      {titlePage}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          {searchLeft}
          {search && (
            <Input
              placeholder={search.placeholder || t.helper("search") + "..."}
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          )}
          {headerLeft}
        </div>
        <div>{headerRight}</div>
      </div>
      <AppTable
        data={table.data || []}
        columns={table.columns}
        filters={table.filters}
        actions={table.actions || []}
        loading={table.loading || isDebouncing}
        selectable={Boolean(table?.events?.onSelectionChange)}
        state={{
          selectedItems: table.selected || [],
          loadingItems: table.loadingLines || [],
          expandedItems: [],
        }}
        events={table.events}
        disabledCheckbox={table.disabledCheckbox}
      />
    </div>
  );
}
