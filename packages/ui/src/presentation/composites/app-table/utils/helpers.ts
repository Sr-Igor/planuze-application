/**
 * AppTable Helpers Module
 *
 * Utility functions for the AppTable component.
 *
 * @module presentation/composites/app-table/utils
 */

import { BaseTableItem, TableColumn } from "../types";

/**
 * Accesses a nested property in an object using dot notation.
 */
export function getNestedValue(obj: unknown, path: string): unknown {
  if (!obj || !path) return undefined;

  return path.split(".").reduce((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Formats a value for display in the table.
 */
export function formatCellValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (typeof value === "number") {
    return value.toLocaleString();
  }

  if (typeof value === "object") {
    if (value instanceof Date) {
      return value.toLocaleDateString();
    }
    return JSON.stringify(value);
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "symbol") {
    return value.toString();
  }

  // bigint, function, or other
  return JSON.stringify(value);
}

/**
 * Calculates the width of a column based on its content.
 */
export function calculateColumnWidth<T extends BaseTableItem>(
  column: TableColumn<T>,
  data: T[]
): number {
  const minWidth = 100;
  const maxWidth = 400;
  const charWidth = 8;

  const titleWidth = column.title.length * charWidth + 40;

  const maxContentLength = Math.max(
    ...data.slice(0, 100).map((item) => {
      const value = getNestedValue(item, column.accessor);
      const formattedValue = column.formatValue
        ? formatCellValue(column.formatValue(item))
        : formatCellValue(value);
      return formattedValue.length;
    })
  );

  const contentWidth = maxContentLength * charWidth + 20;
  const calculatedWidth = Math.max(titleWidth, contentWidth);

  return Math.min(Math.max(calculatedWidth, minWidth), maxWidth);
}

/**
 * Generates CSS classes based on table variant.
 */
export function getTableVariantClasses(
  variant: "default" | "striped" | "bordered" = "default",
  size: "sm" | "md" | "lg" = "md"
): {
  table: string;
  header: string;
  row: string;
  cell: string;
} {
  const sizeClasses = {
    sm: {
      cell: "h-10 px-2 text-xs",
      header: "h-10 px-2 text-xs font-medium",
    },
    md: {
      cell: "h-12 px-3 text-sm",
      header: "h-12 px-3 text-sm font-medium",
    },
    lg: {
      cell: "h-14 px-4 text-base",
      header: "h-14 px-4 text-base font-medium",
    },
  };

  const variantClasses = {
    default: {
      table: "border-collapse",
      header: "bg-muted/50",
      row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      cell: "",
    },
    striped: {
      table: "border-collapse",
      header: "bg-muted/50",
      row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted odd:bg-muted/25",
      cell: "",
    },
    bordered: {
      table: "border-collapse border",
      header: "bg-muted/50 border-b",
      row: "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      cell: "border-r last:border-r-0",
    },
  };

  return {
    table: variantClasses[variant].table,
    header: `${variantClasses[variant].header} ${sizeClasses[size].header}`,
    row: variantClasses[variant].row,
    cell: `${variantClasses[variant].cell} ${sizeClasses[size].cell}`,
  };
}

/**
 * Debounce function for search filters.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generates a unique ID for table elements.
 */
export function generateTableId(prefix: string, ...parts: (string | number)[]): string {
  return [prefix, ...parts].join("-").replace(/\s+/g, "-").toLowerCase();
}

/**
 * Checks if the device is mobile.
 */
export function isMobile(breakpoint: number = 768): boolean {
  if (globalThis.window === undefined) return false;
  return globalThis.window.innerWidth < breakpoint;
}

/**
 * Converts breakpoint to Tailwind classes.
 */
export function getBreakpointClass(breakpoint: number): string {
  const breakpoints: Record<number, string> = {
    640: "sm:",
    768: "md:",
    1024: "lg:",
    1280: "xl:",
    1536: "2xl:",
  };

  const closest = Object.keys(breakpoints)
    .map(Number)
    .sort((a, b) => Math.abs(breakpoint - a) - Math.abs(breakpoint - b))[0];

  return breakpoints[closest] || "";
}
