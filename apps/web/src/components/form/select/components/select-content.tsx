import { memo } from "react";

import { PopoverContentInModal } from "@repo/ui";

import { cn } from "@/lib/utils";

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
  modal?: boolean;
  align?: "start" | "center" | "end";
}

export const SelectContent = memo(({ children, className = "" }: SelectContentProps) => {
  const modalClassName = "max-h-80 w-[var(--radix-popover-trigger-width)] min-w-60 p-0";

  return (
    <PopoverContentInModal className={cn(modalClassName, className)}>
      {children}
    </PopoverContentInModal>
  );
});
