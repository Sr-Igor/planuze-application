import { memo } from "react";

import { ChevronDown, Loader2 } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Badge, inputClassName } from "@repo/ui";

import { cn } from "@/lib/utils";

import { IOption } from "../types";

interface SelectTriggerProps {
  placeholder?: string;
  value?: any;
  loading?: boolean;
  className?: string;
  showBadge?: boolean;
  badgeCount?: number;
  isDeleted: boolean;
  disabled?: boolean;
  selected?: IOption | null;
  customSelect?: (item?: any, fallbackValue?: string) => React.ReactNode;
}

export const SelectTrigger = memo(
  ({
    placeholder,
    value,
    loading = false,
    className,
    showBadge = false,
    badgeCount = 0,
    isDeleted,
    disabled,
    selected,
    customSelect,
  }: SelectTriggerProps) => {
    const t = useLang();

    const isArray = Array.isArray(value);
    const hasValue = isArray ? value.length > 0 : value;

    return (
      <div
        role="combobox"
        aria-expanded={false}
        data-disabled={disabled}
        aria-disabled={disabled ? "true" : undefined}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          inputClassName,
          !hasValue && "text-muted-foreground!",
          "items-center justify-between",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
      >
        {customSelect?.(selected?.item, value) || (
          <span className="flex flex-1 items-center justify-start gap-2 overflow-hidden">
            {showBadge && badgeCount > 0 && (
              <Badge
                variant="destructive"
                className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full p-0 text-[10px]"
              >
                {badgeCount > 9 ? "9+" : badgeCount}
              </Badge>
            )}
            <span className={cn("line-clamp-1 truncate", isDeleted && "text-red-500")}>
              {value
                ? isArray && !!value?.length
                  ? value?.length > 1
                    ? t.helper("selected_items")
                    : t.helper("selected_item")
                  : isArray && !value?.length
                    ? placeholder
                    : value || placeholder
                : placeholder}
            </span>
          </span>
        )}

        {!disabled && (
          <>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ChevronDown className="text-muted-foreground size-4" />
            )}
          </>
        )}
      </div>
    );
  }
);
