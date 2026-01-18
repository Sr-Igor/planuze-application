/**
 * Button Component Public API
 *
 * This module exports the Button component and related utilities.
 * It serves as the public interface for the button primitive.
 *
 * @module presentation/primitives/button
 */

// Component exports
export { Button, buttonVariants, IconButton } from "./button";

// Type exports
export type {
  ButtonIconProps,
  ButtonLoaderProps,
  ButtonOwnProps,
  ButtonProps,
  ButtonSize,
  ButtonVariant,
} from "./button.types";

// Variant type exports
export type { ButtonVariantProps } from "./button.variants";
