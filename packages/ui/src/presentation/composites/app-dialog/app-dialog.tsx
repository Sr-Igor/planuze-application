/**
 * AppDialog Component Module
 *
 * A simplified dialog component with common patterns.
 *
 * @module presentation/composites/app-dialog
 */
import { ReactNode } from "react";

import { useLang } from "@repo/language/hooks";

import { Button } from "../../primitives/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../primitives/dialog";
import { DynamicScrollArea } from "../dynamic-scroll";

export type AppDialogProps = {
  /**
   * Dialog title.
   */
  title?: ReactNode;
  /**
   * Dialog description.
   */
  description?: string;
  /**
   * Dialog content.
   */
  children?: ReactNode;
  /**
   * Footer content (additional buttons).
   */
  footer?: ReactNode;
  /**
   * Whether the dialog is open.
   */
  open?: boolean;
  /**
   * Callback when open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Additional class name for the dialog content.
   */
  className?: string;
  /**
   * Whether the dialog is in loading state.
   */
  loading?: boolean;
  /**
   * Whether the dialog is modal.
   * @default true
   */
  modal?: boolean;
  /**
   * Fixed height for scrollable content.
   */
  height?: number;
};

/**
 * AppDialog component.
 *
 * A dialog with built-in header, footer, and scroll support.
 *
 * @example
 * ```tsx
 * <AppDialog
 *   title="Edit User"
 *   description="Make changes to user profile"
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   footer={<Button onClick={handleSave}>Save</Button>}
 * >
 *   <UserForm />
 * </AppDialog>
 * ```
 */
function AppDialog({
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  loading,
  className = "sm:max-w-[425px]",
  modal = true,
  height,
}: Readonly<AppDialogProps>) {
  const t = useLang();

  return (
    <Dialog open={open} onOpenChange={(open) => !loading && onOpenChange?.(open)} modal={modal}>
      <DialogContent className={className} closeButton={!loading}>
        <DialogHeader>
          {title && <DialogTitle className="text-md font-bold">{title}</DialogTitle>}
          {description && (
            <DialogDescription className="text-xs font-semibold">{description}</DialogDescription>
          )}
        </DialogHeader>
        {height ? <DynamicScrollArea height={height}>{children}</DynamicScrollArea> : children}
        <DialogFooter>
          <DialogClose asChild disabled={loading}>
            <Button variant="outline">{t.helper("back")}</Button>
          </DialogClose>
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { AppDialog };
