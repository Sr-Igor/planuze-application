import { Info } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { AppTooltip } from "@repo/ui/app";

import { cn } from "@/lib/utils";

export interface iContainerProps {
  children: React.ReactNode;
  className?: string;
  name: string | number;
  label?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  skipHtmlFor?: boolean;
  tooltip?: string;
}

const Label = ({
  children,
  skipHtmlFor,
  ...rest
}: {
  children: React.ReactNode;
  skipHtmlFor?: boolean;
  htmlFor?: string;
  className: string;
  "data-testid": string;
}) => {
  if (skipHtmlFor) {
    return <div {...rest}>{children}</div>;
  }
  return <label {...rest}>{children}</label>;
};

export const Container = ({
  children,
  className,
  name,
  label,
  error,
  required,
  htmlFor,
  tooltip,
  skipHtmlFor,
}: iContainerProps) => {
  const t = useLang();

  const labelTitle = label ? t.property(label) : "";

  return (
    <>
      <Label
        htmlFor={htmlFor}
        skipHtmlFor={skipHtmlFor}
        className={cn("relative flex flex-col gap-1 pb-2 text-sm text-gray-700", className)}
        data-testid={`input-controller-${name.toString()}`}
      >
        {label && (
          <span className="light:text-gray-500 flex items-center text-xs font-semibold dark:text-gray-400">
            <span className="first-letter:uppercase">{labelTitle}</span>
            {required && <span className="ml-1 text-red-500">*</span>}
            {tooltip && (
              <AppTooltip text={tooltip} className="ml-1">
                <Info className="h-4 w-4" strokeWidth={2.5} />
              </AppTooltip>
            )}
          </span>
        )}
        {children}

        <AppTooltip
          text={error}
          contentClassName="bg-destructive text-white m-0"
          side="bottom"
          align="start"
        >
          <p
            className={cn(
              "absolute bottom-[-12px] left-0 mt-1 h-[16px] text-xs text-red-500",
              "transition-opacity duration-300",
              "line-clamp-1 max-w-full truncate overflow-hidden",
              error ? "z-[1] opacity-100" : "z-[-1] opacity-0"
            )}
          >
            {error}
          </p>
        </AppTooltip>
      </Label>
    </>
  );
};
