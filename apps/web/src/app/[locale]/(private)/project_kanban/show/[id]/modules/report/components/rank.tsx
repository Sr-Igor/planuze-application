import { Fragment } from "react";

import { PackageOpen } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from "@repo/ui";

import { cn } from "@/lib/utils";

export interface IRankProps<T> {
  title: string;
  description: string;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  isLoading: boolean;
  isEmpty: boolean;
}

export const Rank = <T,>({
  title,
  description,
  data,
  renderItem,
  isEmpty,
  isLoading,
}: IRankProps<T>) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative min-h-[300px]">
        {isLoading && (
          <Skeleton className="absolute inset-0 mx-4 h-full w-[calc(100%-2rem)] rounded-lg" />
        )}

        {isEmpty && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <PackageOpen className="text-muted-foreground h-10 w-10" />
            <p className="text-muted-foreground text-md font-semibold">{t("report.empty")}</p>
          </div>
        )}

        <div className={cn("space-y-4", isLoading && "opacity-0")}>
          {data.map((item, index: number) => (
            <Fragment key={index}>{renderItem(item, index)}</Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
