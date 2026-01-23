/**
 * Slider Component Module
 *
 * An input where the user selects a value from within a given range.
 *
 * @module presentation/primitives/slider
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef, useMemo } from "react";

import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../../shared/utils";

/**
 * Slider Component Module
 *
 * An input where the user selects a value from within a given range.
 *
 * @module presentation/primitives/slider
 */

/**
 * Slider component props.
 */
export type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

/**
 * Slider component.
 *
 * A range input for selecting numeric values.
 *
 * @example
 * ```tsx
 * <Slider defaultValue={[50]} max={100} step={1} />
 * <Slider value={[25, 75]} onValueChange={setValue} />
 * ```
 */
const Slider = forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, defaultValue, value, min = 0, max = 100, ...props }, ref) => {
    const values = useMemo(() => {
      if (Array.isArray(value)) {
        return value;
      }
      if (Array.isArray(defaultValue)) {
        return defaultValue;
      }
      return [min, max];
    }, [value, defaultValue, min, max]);

    return (
      <SliderPrimitive.Root
        ref={ref}
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        className={cn(
          "relative flex w-full touch-none items-center select-none",
          "data-disabled:opacity-50",
          "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44",
          "data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-muted relative grow overflow-hidden rounded-full shadow-inner",
            "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "bg-primary absolute transition-all duration-150",
              "data-[orientation=horizontal]:h-full",
              "data-[orientation=vertical]:w-full"
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: values.length }, (_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            data-slot="slider-thumb"
            className={cn(
              "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full",
              "border-2 shadow-md transition-all duration-200",
              "hover:shadow-lg hover:ring-4",
              "focus-visible:shadow-lg focus-visible:ring-4 focus-visible:outline-hidden",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          />
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
