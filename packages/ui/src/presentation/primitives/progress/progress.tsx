/**
 * Progress Component Module
 *
 * Displays an indicator showing the completion progress of a task.
 *
 * @module presentation/primitives/progress
 */

"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * Progress component props.
 */
export type ProgressProps = ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>;

/**
 * Progress component.
 *
 * Shows the progress of a task.
 *
 * @example
 * ```tsx
 * <Progress value={33} />
 * <Progress value={66} className="h-3" />
 * ```
 */
const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    data-slot="progress"
    className={cn(
      "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className="bg-primary h-full w-full flex-1 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = "Progress";

export { Progress };
