/**
 * TableCell Component
 *
 * @module presentation/composites/app-table/components
 */

"use client";

import { CSSProperties, memo } from "react";

import { cn } from "../../../../shared/utils";
import { Skeleton } from "../../../primitives/skeleton";
import { TableCell } from "../../../primitives/table";
import { BaseTableItem, TableCellProps } from "../types";
import { formatCellValue, getNestedValue } from "../utils/helpers";
import { TableTooltip } from "./table-tooltip";

function TableCellComponent<T extends BaseTableItem>({
  item,
  column,
  isLoading,
  value,
}: TableCellProps<T>) {
  const cellValue = value ?? getNestedValue(item, column.accessor as string);

  const renderContent = (cellClassName: string) => {
    const formattedValue = formatCellValue(cellValue);

    if (isLoading) {
      return (
        <div className="relative w-full">
          <Skeleton className="absolute z-10 h-full w-full" />
          <span className="opacity-0" aria-hidden="true">
            {formattedValue}
          </span>
        </div>
      );
    }

    if (column.customRender) {
      return column.customRender(item, isLoading, cellClassName);
    }

    if (column.formatValue) {
      return column.formatValue(item);
    }

    return <TableTooltip text={formattedValue}>{formattedValue}</TableTooltip>;
  };

  const getCellStyles = (): CSSProperties => {
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

  const cellClassName = cn(
    "flex items-center overflow-hidden text-ellipsis whitespace-nowrap",
    column.centered ? "justify-center" : "justify-start"
  );

  return (
    <TableCell
      className={cn(
        "transition-colors",
        column.cellClassName,
        column.sticky &&
          `sticky ${column.sticky === "left" ? "left-0" : "right-0"} bg-background z-10`
      )}
      style={getCellStyles()}
    >
      <div className={cellClassName}>{renderContent(cellClassName)}</div>
    </TableCell>
  );
}

export const AppTableCell = memo(TableCellComponent) as typeof TableCellComponent;
