"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useLang } from "@repo/language/hooks";
import { cn, Table, TableBody } from "@repo/ui";

import {
  AppTableColgroup,
  AppTableEmptyState,
  AppTableHeader,
  AppTableLoadingSkeleton,
  AppTablePagination,
  AppTableRow,
} from "./components";
import { TableProvider } from "./context/table-context";
import { useTableState } from "./hooks";
import { useWindowWidth } from "./hooks/use-table-width";
import { BaseTableItem, TableProps } from "./types/index";
import { getTableVariantClasses } from "./utils/helpers";

function TableComponent<T extends BaseTableItem>({
  data,
  columns,
  filters,
  state = {},
  loading = false,
  selectable = false,
  expandable = false,
  actions = [],
  events,
  emptyMessage,
  loadingMessage,
  className,
  size = "md",
  variant = "default",
  disabledCheckbox,
  height,
  ...props
}: TableProps<T>) {
  const t = useLang();
  const windowWidth = useWindowWidth();
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  const handleHeaderScroll = useCallback(() => {
    if (headerScrollRef.current && bodyScrollRef.current) {
      bodyScrollRef.current.scrollLeft = headerScrollRef.current.scrollLeft;
    }
  }, []);

  const handleBodyScroll = useCallback(() => {
    if (headerScrollRef.current && bodyScrollRef.current) {
      headerScrollRef.current.scrollLeft = bodyScrollRef.current.scrollLeft;
    }
  }, []);

  // Calcular largura do scrollbar para compensar no header
  useEffect(() => {
    if (height && bodyScrollRef.current) {
      const element = bodyScrollRef.current;
      const calculatedScrollbarWidth = element.offsetWidth - element.clientWidth;
      setScrollbarWidth(calculatedScrollbarWidth);
    }
  }, [height, data]);

  const filteredColumns = useMemo(() => {
    return columns.filter((col) => !col.breakpoint || windowWidth >= col.breakpoint);
  }, [columns, windowWidth]);

  const tableState = useTableState({
    data,
    columns: filteredColumns,
    filters,
    state,
    loading,
    selectable,
    expandable,
    actions,
    events,
    emptyMessage,
    loadingMessage,
    className,
    size,
    variant,
    disabledCheckbox,
    ...props,
  });

  const variantClasses = useMemo(() => getTableVariantClasses(variant, size), [variant, size]);

  const contextValue = useMemo(
    () => ({
      data: tableState.data,
      columns: tableState.columns,
      filters: tableState.filters,
      state: {
        selectedItems: tableState.selectedItems,
        loadingItems: state.loadingItems || [],
        expandedItems: state.expandedItems || [],
      },
      actions: tableState.actions,
      events,
      loading: tableState.loading,
      config: {
        selectable: tableState.selectable,
        expandable: expandable,
        size,
        variant,
      },
    }),
    [tableState, state.loadingItems, state.expandedItems, events, expandable, size, variant]
  );

  const renderTableContent = () => {
    if (loading) {
      const rows = tableState.data?.length || tableState.filters.limit;

      return (
        <AppTableLoadingSkeleton
          columns={tableState.columns}
          rows={rows}
          selectable={tableState.selectable}
          hasActions={tableState.hasActions}
        />
      );
    }

    return (
      <TableBody>
        {tableState.data.map((item, index) => (
          <AppTableRow
            key={item.id}
            item={item}
            index={index}
            columns={tableState.columns}
            isSelected={tableState.isItemSelected(item.id)}
            isLoading={tableState.isItemLoading(item.id)}
            isExpanded={tableState.isItemExpanded(item.id)}
            selectable={tableState.selectable}
            expandable={expandable}
            onToggleSelect={tableState.toggleItemSelection}
            onRowClick={tableState.handleRowClick}
            onRowDoubleClick={tableState.handleRowDoubleClick}
            onToggleExpand={tableState.handleExpandRow}
            actions={tableState.actions}
            disabledCheckbox={disabledCheckbox}
          />
        ))}
      </TableBody>
    );
  };

  const maxBodyHeight = useMemo(() => {
    if (!height) return undefined;
    return typeof height === "number" ? `${height}px` : height;
  }, [height]);

  if (height) {
    return (
      <TableProvider value={contextValue}>
        <div
          className={cn(
            "bg-background w-full rounded-lg border shadow-sm",
            "flex flex-col overflow-hidden",
            className
          )}
        >
          <div
            ref={headerScrollRef}
            className="relative overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
            onScroll={handleHeaderScroll}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingRight: scrollbarWidth > 0 ? `${scrollbarWidth}px` : undefined,
            }}
          >
            <Table className={cn("min-w-full table-fixed", variantClasses.table)}>
              <AppTableColgroup
                columns={tableState.columns}
                selectable={tableState.selectable}
                hasActions={tableState.hasActions}
              />
              <AppTableHeader
                columns={tableState.columns}
                selectable={tableState.selectable}
                onSelectAll={tableState.toggleAllSelection}
                allSelected={tableState.allVisibleSelected}
                someSelected={tableState.someVisibleSelected}
                onSort={tableState.handleColumnSort}
                currentSort={{
                  orderKey: tableState.filters.orderKey,
                  orderValue: tableState.filters.orderValue,
                }}
              />
            </Table>
          </div>

          <div
            ref={bodyScrollRef}
            className="table-body-scroll-container relative overflow-auto"
            onScroll={handleBodyScroll}
            style={{
              maxHeight: maxBodyHeight,
            }}
          >
            {tableState.isEmpty ? (
              <AppTableEmptyState message={emptyMessage || t.helper("empty_data")} />
            ) : (
              <Table className={cn("min-w-full table-fixed", variantClasses.table)}>
                <AppTableColgroup
                  columns={tableState.columns}
                  selectable={tableState.selectable}
                  hasActions={tableState.hasActions}
                />
                {renderTableContent()}
              </Table>
            )}
          </div>

          <AppTablePagination
            pagination={tableState.filters}
            loading={tableState.loading}
            onPageChange={tableState.handlePageChange}
            onLimitChange={tableState.handleLimitChange}
          />
        </div>
      </TableProvider>
    );
  }

  return (
    <TableProvider value={contextValue}>
      <div
        className={cn(
          "bg-background w-full rounded-lg border shadow-sm",
          "flex flex-col overflow-hidden",
          className
        )}
      >
        <div className="relative flex-1 overflow-x-auto">
          <Table className={cn("min-w-full table-fixed", variantClasses.table)}>
            <AppTableHeader
              columns={tableState.columns}
              selectable={tableState.selectable}
              onSelectAll={tableState.toggleAllSelection}
              allSelected={tableState.allVisibleSelected}
              someSelected={tableState.someVisibleSelected}
              onSort={tableState.handleColumnSort}
              currentSort={{
                orderKey: tableState.filters.orderKey,
                orderValue: tableState.filters.orderValue,
              }}
            />
            {renderTableContent()}
          </Table>
          {tableState.isEmpty && (
            <AppTableEmptyState message={emptyMessage || t.helper("empty_data")} />
          )}
        </div>

        <AppTablePagination
          pagination={tableState.filters}
          loading={tableState.loading}
          onPageChange={tableState.handlePageChange}
          onLimitChange={tableState.handleLimitChange}
        />
      </div>
    </TableProvider>
  );
}

export const AppTable = memo(TableComponent) as typeof TableComponent;
