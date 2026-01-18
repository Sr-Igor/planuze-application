/**
 * TableColgroup Component
 *
 * @module presentation/composites/app-table/components
 */

"use client";

import { CSSProperties, memo } from "react";

import { BaseTableItem, TableColgroupProps, TableColumn } from "../types";

function TableColgroupComponent<T extends BaseTableItem>({
  columns,
  selectable,
  hasActions,
}: TableColgroupProps<T>) {
  const getCellStyles = (column: TableColumn<T>): CSSProperties => {
    const styles: CSSProperties = {};

    if (!column.width && !column.minWidth && !column.maxWidth) {
      styles.width = "auto";
    } else {
      if (column.width) {
        styles.width = typeof column.width === "number" ? `${column.width}px` : column.width;
      } else if (column.minWidth) {
        styles.width =
          typeof column.minWidth === "number" ? `${column.minWidth}px` : column.minWidth;
      }
    }

    return styles;
  };

  return (
    <colgroup>
      {selectable && <col style={{ width: "48px", minWidth: 48 }} />}
      {columns.map((column) => (
        <col key={String(column.accessor)} style={getCellStyles(column)} />
      ))}
      {hasActions && <col style={{ width: "80px", minWidth: 80 }} />}
    </colgroup>
  );
}

export const AppTableColgroup = memo(TableColgroupComponent) as typeof TableColgroupComponent;
