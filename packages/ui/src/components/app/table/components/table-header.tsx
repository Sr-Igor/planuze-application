"use client";

import React, { memo, useCallback } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, Checkbox, cn, TableHead, TableHeader, TableRow } from "@repo/ui";

import { BaseTableItem, TableHeaderProps } from "../types/index";

function TableHeaderComponent<T extends BaseTableItem>({
  columns,
  selectable,
  onSelectAll,
  allSelected,
  someSelected,
  onSort,
  currentSort,
}: TableHeaderProps<T>) {
  const t = useLang();

  const handleSort = useCallback(
    (columnAccessor: string) => {
      onSort(columnAccessor as any);
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
                aria-label={t.helper("select_all")}
                className="border-2 border-gray-500"
              />
            </div>
          </TableHead>
        )}

        {columns.map((column) => {
          const isSortable = column.sortable;

          const getCellStyles = () => {
            const styles: React.CSSProperties = {};

            // Por padrão, todas as colunas têm flex: 1 para distribuição igual
            if (!column.width && !column.minWidth && !column.maxWidth) {
              styles.flex = "1";
              styles.minWidth = "120px"; // Largura mínima para legibilidade
            } else {
              // Quando largura específica é definida, desabilita flex
              styles.flex = "none";

              if (column.width) {
                styles.width =
                  typeof column.width === "number" ? `${column.width}px` : column.width;
              }

              if (column.minWidth) {
                styles.minWidth =
                  typeof column.minWidth === "number" ? `${column.minWidth}px` : column.minWidth;
                // Se não houver width, aplica width igual ao minWidth
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
            <TableHead
              key={column.accessor}
              className={cn(
                "text-foreground/80 font-semibold",
                "border-border/50 h-12 border-b",
                column.headerClassName,
                column.sticky &&
                  `sticky ${column.sticky === "left" ? "left-0" : "right-0"} bg-muted/50 z-20`,
                column.centered && "text-center"
              )}
              style={getCellStyles()}
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
                    onClick={() => handleSort(column.accessor)}
                  >
                    <span className="truncate first-letter:uppercase">{column.title}</span>
                    <div className="flex flex-col">{getSortIcon(column.accessor)}</div>
                  </Button>
                ) : (
                  <span className="truncate first-letter:uppercase">{column.title}</span>
                )}
              </div>
            </TableHead>
          );
        })}

        {/* Coluna de ações */}
        <TableHead
          className={cn(
            "bg-background group-hover:bg-muted/50 border-border/50 sticky right-0 z-20 w-12 border-b px-2"
          )}
          style={{ flex: "none", width: "80px", minWidth: 80 }}
        >
          <div className="flex items-center justify-center">
            <span className="font-semibold first-letter:uppercase">{t.helper("actions")}</span>
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export const AppTableHeader = memo(TableHeaderComponent) as typeof TableHeaderComponent;
