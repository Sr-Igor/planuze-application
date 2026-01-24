"use client";

import { cn } from "../../../shared/utils";
import { AppTooltip } from "../app-tooltip";
import { Icon } from "../icon";

export interface CardSelectorItem {
  title: string;
  public_id: number | string;
  project_kanban_cycle?: {
    title?: string;
  };
  project_kanban_cycle_column?: {
    title?: string;
  };
  project_kanban_cycle_card_type?: {
    icon?: string;
    color?: string | null;
  };
}

export interface AppCardSelectorProps {
  /**
   * Item to display
   */
  item: CardSelectorItem;
  /**
   * Whether to show the path
   */
  showPath?: boolean;
  /**
   * Whether to show the public ID
   */
  showPublicId?: boolean;
  /**
   * Additional class name
   */
  className?: string;
}

export const AppCardSelector = ({
  item,
  showPath = true,
  showPublicId = false,
  className,
}: AppCardSelectorProps) => {
  return (
    <div className={cn("flex w-full items-center gap-2 text-sm", className)}>
      <div className="w-[20px]">
        <AppTooltip
          text={`${item.title} / ${item.project_kanban_cycle?.title} / ${item.project_kanban_cycle_column?.title}`}
        >
          <Icon
            name={item.project_kanban_cycle_card_type?.icon}
            size={16}
            color={item.project_kanban_cycle_card_type?.color || "inherit"}
          />
        </AppTooltip>
      </div>

      <span className="mr-2 flex w-[calc(100%-20px)] flex-1 flex-col items-start gap-1">
        <p className="line-clamp-1 w-full flex-1 truncate text-left">
          {showPublicId && `[${item.public_id}] `}
          {item.title}
        </p>
        {showPath && (
          <span className="text-muted-foreground line-clamp-1 text-[10px]">
            {item.project_kanban_cycle?.title} / {item.project_kanban_cycle_column?.title}
          </span>
        )}
      </span>
    </div>
  );
};

AppCardSelector.displayName = "AppCardSelector";
