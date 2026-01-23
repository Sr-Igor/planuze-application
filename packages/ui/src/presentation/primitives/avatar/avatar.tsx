/**
 * Avatar Component Module
 *
 * An image element with a fallback for representing the user.
 *
 * @module presentation/primitives/avatar
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "../../../shared/utils";

/**
 * Avatar Component Module
 *
 * An image element with a fallback for representing the user.
 *
 * @module presentation/primitives/avatar
 */

/**
 * Avatar component props.
 */
export type AvatarProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

/**
 * Avatar component.
 *
 * Container for the avatar image and fallback.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        "ring-2 ring-transparent transition-all duration-200",
        "hover:ring-primary/20",
        className
      )}
      {...props}
    />
  )
);

Avatar.displayName = "Avatar";

/**
 * AvatarImage component props.
 */
export type AvatarImageProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

/**
 * AvatarImage component.
 *
 * The image to display in the avatar.
 */
const AvatarImage = forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
);

AvatarImage.displayName = "AvatarImage";

/**
 * AvatarFallback component props.
 */
export type AvatarFallbackProps = ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

/**
 * AvatarFallback component.
 *
 * Fallback content when the image fails to load.
 */
const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    data-slot="avatar-fallback"
    className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
    {...props}
  />
));

AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarFallback, AvatarImage };
