import { useMemo } from "react";

import { Check, Loader, X } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { cn } from "@repo/ui";

import { AppTooltip } from "./app-tooltip";

export interface IStatusCircleProps {
  status: boolean | null;
  className?: string;
}

export const StatusCircle = ({ status, className }: IStatusCircleProps) => {
  const t = useLang();

  const tooltip = useMemo(() => {
    if (status === true) return t.helper("true");
    if (status === false) return t.helper("false");
    return t.helper("null");
  }, [status]);

  return (
    <AppTooltip text={tooltip}>
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full",
          className,
          status === true && "bg-green-500",
          status === false && "bg-red-500",
          status === null && "bg-gray-500"
        )}
      >
        {status === true && <Check className="h-[80%] w-[80%] text-white" strokeWidth={3} />}
        {status === false && <X className="h-[80%] w-[80%] text-white" strokeWidth={3} />}
        {status === null && <Loader className="h-[80%] w-[80%] text-white" strokeWidth={3} />}
      </div>
    </AppTooltip>
  );
};
