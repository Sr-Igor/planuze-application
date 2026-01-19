/**
 * Button Types Module
 *
 * Type definitions for the Button component.
 * Following Interface Segregation Principle (ISP), types are focused
 * and composable.
 *
 * @module presentation/primitives/button/types
 */

import { ComponentPropsWithoutRef, ReactNode } from "react";

import {
  IDisableableComponent,
  ILoadableComponent,
  ISlottableComponent,
} from "../../../core/interfaces";
import { ButtonVariantProps } from "./button.variants";

/**
 * Button size options.
 */
export type ButtonSize = "default" | "sm" | "md" | "lg" | "icon";

/**
 * Button visual variant options.
 */
export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

/**
 * Props specific to the Button component.
 * Combines multiple interface contracts for a complete type definition.
 */
export interface ButtonOwnProps
  extends ISlottableComponent,
    ILoadableComponent,
    IDisableableComponent {
  /**
   * The visual variant of the button
   * @default "default"
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Icon to display before the button text
   */
  leftIcon?: ReactNode;

  /**
   * Icon to display after the button text
   */
  rightIcon?: ReactNode;

  /**
   * Whether the button should take up the full width of its container
   * @default false
   */
  fullWidth?: boolean;
}

/**
 * Complete Button component props.
 * Merges own props with native button element props.
 */
export type ButtonProps = ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonOwnProps> &
  ButtonVariantProps;

/**
 * Props for the ButtonIcon subcomponent.
 */
export interface ButtonIconProps {
  /**
   * The icon element to render
   */
  children: ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Position of the icon relative to text
   * @default "left"
   */
  position?: "left" | "right";
}

/**
 * Props for the ButtonLoader subcomponent.
 */
export interface ButtonLoaderProps {
  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom loading indicator
   */
  children?: ReactNode;
}
