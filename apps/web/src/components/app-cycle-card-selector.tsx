import { project_kanban_cycle_card } from "@repo/types";
import { AppTooltip, Icon } from "@repo/ui-new";

import { cn } from "@repo/ui-new";

export interface IAppCardSelectorProps {
  item: project_kanban_cycle_card;
  showPath?: boolean;
  showPublicId?: boolean;
  className?: string;
}

export const AppCardSelector = ({
  item,
  showPath = true,
  showPublicId = false,
  className,
}: IAppCardSelectorProps) => {
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
