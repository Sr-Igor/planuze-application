"use client";

import React, { memo, useCallback } from "react";

import { Ban } from "lucide-react";

import { Checkbox, cn, TableCell, TableRow } from "@repo/ui";

import { BaseTableItem, TableRowProps } from "../types/index";
import { generateTableId } from "../utils/helpers";
import { AppTableActions } from "./table-actions";
import { AppTableCell } from "./table-cell";

function TableRowComponent<T extends BaseTableItem>({
  item,
  index,
  columns,
  isSelected,
  isLoading,
  isExpanded,
  selectable,
  expandable,
  onToggleSelect,
  onRowClick,
  onRowDoubleClick,
  onToggleExpand,
  actions = [],
  useLang,
  disabledCheckbox,
}: TableRowProps<T> & { actions?: any[] }) {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Não propagar o clique se foi em um botão/checkbox
      if ((e.target as HTMLElement).closest('button, [role="checkbox"]')) {
        return;
      }
      onRowClick?.(item);
    },
    [item, onRowClick]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onRowDoubleClick?.(item);
    },
    [item, onRowDoubleClick]
  );

  const handleToggleSelect = useCallback(
    (checked: boolean) => {
      onToggleSelect(item.id, checked);
    },
    [item.id, onToggleSelect]
  );

  const rowId = generateTableId("table-row", item.id, index);
  const disabled = disabledCheckbox?.(item);

  return (
    <TableRow
      id={rowId}
      className={cn(
        "group transition-none",
        "hover:bg-muted data-[state=selected]:bg-muted",
        isSelected && "bg-muted/30",
        isLoading && "opacity-75",
        (onRowClick || onRowDoubleClick) && "cursor-pointer",
        "border-border/50 border-b"
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      data-state={isSelected ? "selected" : undefined}
      data-loading={isLoading}
      data-expanded={isExpanded}
      role="row"
      aria-selected={isSelected}
    >
      {selectable && (
        <TableCell
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className={cn(
            "sticky left-0 z-10 w-12 px-2",
            "bg-background",
            "group-hover:bg-muted",
            isSelected && "bg-muted/30"
          )}
          style={{ flex: "none", width: "48px", minWidth: 48 }}
        >
          <div className="relative flex items-center justify-center">
            {disabled && <Ban className="absolute h-4 w-4 text-gray-500" />}

            <Checkbox
              checked={isSelected}
              onCheckedChange={handleToggleSelect}
              disabled={isLoading || disabled}
              className={cn("border-2 border-gray-500", disabled && "opacity-0!")}
              aria-label={`Selecionar item ${item.id}`}
            />
          </div>
        </TableCell>
      )}

      {columns.map((column) => (
        <AppTableCell
          key={column.accessor}
          item={item}
          column={column}
          isLoading={isLoading}
          value={undefined}
        />
      ))}

      {/* Coluna de ações sempre visível */}
      <TableCell
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDoubleClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className={cn(
          "sticky right-0 z-10 w-12 px-2",
          "bg-background",
          "group-hover:bg-muted",
          isSelected && "bg-muted/30"
        )}
        style={{ flex: "none", width: "80px", minWidth: 80 }}
      >
        <div className="flex items-center justify-center">
          <AppTableActions item={item} actions={actions} isLoading={isLoading}/>
        </div>
      </TableCell>
    </TableRow>
  );
}

export const AppTableRow = memo(TableRowComponent) as typeof TableRowComponent;
