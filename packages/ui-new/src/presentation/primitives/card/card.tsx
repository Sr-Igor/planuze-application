/**
 * Card Component Module
 *
 * A container component for grouping related content.
 *
 * @module presentation/primitives/card
 */

import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "../../../shared/utils";

/**
 * Card component props.
 */
export type CardProps = ComponentPropsWithoutRef<"div">;

/**
 * Card component.
 *
 * A container for grouping related content and actions.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card"
    className={cn(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
      className
    )}
    {...props}
  />
));

Card.displayName = "Card";

/**
 * CardHeader component props.
 */
export type CardHeaderProps = ComponentPropsWithoutRef<"div">;

/**
 * CardHeader component.
 *
 * Container for the card's header content.
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 px-6", className)}
      {...props}
    />
  )
);

CardHeader.displayName = "CardHeader";

/**
 * CardTitle component props.
 */
export type CardTitleProps = ComponentPropsWithoutRef<"div">;

/**
 * CardTitle component.
 *
 * The title of the card.
 */
const CardTitle = forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
);

CardTitle.displayName = "CardTitle";

/**
 * CardDescription component props.
 */
export type CardDescriptionProps = ComponentPropsWithoutRef<"div">;

/**
 * CardDescription component.
 *
 * A description or subtitle for the card.
 */
const CardDescription = forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
);

CardDescription.displayName = "CardDescription";

/**
 * CardContent component props.
 */
export type CardContentProps = ComponentPropsWithoutRef<"div">;

/**
 * CardContent component.
 *
 * The main content area of the card.
 */
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
);

CardContent.displayName = "CardContent";

/**
 * CardFooter component props.
 */
export type CardFooterProps = ComponentPropsWithoutRef<"div">;

/**
 * CardFooter component.
 *
 * Container for card actions and footer content.
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center px-6", className)}
      {...props}
    />
  )
);

CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
