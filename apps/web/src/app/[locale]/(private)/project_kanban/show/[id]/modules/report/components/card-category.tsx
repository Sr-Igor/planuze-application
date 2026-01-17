import { PackageOpen } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Skeleton } from "@repo/ui";
import { Icon } from "@repo/ui/app";

import { ICardsTotalByType } from "@repo/api/web/callers/project_kanban_report/types";
import { cn } from "@/lib/utils";

export interface iCardCategoryProps {
  cardsTotalByType: ICardsTotalByType[];
  totalCards: number;
  isLoading: boolean;
  isEmpty: boolean;
}
export const CardCategory = ({
  cardsTotalByType,
  totalCards,
  isLoading,
  isEmpty,
}: iCardCategoryProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("report.card-category.title")}</CardTitle>
        <CardDescription>{t("report.card-category.description")}</CardDescription>
      </CardHeader>
      <CardContent className="relative min-h-[130px]">
        {isLoading && (
          <Skeleton className="absolute inset-0 mx-4 h-full w-[calc(100%-2rem)] rounded-lg" />
        )}

        {isEmpty && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <PackageOpen className="text-muted-foreground h-10 w-10" />
            <p className="text-muted-foreground text-md font-semibold">{t("report.empty")}</p>
          </div>
        )}

        <div
          className={cn(
            "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
            isLoading && "opacity-0"
          )}
        >
          {cardsTotalByType.map((item: ICardsTotalByType, index: number) => {
            const percentage =
              totalCards > 0 ? ((item.total / totalCards) * 100).toFixed(1) : "0.0";

            return (
              <div
                key={index}
                className="rounded-lg border p-4"
                style={{ borderLeftColor: item.color!, borderLeftWidth: "4px" }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <Icon name={item.icon} className="h-5 w-5" style={{ color: item.color! }} />
                  <span className="font-medium">{item.type}</span>
                </div>
                <div className="text-2xl font-bold">
                  {item.total}
                  <span className="text-muted-foreground ml-2 text-sm font-normal">
                    ({percentage}%)
                  </span>
                </div>
                <div className="mt-2">
                  <span
                    className="rounded px-2 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: item.color ? `${item.color}20` : undefined,
                      color: item.color!,
                    }}
                  >
                    {t(`report.card-category.types.${item.description}`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
