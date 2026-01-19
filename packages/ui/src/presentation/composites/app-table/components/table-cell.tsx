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
import { BaseTableItem, TableCellProps, TableColumn } from "../types";
import { formatCellValue, getNestedValue } from "../utils/helpers";
import { TableTooltip } from "./table-tooltip";

/**
 * Convert a dimension value to CSS string
 */
const toCssDimension = (value: number | string): string =>
  typeof value === "number" ? `${value}px` : value;

/**
 * Calculate cell styles based on column configuration
 */
const getCellStyles = <T extends BaseTableItem>(column: TableColumn<T>): CSSProperties => {
  const hasCustomDimensions = column.width || column.minWidth || column.maxWidth;

  if (!hasCustomDimensions) {
    return { flex: "1", minWidth: "120px" };
  }

  const styles: CSSProperties = { flex: "none" };

  if (column.width) {
    styles.width = toCssDimension(column.width);
  }
  if (column.minWidth) {
    styles.minWidth = toCssDimension(column.minWidth);
  }
  if (column.maxWidth) {
    styles.maxWidth = toCssDimension(column.maxWidth);
  }

  return styles;
};

function TableCellComponent<T extends BaseTableItem>({
  item,
  column,
  isLoading,
  value,
}: Readonly<TableCellProps<T>>) {
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
      style={getCellStyles(column)}
    >
      <div className={cellClassName}>{renderContent(cellClassName)}</div>
    </TableCell>
  );
}

export const AppTableCell = memo(TableCellComponent) as typeof TableCellComponent;
