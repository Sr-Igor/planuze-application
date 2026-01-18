/**
 * TableHeader Component
 *
 * @module presentation/composites/app-table/components
 */

"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { CSSProperties, memo, useCallback } from "react";

import { cn } from "../../../../shared/utils";
import { Button } from "../../../primitives/button";
import { Checkbox } from "../../../primitives/checkbox";
import { TableHead, TableHeader, TableRow } from "../../../primitives/table";
import { BaseTableItem, TableHeaderProps } from "../types";

function TableHeaderComponent<T extends BaseTableItem>({
  columns,
  selectable,
  onSelectAll,
  allSelected,
  someSelected,
  onSort,
  currentSort,
  labels,
}: TableHeaderProps<T>) {
  const selectAllLabel = labels?.selectAll ?? "Select all";
  const actionsLabel = labels?.actions ?? "Actions";

  const handleSort = useCallback(
    (columnAccessor: string) => {
      onSort(columnAccessor as never);
    },
    [onSort]
  );

  const getSortIcon = (columnAccessor: string) => {
    const isColumnSorted = currentSort.orderKey === columnAccessor;
    const isAsc = currentSort.orderValue === "asc";
    const isDesc = currentSort.orderValue === "desc";

    return (
      <div className="flex flex-col items-center justify-center">
        <ChevronUp
          size={10}
          strokeWidth={2}
          className={cn("mb-[-2px]", isAsc && isColumnSorted && "text-green-500")}
        />
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={cn("mt-[-2px]", isDesc && isColumnSorted && "text-red-500")}
        />
      </div>
    );
  };

  const getCellStyles = (column: typeof columns[0]): CSSProperties => {
    const styles: CSSProperties = {};

    if (!column.width && !column.minWidth && !column.maxWidth) {
      styles.flex = "1";
      styles.minWidth = "120px";
    } else {
      styles.flex = "none";

      if (column.width) {
        styles.width = typeof column.width === "number" ? `${column.width}px` : column.width;
      }

      if (column.minWidth) {
        styles.minWidth =
          typeof column.minWidth === "number" ? `${column.minWidth}px` : column.minWidth;
        if (!column.width) {
          styles.width = styles.minWidth;
        }
      }

      if (column.maxWidth) {
        styles.maxWidth =
          typeof column.maxWidth === "number" ? `${column.maxWidth}px` : column.maxWidth;
      }
    }

    return styles;
  };

  return (
    <TableHeader>
      <TableRow>
        {selectable && (
          <TableHead
            className={cn(
              "bg-background group-hover:bg-muted/50 border-border/50 sticky left-0 z-20 w-12 border-b px-2"
            )}
            style={{ flex: "none", width: "48px", minWidth: 48 }}
          >
            <div className="flex items-center justify-center">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => onSelectAll(!!checked)}
                aria-label={selectAllLabel}
                className="border-2 border-gray-500"
              />
            </div>
          </TableHead>
        )}

        {columns.map((column) => {
          const isSortable = column.sortable;

          return (
            <TableHead
              key={String(column.accessor)}
              className={cn(
                "text-foreground/80 font-semibold",
                "border-border/50 h-12 border-b",
                column.headerClassName,
                column.sticky &&
                  `sticky ${column.sticky === "left" ? "left-0" : "right-0"} bg-muted/50 z-20`,
                column.centered && "text-center"
              )}
              style={getCellStyles(column)}
            >
              <div
                className={cn(
                  "flex h-full w-full items-center",
                  column.centered ? "justify-center" : "justify-start"
                )}
              >
                {isSortable ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-auto p-0 font-semibold hover:bg-transparent",
                      "flex items-center gap-2",
                      column.centered ? "justify-center" : "justify-start"
                    )}
                    onClick={() => handleSort(column.accessor as string)}
                  >
                    <span className="truncate first-letter:uppercase">{column.title}</span>
                    <div className="flex flex-col">{getSortIcon(column.accessor as string)}</div>
                  </Button>
                ) : (
                  <span className="truncate first-letter:uppercase">{column.title}</span>
                )}
              </div>
            </TableHead>
          );
        })}

        <TableHead
          className={cn(
            "bg-background group-hover:bg-muted/50 border-border/50 sticky right-0 z-20 w-12 border-b px-2"
          )}
          style={{ flex: "none", width: "80px", minWidth: 80 }}
        >
          <div className="flex items-center justify-center">
            <span className="font-semibold first-letter:uppercase">{actionsLabel}</span>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export const AppTableHeader = memo(TableHeaderComponent) as typeof TableHeaderComponent;
