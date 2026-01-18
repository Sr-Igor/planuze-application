import { Card, CardDescription, CardHeader, CardTitle , Skeleton } from "@repo/ui-new";
import { Icon } from "@repo/ui-new";

import { cn } from "@repo/ui-new";

export interface iCardItemProps {
  icon?: string;
  iconClassName?: string;
  title: string;
  value: string | number;
  percentage?: number;
  label?: string;
  isLoading?: boolean;
}

export const CardItem = ({
  icon,
  iconClassName,
  title,
  value,
  percentage,
  label,
  isLoading,
}: iCardItemProps) => {
  return (
    <Card>
      <CardHeader className={cn("relative", isLoading && "pointer-events-none")}>
        {isLoading && (
          <Skeleton className="absolute inset-0 mx-4 h-full w-[calc(100%-2rem)] rounded-lg" />
        )}
        <span className={cn("p-2", isLoading && "opacity-0")}>
          <CardDescription className="flex items-center gap-2">
            {icon && <Icon name={icon} className={cn("h-4 w-4", iconClassName)} />}
            {title}
          </CardDescription>
          <CardTitle className="text-3xl">
            {value}{" "}
            {label && <span className="text-muted-foreground text-sm font-normal">{label}</span>}
            {!!percentage && (
              <span className="text-muted-foreground text-sm font-normal">
                {" "}
                ({percentage?.toFixed(1)}%)
              </span>
            )}
          </CardTitle>
        </span>
      </CardHeader>
    </Card>
  );
};
