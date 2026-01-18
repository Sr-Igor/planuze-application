"use client";

import { Icon, type IconName } from "../icon";
import { AppTooltip } from "../app-tooltip";

import { cn } from "../../../shared/utils";

export interface CardSelectorItem {
  /**
   * Unique identifier
   */
  id?: string;
  /**
   * Public ID to display
   */
  public_id?: string | number;
  /**
   * Title of the item
   */
  title: string;
  /**
   * Icon name (Lucide icon name)
   */
  icon?: IconName;
  /**
   * Icon color
   */
  iconColor?: string;
  /**
   * Path segments for breadcrumb display
   */
  path?: string[];
  /**
   * Tooltip text (defaults to path joined)
   */
  tooltip?: string;
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
  /**
   * Icon size
   */
  iconSize?: number;
}

export const AppCardSelector = ({
  item,
  showPath = true,
  showPublicId = false,
  className,
  iconSize = 16,
}: AppCardSelectorProps) => {
  const pathText = item.path?.join(" / ") || "";
  const tooltipText = item.tooltip || `${item.title}${pathText ? ` / ${pathText}` : ""}`;

  return (
    <div className={cn("flex w-full items-center gap-2 text-sm", className)}>
      <div className="w-[20px]">
        <AppTooltip text={tooltipText}>
          <Icon
            name={item.icon || "CircleHelp"}
            size={iconSize}
            color={item.iconColor || "inherit"}
          />
        </AppTooltip>
      </div>

      <span className="mr-2 flex w-[calc(100%-20px)] flex-1 flex-col items-start gap-1">
        <p className="line-clamp-1 w-full flex-1 truncate text-left">
          {showPublicId && item.public_id && `[${item.public_id}] `}
          {item.title}
        </p>
        {showPath && pathText && (
          <span className="text-muted-foreground line-clamp-1 text-[10px]">
            {pathText}
          </span>
        )}
      </span>
    </div>
  );
};

AppCardSelector.displayName = "AppCardSelector";
