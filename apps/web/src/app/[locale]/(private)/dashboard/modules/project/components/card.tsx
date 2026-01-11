import { Card, CardDescription, CardHeader, CardTitle, Skeleton } from "@repo/ui";
import { Icon } from "@repo/ui/app";

import { cn } from "@/lib/utils";

export interface ICardItemProps {
  isLoading: boolean;
  icon: string;
  title: string;
  value: string | number;
  className?: string;
  iconClassName?: string;
}

export const CardItem = ({
  isLoading,
  icon,
  title,
  value,
  className,
  iconClassName,
}: ICardItemProps) => {
  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader className={cn("relative", isLoading && "pointer-events-none")}>
        {isLoading && (
          <Skeleton className="absolute inset-0 mx-4 h-full w-[calc(100%-2rem)] rounded-lg" />
        )}
        <CardDescription className={cn(isLoading && "opacity-0")}>
          <div className="flex items-center gap-2">
            <Icon name={icon} className={cn("h-4 w-4", iconClassName)} />
            {title}
          </div>
        </CardDescription>
        <CardTitle className={cn("text-2xl", isLoading && "opacity-0")}>{value}</CardTitle>
      </CardHeader>
    </Card>
  );
};
