"use client";

import React, { memo, useCallback } from "react";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  cn,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@repo/ui";

import { TablePaginationProps } from "../types/index";

const LIMIT_OPTIONS = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "50", value: 50 },
  { label: "100", value: 100 },
];

function TablePaginationComponent({
  pagination,
  loading,
  onPageChange,
  onLimitChange,
}: TablePaginationProps) {
  const t = useLang();
  const { page, pages, limit, count } = pagination;

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pages && newPage !== page) {
        onPageChange(newPage);
      }
    },
    [page, pages, onPageChange]
  );

  const handleLimitChange = useCallback(
    (newLimit: string) => {
      onLimitChange(Number(newLimit));
    },
    [onLimitChange]
  );

  const getVisiblePages = () => {
    const maxVisible = 5;
    const pages_array: (number | "ellipsis")[] = [];

    if (pages <= maxVisible) {
      // Se temos poucas páginas, mostra todas
      for (let i = 1; i <= pages; i++) {
        pages_array.push(i);
      }
    } else {
      // Sempre mostra a primeira página
      pages_array.push(1);

      if (page > 3) {
        pages_array.push("ellipsis");
      }

      // Mostra páginas ao redor da atual
      const start = Math.max(2, page - 1);
      const end = Math.min(pages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pages_array.push(i);
      }

      if (page < pages - 2) {
        pages_array.push("ellipsis");
      }

      // Sempre mostra a última página
      if (pages > 1) {
        pages_array.push(pages);
      }
    }

    return pages_array;
  };

  const canGoFirst = page > 1;
  const canGoPrevious = page > 1;
  const canGoNext = page < pages;
  const canGoLast = page < pages;

  return (
    <div className="bg-background flex items-center justify-between gap-4 border-t px-4 py-3">
      {/* Informações e seletor de limite */}
      <div className="text-muted-foreground flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="hidden whitespace-nowrap md:block">{t.helper("limit")}:</span>
          <Select value={limit.toString()} onValueChange={handleLimitChange} disabled={loading}>
            <SelectTrigger className="h-8 w-18">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LIMIT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden items-center gap-1 md:flex">
          <span className="whitespace-nowrap">{t.helper("total")}:</span>
          {loading ? (
            <Skeleton className="h-4 w-8" />
          ) : (
            <span className="font-medium">{count}</span>
          )}
        </div>
      </div>

      {/* Controles de paginação */}
      <div className="flex items-center gap-1">
        {/* Primeira página */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden h-8 w-8 p-0 md:block"
          onClick={() => handlePageChange(1)}
          disabled={!canGoFirst || loading}
          title="Primeira página"
        >
          <ChevronFirst size={14} />
        </Button>

        {/* Página anterior */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page - 1)}
          disabled={!canGoPrevious || loading}
          title="Página anterior"
        >
          <ChevronLeft size={14} />
        </Button>

        {/* Números das páginas */}
        <div className="mx-2 flex items-center gap-1">
          {getVisiblePages().map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === "ellipsis" ? (
                <div className="flex h-8 w-8 items-center justify-center">
                  <MoreHorizontal size={14} className="text-muted-foreground" />
                </div>
              ) : (
                <Button
                  variant={pageNum === page ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 w-8 p-0",
                    pageNum === page && "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                >
                  {loading && pageNum === page ? <Skeleton className="h-3 w-3" /> : pageNum}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Próxima página */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page + 1)}
          disabled={!canGoNext || loading}
          title="Próxima página"
        >
          <ChevronRight size={14} />
        </Button>

        {/* Última página */}
        <Button
          variant="ghost"
          size="sm"
          className="hidden h-8 w-8 p-0 md:block"
          onClick={() => handlePageChange(pages)}
          disabled={!canGoLast || loading}
          title="Última página"
        >
          <ChevronLast size={14} />
        </Button>
      </div>
    </div>
  );
}

export const AppTablePagination = memo(TablePaginationComponent);
