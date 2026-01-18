/**
 * ToggleGroup Component Module
 *
 * A set of two-state buttons that can be toggled on or off.
 *
 * @module presentation/primitives/toggle-group
 */

"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { ComponentPropsWithoutRef, createContext, forwardRef, useContext } from "react";

import { cn } from "../../../shared/utils";
import { toggleVariants, ToggleVariantProps } from "../toggle/toggle.variants";

/**
 * Context for sharing variant props between ToggleGroup and ToggleGroupItem.
 */
const ToggleGroupContext = createContext<ToggleVariantProps>({
  size: "default",
  variant: "default",
});

/**
 * ToggleGroup component props.
 */
export type ToggleGroupProps = ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
  ToggleVariantProps;

/**
 * ToggleGroup component.
 *
 * A group of toggle buttons.
 *
 * @example
 * ```tsx
 * <ToggleGroup type="single" value={value} onValueChange={setValue}>
 *   <ToggleGroupItem value="left"><AlignLeftIcon /></ToggleGroupItem>
 *   <ToggleGroupItem value="center"><AlignCenterIcon /></ToggleGroupItem>
 *   <ToggleGroupItem value="right"><AlignRightIcon /></ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
const ToggleGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    data-slot="toggle-group"
    data-variant={variant}
    data-size={size}
    className={cn(
      "group/toggle-group flex items-center rounded-md",
      "data-[variant=outline]:shadow-xs",
      className
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = "ToggleGroup";

/**
 * ToggleGroupItem component props.
 */
export type ToggleGroupItemProps = ComponentPropsWithoutRef<
  typeof ToggleGroupPrimitive.Item
> &
  ToggleVariantProps;

/**
 * ToggleGroupItem component.
 *
 * An individual toggle button within a ToggleGroup.
 */
const ToggleGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, children, variant, size, ...props }, ref) => {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        "min-w-0 shrink-0 rounded-none shadow-none",
        "first:rounded-l-md last:rounded-r-md",
        "focus:z-10 focus-visible:z-10",
        "data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
