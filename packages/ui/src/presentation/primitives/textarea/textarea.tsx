/**
 * Textarea Component Module
 *
 * A styled multi-line text input.
 *
 * @module presentation/primitives/textarea
 */

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * Textarea component props.
 */
export type TextareaProps = ComponentPropsWithoutRef<"textarea">;

/**
 * Textarea component.
 *
 * A multi-line text input field.
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Enter your message..." />
 * <Textarea rows={5} />
 * ```
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-ring/50",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent",
        "px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        "md:text-sm",
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = "Textarea";

export { Textarea };
