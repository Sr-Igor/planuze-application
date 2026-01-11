import { memo } from "react";

import { CheckIcon } from "lucide-react";

import * as C from "@repo/ui";
import { Checkbox } from "@repo/ui";

import { cn } from "@/lib/utils";

interface SelectItemProps {
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  onCheckedChange?: (checked: boolean) => void;
  children?: React.ReactNode;
  useCommandItem?: boolean;
  showCheckbox?: boolean;
  showCheckIcon?: boolean;
  className?: string;
}

export const SelectItem = memo(
  ({
    value,
    label,
    checked = false,
    disabled = false,
    onSelect,
    onCheckedChange,
    children,
    useCommandItem = false,
    showCheckbox = false,
    showCheckIcon = false,
    className = "",
  }: SelectItemProps) => {
    const itemContent = (
      <>
        {showCheckbox && (
          <Checkbox
            checked={checked}
            onCheckedChange={onCheckedChange}
            className="flex h-3 w-3 items-center justify-center p-2"
            disabled={disabled}
          />
        )}
        {children || <span className="flex-1 text-sm">{label}</span>}
        {showCheckIcon && (
          <CheckIcon className={cn("ml-auto", checked ? "opacity-100" : "opacity-0")} />
        )}
      </>
    );

    if (useCommandItem) {
      return (
        <C.CommandItem
          key={`${value}-${label}`}
          value={value}
          onSelect={onSelect}
          className={className}
        >
          {itemContent}
        </C.CommandItem>
      );
    }

    return (
      <div
        className={cn(
          "hover:bg-border/50 flex cursor-pointer items-center space-x-2 rounded p-2",
          disabled ? "cursor-not-allowed opacity-50" : "",
          className
        )}
        onClick={() => !disabled && onSelect?.()}
      >
        {itemContent}
      </div>
    );
  }
);
