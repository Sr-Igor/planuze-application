/**
 * Sidebar Variants Module
 *
 * @module presentation/primitives/sidebar/variants
 */
import { cva, type VariantProps } from "class-variance-authority";

/**
 * Sidebar menu button variants.
 */
export const sidebarMenuButtonVariants = cva(
  [
    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-xl p-2 text-left text-sm outline-hidden",
    "ring-sidebar-ring transition-all duration-200 ease-out",
    "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
    "focus-visible:ring-2",
    "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
    "disabled:pointer-events-none disabled:opacity-50",
    "group-has-data-[sidebar=menu-action]/menu-item:pr-8",
    "aria-disabled:pointer-events-none aria-disabled:opacity-50",
    "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[active=true]:shadow-sm",
    "data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground",
    "group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:p-2! group-data-[collapsible=icon]:rounded-xl",
    "[&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-sm hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground hover:shadow-md",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type SidebarMenuButtonVariantProps = VariantProps<typeof sidebarMenuButtonVariants>;
