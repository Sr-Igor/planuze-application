"use client";

import { useCallback, useMemo } from "react";

import { CircleAlert, Loader2, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import {
  AppTooltip,
  Badge,
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "@repo/ui";

import { useKanbanShow } from "@/app/[locale]/(private)/project_kanban/show/[id]/context";
import { calcColumnTime } from "@/app/[locale]/(private)/project_kanban/show/[id]/utils/calc-column-time";
import { calcColumnTotal } from "@/app/[locale]/(private)/project_kanban/show/[id]/utils/calc-column-total";
import { Permission } from "@/components/permission";
import { useAccess } from "@/hooks/access";

import { KanbanColumnProps } from "../../types";

export const HeaderColumn = ({
  column,
  loading,
  dragListeners,
  visibleCards,
  view,
}: Pick<KanbanColumnProps, "column" | "loading" | "dragListeners" | "visibleCards"> & {
  view?: string;
}) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle");

  const t = useLang();
  const tKanban = t.page.kanban;

  const { state, general } = useKanbanShow();

  const usualColumn = useMemo(() => {
    if (!view) return column;

    return {
      ...column,
      project_kanban_cycle_cards: column.project_kanban_cycle_cards?.filter((card) => {
        const asPrincipal = card.project_kanban_cycle_card_type?.principal;
        return view === "principal" ? asPrincipal : !asPrincipal;
      }),
    };
  }, [view, column]);

  const isLoading = general.state.inLoading?.includes(usualColumn.id);

  const total = useMemo(
    () => calcColumnTotal(usualColumn, visibleCards),
    [usualColumn, visibleCards]
  );

  const time = useMemo(
    () => calcColumnTime(usualColumn, visibleCards),
    [usualColumn, visibleCards]
  );

  const totalTime = useMemo(() => {
    return time.hour || time.minute
      ? `${time.hour ? `${time.hour}${t.helper("timer.h")}` : ""} ${time.minute ? `${time.minute}${t.helper("timer.m")}` : ""}`
      : "";
  }, [time.hour, time.minute, t.helper]);

  const handleAddCard = useCallback(() => {
    state.card.store({ columnId: column.id });
  }, [state.card, column.id]);

  const handleEditColumn = useCallback(() => {
    state.column.form(column);
  }, [state.column, column]);

  const handleDeleteColumn = useCallback(() => {
    state.column.delete(column);
  }, [state.column, column]);

  return (
    <div
      className={cn(
        "bg-sidebar-accent flex h-[50px] items-center px-2",
        view && "w-80 min-w-80 flex-shrink-0",
        perm.many && dragListeners && "cursor-grab active:cursor-grabbing"
      )}
      {...(perm.many ? dragListeners : {})}
    >
      <div className="relative flex w-full items-center justify-between">
        {loading && <Skeleton className="absolute h-full w-full" />}
        <div
          className={cn(
            "flex items-center gap-2",
            "transition-opacity duration-300 ease-in-out",
            loading && "opacity-0"
          )}
        >
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: column.color || "#6b7280" }}
          />
          <AppTooltip text={column.title}>
            <h3 className="line-clamp-1 max-w-[200px] flex-1 text-sm font-semibold">
              {column.title}
            </h3>
          </AppTooltip>
          {column.description && (
            <AppTooltip text={column.description}>
              <CircleAlert className="text-muted-foreground h-4 w-4 cursor-pointer" />
            </AppTooltip>
          )}
        </div>

        <div
          className={cn(
            "flex items-center gap-1",
            "transition-opacity duration-300 ease-in-out",
            loading && "opacity-0"
          )}
        >
          {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
          <Badge variant="secondary" className="text-xs">
            {total}
            {totalTime && <span className="text-muted-foreground text-xs"> - {totalTime}</span>}
          </Badge>

          {!view && (
            <>
              <Permission permission={["store"]} feature="project_kanban_cycle_card">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={handleAddCard}>
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">{tKanban("component.column.add_card")}</span>
                </Button>
              </Permission>

              <Permission
                permission={["update", "destroy"]}
                method="any"
                feature="project_kanban_cycle"
              >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                      <span className="sr-only">{tKanban("component.column.column_options")}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Permission permission={["update"]} feature="project_kanban_cycle">
                      <DropdownMenuItem onClick={handleEditColumn}>
                        <Pencil />
                        {tKanban("component.column.edit_column")}
                      </DropdownMenuItem>
                    </Permission>

                    <Permission permission={["destroy"]} feature="project_kanban_cycle">
                      <DropdownMenuItem onClick={handleDeleteColumn} variant="destructive">
                        <Trash className="text-red-600" />
                        {tKanban("component.column.delete_column")}
                      </DropdownMenuItem>
                    </Permission>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Permission>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
