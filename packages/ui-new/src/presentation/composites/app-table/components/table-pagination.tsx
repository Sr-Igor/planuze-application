/**
 * TablePagination Component
 *
 * @module presentation/composites/app-table/components
 */

"use client";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Fragment, memo, useCallback } from "react";

import { cn } from "../../../../shared/utils";
import { Button } from "../../../primitives/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../primitives/select";
import { Skeleton } from "../../../primitives/skeleton";
import { TablePaginationProps } from "../types";

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
  labels,
}: Readonly<TablePaginationProps>) {
  const limitLabel = labels?.limit ?? "Limit";
  const totalLabel = labels?.total ?? "Total";

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
    const pagesArray: (number | "ellipsis")[] = [];

    if (pages <= maxVisible) {
      for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
      }
    } else {
      pagesArray.push(1);

      if (page > 3) {
        pagesArray.push("ellipsis");
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(pages - 1, page + 1);

      for (let i = start; i <= end; i++) {
        pagesArray.push(i);
      }

      if (page < pages - 2) {
        pagesArray.push("ellipsis");
      }

      if (pages > 1) {
        pagesArray.push(pages);
      }
    }

    return pagesArray;
  };

  const canGoFirst = page > 1;
  const canGoPrevious = page > 1;
  const canGoNext = page < pages;
  const canGoLast = page < pages;

  return (
    <div className="bg-background flex items-center justify-between gap-4 border-t px-4 py-3">
      <div className="text-muted-foreground flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="hidden whitespace-nowrap md:block">{limitLabel}:</span>
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
          <span className="whitespace-nowrap">{totalLabel}:</span>
          {loading ? (
            <Skeleton className="h-4 w-8" />
          ) : (
            <span className="font-medium">{count}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="hidden h-8 w-8 p-0 md:block"
          onClick={() => handlePageChange(1)}
          disabled={!canGoFirst || loading}
          title="First page"
        >
          <ChevronFirst size={14} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page - 1)}
          disabled={!canGoPrevious || loading}
          title="Previous page"
        >
          <ChevronLeft size={14} />
        </Button>

        <div className="mx-2 flex items-center gap-1">
          {getVisiblePages().map((pageNum, index) => (
            <Fragment key={`page-${pageNum}-${index}`}>
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
            </Fragment>
          ))}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page + 1)}
          disabled={!canGoNext || loading}
          title="Next page"
        >
          <ChevronRight size={14} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="hidden h-8 w-8 p-0 md:block"
          onClick={() => handlePageChange(pages)}
          disabled={!canGoLast || loading}
          title="Last page"
        >
          <ChevronLast size={14} />
        </Button>
      </div>
    </div>
  );
}

export const AppTablePagination = memo(TablePaginationComponent);
