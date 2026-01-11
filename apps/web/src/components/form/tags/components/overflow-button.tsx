import { MoreHorizontal, X } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui";

import { ISelected } from "../types";

interface OverflowButtonProps {
  hiddenTags: ISelected[];
  onRemove: (item: ISelected) => void;
  onOpen: () => void;
  onClose: () => void;
  open: boolean;
}

export function OverflowButton({
  hiddenTags,
  onRemove,
  onOpen,
  onClose,
  open,
}: OverflowButtonProps) {
  const t = useLang();

  return (
    <Popover open={open} onOpenChange={(isOpen) => (isOpen ? onOpen() : onClose())}>
      <PopoverTrigger asChild>
        <span
          className="bg-secondary text-foreground hover:bg-secondary/80 flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold"
          onClick={onOpen}
        >
          <MoreHorizontal size={13} />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <div className="space-y-2">
          <div className="text-muted-foreground mb-2 text-sm font-medium">
            {t.helper("additional_tags")} ({hiddenTags.length})
          </div>
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {hiddenTags.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="bg-secondary text-foreground flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[11px] font-semibold"
              >
                <span className="truncate">{item.title}</span>
                <span
                  role="button"
                  className="hover:bg-destructive/20 cursor-pointer rounded p-0.5"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRemove(item);
                  }}
                >
                  <X size={12} className="text-muted-foreground" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
