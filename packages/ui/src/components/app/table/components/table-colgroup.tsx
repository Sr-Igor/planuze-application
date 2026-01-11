"use client";

import React, { memo } from "react";

import { BaseTableItem, TableColumn } from "../types/index";

interface TableColgroupProps<T extends BaseTableItem> {
  columns: TableColumn<T>[];
  selectable: boolean;
  hasActions: boolean;
}

function TableColgroupComponent<T extends BaseTableItem>({
  columns,
  selectable,
  hasActions,
}: TableColgroupProps<T>) {
  const getCellStyles = (column: TableColumn<T>) => {
    const styles: React.CSSProperties = {};

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
        <col key={column.accessor} style={getCellStyles(column)} />
      ))}
      {hasActions && <col style={{ width: "80px", minWidth: 80 }} />}
    </colgroup>
  );
}

export const AppTableColgroup = memo(TableColgroupComponent) as typeof TableColgroupComponent;
