/**
 * Pagination Component Module
 *
 * Pagination controls for navigating between pages.
 *
 * @module presentation/primitives/pagination
 */

import { ChevronsLeft, ChevronsRight, MoreHorizontalIcon } from "lucide-react";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";
import { buttonVariants } from "../button";

// ============================================================================
// Root Components
// ============================================================================

export type PaginationProps = ComponentPropsWithoutRef<"nav">;

const Pagination = forwardRef<HTMLElement, PaginationProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
);

Pagination.displayName = "Pagination";

export type PaginationContentProps = ComponentPropsWithoutRef<"ul">;

const PaginationContent = forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
);

PaginationContent.displayName = "PaginationContent";

export type PaginationItemProps = ComponentPropsWithoutRef<"li">;

const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ ...props }, ref) => <li ref={ref} data-slot="pagination-item" {...props} />
);

PaginationItem.displayName = "PaginationItem";

// ============================================================================
// Link Components
// ============================================================================

export type PaginationLinkProps = {
  isActive?: boolean;
  size?: "sm" | "md" | "lg" | "icon";
} & ComponentPropsWithoutRef<"a">;

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size = "md", ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
);

PaginationLink.displayName = "PaginationLink";

export type PaginationPreviousProps = Omit<PaginationLinkProps, "size">;

const PaginationPrevious = forwardRef<HTMLAnchorElement, PaginationPreviousProps>(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to previous page"
      size="md"
      className={cn("cursor-pointer gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    />
  )
);

PaginationPrevious.displayName = "PaginationPrevious";

export type PaginationNextProps = Omit<PaginationLinkProps, "size">;

const PaginationNext = forwardRef<HTMLAnchorElement, PaginationNextProps>(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size="md"
      className={cn("cursor-pointer gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    />
  )
);

PaginationNext.displayName = "PaginationNext";

export type PaginationFirstProps = Omit<PaginationLinkProps, "size" | "children">;

const PaginationFirst = forwardRef<HTMLAnchorElement, PaginationFirstProps>(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to first page"
      size="md"
      className={cn("cursor-pointer gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronsLeft />
    </PaginationLink>
  )
);

PaginationFirst.displayName = "PaginationFirst";

export type PaginationLastProps = Omit<PaginationLinkProps, "size" | "children">;

const PaginationLast = forwardRef<HTMLAnchorElement, PaginationLastProps>(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to last page"
      size="md"
      className={cn("cursor-pointer gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <ChevronsRight />
    </PaginationLink>
  )
);

PaginationLast.displayName = "PaginationLast";

// ============================================================================
// Ellipsis
// ============================================================================

export type PaginationEllipsisProps = ComponentPropsWithoutRef<"span">;

const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
);

PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
