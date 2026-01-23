/**
 * Dialog Component Module
 *
 * A modal dialog that interrupts the user with important content.
 *
 * @module presentation/primitives/dialog
 */

"use client";

import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "../../../shared/utils";

/**
 * Dialog Component Module
 *
 * A modal dialog that interrupts the user with important content.
 *
 * @module presentation/primitives/dialog
 */

/**
 * Dialog Component Module
 *
 * A modal dialog that interrupts the user with important content.
 *
 * @module presentation/primitives/dialog
 */

/**
 * Dialog Component Module
 *
 * A modal dialog that interrupts the user with important content.
 *
 * @module presentation/primitives/dialog
 */

/**
 * Dialog Component Module
 *
 * A modal dialog that interrupts the user with important content.
 *
 * @module presentation/primitives/dialog
 */

/**
 * Dialog Component Module
 *
 * A modal dialog that interrupts the user with important content.
 *
 * @module presentation/primitives/dialog
 */

/**
 * Dialog component props.
 */
export type DialogProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

/**
 * Dialog component.
 *
 * Container for dialog content.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger>Open</DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Title</DialogTitle>
 *       <DialogDescription>Description</DialogDescription>
 *     </DialogHeader>
 *     Content
 *     <DialogFooter>Actions</DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
function Dialog({ ...props }: Readonly<DialogProps>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

/**
 * DialogTrigger component props.
 */
export type DialogTriggerProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;

/**
 * DialogTrigger component.
 *
 * The element that triggers the dialog.
 */
const DialogTrigger = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  DialogTriggerProps
>(({ ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props} />
));

DialogTrigger.displayName = "DialogTrigger";

/**
 * DialogPortal component props.
 */
export type DialogPortalProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Portal>;

/**
 * DialogPortal component.
 *
 * Renders the dialog in a portal.
 */
function DialogPortal({ ...props }: Readonly<DialogPortalProps>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

/**
 * DialogClose component props.
 */
export type DialogCloseProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;

/**
 * DialogClose component.
 *
 * Closes the dialog when clicked.
 */
const DialogClose = forwardRef<React.ElementRef<typeof DialogPrimitive.Close>, DialogCloseProps>(
  ({ ...props }, ref) => <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />
);

DialogClose.displayName = "DialogClose";

/**
 * DialogOverlay component props.
 */
export type DialogOverlayProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

/**
 * DialogOverlay component.
 *
 * The overlay behind the dialog.
 */
const DialogOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    data-slot="dialog-overlay"
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));

DialogOverlay.displayName = "DialogOverlay";

/**
 * DialogContent component props.
 */
export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  /**
   * Whether to show the close button.
   * @default true
   */
  closeButton?: boolean;
};

/**
 * DialogContent component.
 *
 * The content displayed in the dialog.
 */
const DialogContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, closeButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-content"
      className={cn(
        "bg-background/95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] backdrop-blur-sm",
        "gap-4 rounded-lg border p-6 shadow-xl duration-200 sm:max-w-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
      {closeButton && (
        <DialogPrimitive.Close
          className={cn(
            "ring-offset-background absolute top-4 right-4 rounded-sm opacity-70",
            "hover:bg-muted transition-all duration-150 hover:opacity-100",
            "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-hidden",
            "disabled:pointer-events-none",
            "p-1",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          )}
        >
          <XIcon className="stroke-2" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = "DialogContent";

/**
 * DialogHeader component props.
 */
export type DialogHeaderProps = ComponentPropsWithoutRef<"div">;

/**
 * DialogHeader component.
 *
 * Container for dialog title and description.
 */
const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
);

DialogHeader.displayName = "DialogHeader";

/**
 * DialogFooter component props.
 */
export type DialogFooterProps = ComponentPropsWithoutRef<"div">;

/**
 * DialogFooter component.
 *
 * Container for dialog actions.
 */
const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
);

DialogFooter.displayName = "DialogFooter";

/**
 * DialogTitle component props.
 */
export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

/**
 * DialogTitle component.
 *
 * The title of the dialog.
 */
const DialogTitle = forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
);

DialogTitle.displayName = "DialogTitle";

/**
 * DialogDescription component props.
 */
export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;

/**
 * DialogDescription component.
 *
 * The description of the dialog.
 */
const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    data-slot="dialog-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));

DialogDescription.displayName = "DialogDescription";

/**
 * DialogDNDContent component.
 *
 * A dialog content variant that prevents closing on outside click,
 * useful for drag and drop interactions.
 */
const DialogDNDContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, closeButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      data-slot="dialog-dnd-content"
      onPointerDownOutside={(e) => e.preventDefault()}
      onInteractOutside={(e) => e.preventDefault()}
      className={cn(
        "bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]",
        "gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    >
      {children}
      {closeButton && (
        <DialogPrimitive.Close
          className={cn(
            "ring-offset-background absolute top-4 right-4 rounded-xs opacity-70",
            "transition-opacity hover:opacity-100",
            "focus:ring-ring focus:ring-2 focus:ring-offset-2 focus:outline-hidden",
            "disabled:pointer-events-none",
            "data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          )}
        >
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogDNDContent.displayName = "DialogDNDContent";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogDNDContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
