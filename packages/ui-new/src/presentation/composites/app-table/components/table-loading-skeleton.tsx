/**
 * TableLoadingSkeleton Component
 *
 * @module presentation/composites/app-table/components
 */

"use client";

import { CSSProperties, memo } from "react";

import { cn } from "../../../../shared/utils";
import { Skeleton } from "../../../primitives/skeleton";
import { TableBody, TableCell, TableRow } from "../../../primitives/table";
import { BaseTableItem, TableColumn, TableLoadingSkeletonProps } from "../types";

function TableLoadingSkeletonComponent<T extends BaseTableItem>({
  columns,
  rows = 5,
  selectable = false,
  hasActions = false,
}: TableLoadingSkeletonProps<T>) {
  const getCellStyles = (column: TableColumn<T>): CSSProperties => {
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
      }

      if (column.maxWidth) {
        styles.maxWidth =
          typeof column.maxWidth === "number" ? `${column.maxWidth}px` : column.maxWidth;
      }
    }

    return styles;
  };

  return (
    <TableBody>
      {Array.from({ length: rows }, (_, index) => (
        <TableRow
          key={`skeleton-row-${index}`}
          className={cn("group transition-none", "animate-pulse", "border-border/50 border-b")}
        >
          {selectable && (
            <TableCell
              className="bg-background sticky left-0 z-10 w-12 px-2"
              style={{ flex: "none", width: "48px", minWidth: 48 }}
            >
              <div className="flex items-center justify-center">
                <Skeleton className="h-4 w-4 rounded" />
              </div>
            </TableCell>
          )}

          {columns.map((column) => (
            <TableCell key={String(column.accessor)} style={getCellStyles(column)}>
              <div
                className={`flex items-center ${
                  column.centered ? "justify-center" : "justify-start"
                }`}
              >
                <Skeleton className="h-4 w-full max-w-[120px] rounded" />
              </div>
            </TableCell>
          ))}

          {hasActions && (
            <TableCell
              className="bg-background sticky right-0 z-10 w-12 px-2"
              style={{ flex: "none", width: "80px", minWidth: 80 }}
            >
              <div className="flex items-center justify-center">
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  );
}

export const AppTableLoadingSkeleton = memo(
  TableLoadingSkeletonComponent
) as typeof TableLoadingSkeletonComponent;
