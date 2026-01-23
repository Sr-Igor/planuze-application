/**
 * Table Component Module
 *
 * A responsive table component.
 *
 * @module presentation/primitives/table
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * Table Component Module
 *
 * A responsive table component.
 *
 * @module presentation/primitives/table
 */

// ============================================================================
// Root Components
// ============================================================================

export type TableProps = ComponentPropsWithoutRef<"table"> & {
  containerClassName?: string;
};

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, children, ...props }, ref) => (
    <div className={cn("relative w-full", containerClassName)}>
      {/* Table header is provided by consumers via TableHeader + TableHead components */}
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);

Table.displayName = "Table";

export type TableHeaderProps = ComponentPropsWithoutRef<"thead">;

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} data-slot="table-header" className={cn(className)} {...props} />
  )
);

TableHeader.displayName = "TableHeader";

export type TableBodyProps = ComponentPropsWithoutRef<"tbody">;

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
);

TableBody.displayName = "TableBody";

export type TableFooterProps = ComponentPropsWithoutRef<"tfoot">;

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
);

TableFooter.displayName = "TableFooter";

// ============================================================================
// Row & Cell Components
// ============================================================================

export type TableRowProps = ComponentPropsWithoutRef<"tr">;

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    data-slot="table-row"
    className={cn(
      "data-[state=selected]:bg-muted transition-colors duration-150",
      "hover:bg-muted/50",
      className
    )}
    {...props}
  />
));

TableRow.displayName = "TableRow";

export type TableHeadProps = ComponentPropsWithoutRef<"th">;

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "text-muted-foreground h-10 px-2 text-left align-middle font-medium",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
);

TableHead.displayName = "TableHead";

export type TableCellProps = ComponentPropsWithoutRef<"td">;

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle",
        "[&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
);

TableCell.displayName = "TableCell";

export type TableCaptionProps = ComponentPropsWithoutRef<"caption">;

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
);

TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
