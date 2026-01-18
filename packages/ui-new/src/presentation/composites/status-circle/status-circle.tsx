/**
 * StatusCircle Component Module
 *
 * A status indicator circle component.
 *
 * @module presentation/composites/status-circle
 */

import { Check, Loader, X } from "lucide-react";
import { useMemo } from "react";

import { cn } from "../../../shared/utils";
import { AppTooltip } from "../app-tooltip";

export type StatusCircleProps = {
  /**
   * The status to display.
   * - true: Success (green)
   * - false: Error (red)
   * - null: Pending/Loading (gray)
   */
  status: boolean | null;
  /**
   * Additional class name.
   */
  className?: string;
  /**
   * Labels for the tooltip.
   */
  labels?: {
    true?: string;
    false?: string;
    null?: string;
  };
};

/**
 * StatusCircle component.
 *
 * Displays a colored circle with an icon based on status.
 *
 * @example
 * ```tsx
 * <StatusCircle status={true} />
 * <StatusCircle status={false} />
 * <StatusCircle status={null} />
 * ```
 */
function StatusCircle({ status, className, labels }: StatusCircleProps) {
  const tooltip = useMemo(() => {
    if (status === true) return labels?.true ?? "True";
    if (status === false) return labels?.false ?? "False";
    return labels?.null ?? "Pending";
  }, [status, labels]);

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
}

export { StatusCircle };
