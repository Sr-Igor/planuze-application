import { icons } from "lucide-react";

import { Input as InputComponent } from "@repo/ui";
import { Icon } from "@repo/ui/app";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: keyof typeof icons;
  iconClassName?: string;
  rootClassName?: string;
}

export const Input = ({ icon, iconClassName, rootClassName, ...props }: InputProps) => {
  return (
    <span className={cn("relative flex w-full items-center gap-2", rootClassName)}>
      <span className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2">
        {icon && (
          <Icon
            name={icon}
            className={cn(
              "text-muted-foreground pointer-events-none h-4 w-4",
              iconClassName,
              props.disabled && "text-muted-foreground opacity-50"
            )}
          />
        )}
      </span>
      <InputComponent {...props} className={cn(icon && "pl-8", props.className)} />
    </span>
  );
};
