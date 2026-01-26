import { Users } from "lucide-react";

import { AppCard } from "@repo/ui";

import { PlanHeaderProps } from "../types";

export function PlanHeader({
  isLoading,
  title,
  description,
  children,
}: PlanHeaderProps & { children: React.ReactNode }) {
  return (
    <AppCard
      contentClassName="py-0 px-0"
      loading={isLoading}
      title={
        <div className="flex h-auto min-h-10 flex-col items-start justify-between gap-3 p-4 sm:h-10 sm:flex-row sm:items-center sm:gap-2 sm:p-0">
          <span className="flex items-center gap-2 text-sm sm:text-base">
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="font-medium">{title}</span>
          </span>
        </div>
      }
      description={
        <div className="text-muted-foreground px-4 pb-2 text-sm sm:px-0">{description}</div>
      }
      content={children}
    />
  );
}
