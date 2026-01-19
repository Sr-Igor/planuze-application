/**
 * Badge Types Module
 *
 * @module presentation/primitives/badge/types
 */

import { ComponentPropsWithoutRef } from "react";

import { ISlottableComponent } from "../../../core/interfaces";
import { BadgeVariantProps } from "./badge.variants";

/**
 * Badge visual variant options.
 */
export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

/**
 * Badge component props.
 */
export type BadgeProps = ComponentPropsWithoutRef<"span"> &
  BadgeVariantProps &
  ISlottableComponent;
