/**
 * Skeleton Component Module
 *
 * A placeholder preview for content before it loads.
 *
 * @module presentation/primitives/skeleton
 */
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * Skeleton component props.
 */
export type SkeletonProps = ComponentPropsWithoutRef<"div">;

/**
 * Skeleton component.
 *
 * Used to show a placeholder while content is loading.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-4 w-[200px]" />
 * <Skeleton className="h-12 w-12 rounded-full" />
 * ```
 */
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="skeleton"
    className={cn("bg-muted animate-pulse rounded-md", className)}
    {...props}
  />
));

Skeleton.displayName = "Skeleton";

export { Skeleton };
