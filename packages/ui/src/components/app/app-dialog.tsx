import { useLang } from "@repo/language/hook";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";

import { DynamicScrollArea } from "./dynamic-scroll";

export interface IAppDialogProps {
  title?: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  loading?: boolean;
  modal?: boolean;
  height?: number;
}

export function AppDialog({
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
}: IAppDialogProps) {
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
        {height && <DynamicScrollArea height={height}>{children}</DynamicScrollArea>}
        {!height && children}
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
