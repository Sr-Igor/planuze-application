/**
 * Alert Component Module
 *
 * Displays a callout for user attention.
 *
 * @module presentation/primitives/alert
 */

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";
import { AlertVariantProps, alertVariants } from "./alert.variants";

/**
 * Alert component props.
 */
export type AlertProps = ComponentPropsWithoutRef<"div"> & AlertVariantProps;

/**
 * Alert component.
 *
 * Displays important messages to users.
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>You can add components to your app.</AlertDescription>
 * </Alert>
 *
 * <Alert variant="destructive">
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong.</AlertDescription>
 * </Alert>
 * ```
 */
const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);

Alert.displayName = "Alert";

/**
 * AlertTitle component props.
 */
export type AlertTitleProps = ComponentPropsWithoutRef<"div">;

/**
 * AlertTitle component.
 *
 * The title of the alert.
 */
const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
);

AlertTitle.displayName = "AlertTitle";

/**
 * AlertDescription component props.
 */
export type AlertDescriptionProps = ComponentPropsWithoutRef<"div">;

/**
 * AlertDescription component.
 *
 * The description text of the alert.
 */
const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
);

AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription, AlertTitle, alertVariants };
