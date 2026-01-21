/**
 * Input Component Module
 *
 * A styled text input field.
 *
 * @module presentation/primitives/input
 */
import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * Base input class names for reuse.
 */
export const inputClassName = cn(
  "border-input file:text-foreground placeholder:text-muted-foreground",
  "selection:bg-primary selection:text-primary-foreground",
  "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1",
  "text-base shadow-xs transition-[color,box-shadow] outline-none",
  "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  "md:text-sm",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
);

/**
 * Input component props.
 */
export type InputProps = ComponentPropsWithoutRef<"input">;

/**
 * Input component.
 *
 * A styled input field for text entry.
 *
 * @example
 * ```tsx
 * <Input type="text" placeholder="Enter your name" />
 * <Input type="email" placeholder="email@example.com" />
 * <Input type="password" />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(inputClassName, className)}
      value={value ?? ""}
      {...props}
    />
  )
);

Input.displayName = "Input";

export { Input };
