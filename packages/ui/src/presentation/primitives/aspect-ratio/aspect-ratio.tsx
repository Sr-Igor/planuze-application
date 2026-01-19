/**
 * AspectRatio Component Module
 *
 * Displays content within a desired ratio.
 *
 * @module presentation/primitives/aspect-ratio
 */

"use client";

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { ComponentPropsWithoutRef, forwardRef } from "react";

/**
 * AspectRatio component props.
 */
export type AspectRatioProps = ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>;

/**
 * AspectRatio component.
 *
 * Maintains a consistent width-to-height ratio.
 *
 * @example
 * ```tsx
 * <AspectRatio ratio={16 / 9}>
 *   <img src="/image.jpg" alt="Image" className="object-cover" />
 * </AspectRatio>
 * ```
 */
const AspectRatio = forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ ...props }, ref) => (
  <AspectRatioPrimitive.Root ref={ref} data-slot="aspect-ratio" {...props} />
));

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
