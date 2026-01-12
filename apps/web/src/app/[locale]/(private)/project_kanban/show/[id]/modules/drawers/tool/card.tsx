import { useLocale } from "next-intl";

import { History, Pen, Ruler, Trash } from "lucide-react";

import { project_tool } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import {
  Button,
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@repo/ui";

import { Permission } from "@/components/ui/permission";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@repo/utils/currency";

import { useKanbanShow } from "../../../context";

export interface ICardProps {
  item: project_tool;
  loading: boolean;
}

export const Card = ({ item, loading }: ICardProps) => {
  const t = useLang();
  const locale = useLocale();

  const { state } = useKanbanShow();

  return (
    <CardComponent className="relative overflow-hidden border-2 p-0">
      {loading && <Skeleton className="absolute top-0 left-0 h-full w-full" />}
      <CardContent
        className={cn(
          "flex justify-between p-4",
          "transition-all duration-300 ease-in-out",
          loading && "opacity-0"
        )}
      >
        <CardHeader className="flex flex-col items-start justify-between p-0">
          <CardTitle className="flex items-center gap-2">
            <Ruler className="size-4" />
            {item.title}
          </CardTitle>
          <CardDescription className="m-0 p-0 text-sm">
            {formatCurrency(item?.value || 0, item?.currency, locale)}
          </CardDescription>
          <CardDescription className="m-0 p-0 text-sm">{t.helper(item?.type)}</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-1 p-0">
          <Permission permission={["index"]} feature="project_tool">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => state.logs.open({ item: item, type: "tool" })}
            >
              <History />
            </Button>
          </Permission>
          <Permission permission={["update"]} feature="project_tool">
            <Button variant="outline" size="icon" onClick={() => state.tool.form(item)}>
              <Pen />
            </Button>
          </Permission>
          <Permission permission={["destroy"]} feature="project_tool">
            <Button variant="destructive" size="icon" onClick={() => state.tool.delete(item)}>
              <Trash />
            </Button>
          </Permission>
        </CardFooter>
      </CardContent>
    </CardComponent>
  );
};
