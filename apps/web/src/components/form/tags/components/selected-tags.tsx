import { X } from "lucide-react";

import { AppTooltip } from "@repo/ui/app";

import { ISelected } from "../types";
import { OverflowButton } from "./overflow-button";

interface SelectedTagsProps {
  selected: ISelected[];
  onRemove: (item: ISelected) => void;
  onOverflowOpen: () => void;
  onOverflowClose: () => void;
  overflowOpen: boolean;
}

export function SelectedTags({
  selected,
  onRemove,
  onOverflowOpen,
  onOverflowClose,
  overflowOpen,
}: SelectedTagsProps) {
  const maxVisibleTags = 5;
  const visibleTags = selected.slice(0, maxVisibleTags);
  const hiddenTags = selected.slice(maxVisibleTags);

  return (
    <>
      {visibleTags.map((item, idx) => (
        <div
          className="bg-secondary text-foreground line-clamp-1 flex max-w-[80px] items-center justify-between gap-2 truncate rounded-md px-2 py-1 text-[11px] font-semibold"
          key={`${item.title}-${idx}`}
        >
          <AppTooltip text={item.title} className="line-clamp-1 truncate">
            <p className="line-clamp-1 truncate">{item.title}</p>
          </AppTooltip>

          <span
            role="button"
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(item);
            }}
          >
            <X size={13} className="text-muted-foreground" />
          </span>
        </div>
      ))}

      {hiddenTags.length > 0 && (
        <OverflowButton
          hiddenTags={hiddenTags}
          onRemove={onRemove}
          onOpen={onOverflowOpen}
          onClose={onOverflowClose}
          open={overflowOpen}
        />
      )}
    </>
  );
}
