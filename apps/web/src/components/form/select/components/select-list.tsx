import { memo } from "react";

import { Loader2 } from "lucide-react";

import { Skeleton } from "@repo/ui";
import * as C from "@repo/ui";

import { cn } from "@/lib/utils";

interface SelectListProps {
  children: React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  className?: string;
  useCommandList?: boolean;
  maxHeight?: string;
  loading?: boolean;
}

export const Loader = () => {
  return (
    <div className="bg-background absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
};

export const SelectList = memo(
  ({
    children,
    onScroll,
    className = "",
    useCommandList = false,
    maxHeight = "max-h-64",
    loading = false,
  }: SelectListProps) => {
    const baseClassName = `space-y-1 p-2 ${maxHeight} overflow-auto`;
    const commandClassName = `${maxHeight} overflow-auto relative`;

    if (useCommandList) {
      return (
        <C.CommandList
          className={cn(commandClassName, className)}
          onWheel={(e) => {
            e.stopPropagation();
          }}
          onScroll={onScroll}
        >
          {loading && <Loader />}
          {children}
        </C.CommandList>
      );
    }

    return (
      <div className={cn(baseClassName, className)} onScroll={onScroll}>
        {loading && <Loader />}
        {children}
      </div>
    );
  }
);
