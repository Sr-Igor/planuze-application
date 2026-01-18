import { Clock10, History, Pen, Trash } from "lucide-react";

import { project_allocation } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import {
  Button,
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
 cn } from "@repo/ui";

import { Permission } from "@/components/ui/permission";

import { useKanbanShow } from "../../../context";

export interface ICardProps {
  card: project_allocation;
  loading: boolean;
}
export const Card = ({ card, loading }: ICardProps) => {
  const lang = useLang();
  const { dates } = useIntlFormat();
  const { state } = useKanbanShow();
  return (
    <CardComponent className="relative overflow-hidden border-2 p-0">
      {loading && <Skeleton className="absolute top-0 left-0 h-full w-full" />}
      <CardContent
        className={cn(
          "bg-sidebar-accent flex flex-col justify-between p-4",
          "transition-all duration-300 ease-in-out",
          loading && "opacity-0"
        )}
      >
        <CardHeader className="mb-2 p-0">
          <CardTitle className="flex items-center gap-2">
            <Clock10 className="size-4" />
            {card.profile?.user?.name}
          </CardTitle>
        </CardHeader>
        <div className="flex justify-between gap-2">
          <div>
            <CardDescription className="text-xs">
              <span className="capitalize">{lang.property("version")}:</span>
              {card.project_version?.version}
              <br />
              <span className="capitalize">{lang.property("start_date")}:</span>{" "}
              {card.start_date ? dates.formatDate(card.start_date) : "-"}
              <br />
              <span className="capitalize">{lang.property("end_date")}:</span>{" "}
              {card.end_date ? dates.formatDate(card.end_date) : "-"}
            </CardDescription>
          </div>
          <CardFooter className="flex gap-1 p-0">
            <Permission permission={["index"]} feature="project_allocation">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => state.logs.open({ item: card, type: "globalAllocation" })}
              >
                <History />
              </Button>
            </Permission>
            <Permission permission={["update"]} feature="project_allocation">
              <Button
                variant="outline"
                size="icon"
                onClick={() => state.globalAllocation.form(card)}
              >
                <Pen />
              </Button>
            </Permission>
            <Permission permission={["destroy"]} feature="project_allocation">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => state.globalAllocation.delete(card)}
              >
                <Trash />
              </Button>
            </Permission>
          </CardFooter>
        </div>
      </CardContent>
    </CardComponent>
  );
};
