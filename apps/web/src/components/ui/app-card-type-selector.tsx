import { project_kanban_cycle_card_type } from "@repo/api/generator/types";
import { Icon } from "@repo/ui/app";

import { cn } from "@/lib/utils";

export interface IAppCardTypeSelectorProps {
  item: project_kanban_cycle_card_type;
  className?: string;
  textClassName?: string;
}

export const AppCardTypeSelector = ({
  item,
  className,
  textClassName = "line-clamp-1 truncate ",
}: IAppCardTypeSelectorProps) => {
  return (
    <div className={cn("flex w-full flex-1 items-center gap-2 text-sm", className)}>
      <Icon name={item?.icon} size={16} color={item?.color || "inherit"} />
      <p className={cn("flex-1 text-left", textClassName)}>{item?.title}</p>
    </div>
  );
};
