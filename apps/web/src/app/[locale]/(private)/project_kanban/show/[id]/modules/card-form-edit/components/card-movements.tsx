"use client";

import { useMemo } from "react";

import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

import { project_kanban_cycle_card } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";
import { Badge, Card, CardContent, CardHeader, CardTitle, Separator } from "@repo/ui";

import { useIntlFormat } from "@/hooks/intl-format";
import { timeLabel } from "@repo/utils/timeLabel";

interface CardMovementsProps {
  item?: project_kanban_cycle_card;
}

interface MovementData {
  id: string;
  fromColumn?: string;
  toColumn: string;
  fromColumnTitle?: string;
  toColumnTitle: string;
  movedAt: string;
  duration?: string;
  isCurrent: boolean;
}

export const CardMovements = ({ item }: CardMovementsProps) => {
  const lang = useLang();
  const t = lang.page.kanban;
  const { dates } = useIntlFormat();

  const movements = useMemo(() => {
    if (!item?.logs) return [];

    const columnChangeLogs = item.logs
      .filter((log) => {
        if (log.action !== "UPDATE" || !log.old || !log.new) return false;

        try {
          const oldData = typeof log.old === "string" ? JSON.parse(log.old) : log.old;
          const newData = typeof log.new === "string" ? JSON.parse(log.new) : log.new;

          return oldData.project_kanban_cycle_column_id !== newData.project_kanban_cycle_column_id;
        } catch (error) {
          return false;
        }
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const movementsData: MovementData[] = [];

    const creationLog = item.logs.find((log) => log.action === "CREATE");
    if (creationLog) {
      let initialColumnTitle = t("card-form-edit.movement.unknown_column");
      let initialCycleTitle = "";
      try {
        const creationData =
          typeof creationLog.new === "string" ? JSON.parse(creationLog.new) : creationLog.new;
        if (creationData.project_kanban_cycle_column?.title) {
          initialColumnTitle = creationData.project_kanban_cycle_column.title;
        }
        if (creationData.project_kanban_cycle?.title) {
          initialCycleTitle = creationData.project_kanban_cycle.title;
        }
      } catch (error) {
        console.warn("Erro ao extrair dados da coluna inicial do log:", error);
      }

      const displayTitle = initialCycleTitle
        ? `${initialColumnTitle} (${initialCycleTitle})`
        : initialColumnTitle;

      movementsData.push({
        id: "initial",
        toColumn: item.project_kanban_cycle_column_id,
        toColumnTitle: displayTitle,
        movedAt: item.createdAt,
        isCurrent: columnChangeLogs.length === 0,
      });
    }

    columnChangeLogs.forEach((log, index) => {
      try {
        const oldData = typeof log.old === "string" ? JSON.parse(log.old) : log.old;
        const newData = typeof log.new === "string" ? JSON.parse(log.new) : log.new;

        const fromColumnTitle =
          oldData.project_kanban_cycle_column?.title || t("card-form-edit.movement.unknown_column");
        const toColumnTitle =
          newData.project_kanban_cycle_column?.title || t("card-form-edit.movement.unknown_column");
        const fromCycleTitle = oldData.project_kanban_cycle?.title || "";
        const toCycleTitle = newData.project_kanban_cycle?.title || "";

        const fromDisplayTitle = fromCycleTitle
          ? `${fromColumnTitle} (${fromCycleTitle})`
          : fromColumnTitle;
        const toDisplayTitle = toCycleTitle ? `${toColumnTitle} (${toCycleTitle})` : toColumnTitle;

        const isCurrent = false;

        let duration: string | undefined;
        if (movementsData.length > 0) {
          const previousMovement = movementsData[movementsData.length - 1];
          const startTime = new Date(previousMovement.movedAt);
          const endTime = new Date(log.createdAt);

          const days = differenceInDays(endTime, startTime);
          const hours = differenceInHours(endTime, startTime) % 24;
          const minutes = differenceInMinutes(endTime, startTime) % 60;

          if (days > 0) {
            duration = `${days}${t("card-form-edit.movement.d")} ${hours}${t("card-form-edit.movement.h")} ${minutes}${t("card-form-edit.movement.m")}`;
          } else if (hours > 0) {
            duration = `${hours}${t("card-form-edit.movement.h")} ${minutes}${t("card-form-edit.movement.m")}`;
          } else if (minutes > 0) {
            duration = `${minutes}${t("card-form-edit.movement.m")}`;
          } else {
            duration = t("card-form-edit.movement.less_than_1_minute");
          }
        }

        movementsData.push({
          id: log.id,
          fromColumn: oldData.project_kanban_cycle_column_id,
          toColumn: newData.project_kanban_cycle_column_id,
          fromColumnTitle: fromDisplayTitle,
          toColumnTitle: toDisplayTitle,
          movedAt: log.createdAt,
          duration,
          isCurrent,
        });
      } catch (error) {
        console.warn("Erro ao processar movimento:", error);
      }
    });

    const sortedMovements = movementsData.sort(
      (a, b) => new Date(b.movedAt).getTime() - new Date(a.movedAt).getTime()
    );

    if (sortedMovements.length > 0) {
      const firstMovement = sortedMovements[0];
      if (firstMovement.id !== "initial") {
        firstMovement.isCurrent = true;
      }
    }

    return sortedMovements;
  }, [item?.logs, item?.project_kanban_cycle_column_id, item?.createdAt]);

  if (!movements.length) {
    return (
      <div className="text-muted-foreground flex items-center justify-center p-8">
        <p>{t("card-form-edit.movement.empty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-[30px]">
      {movements.map((movement, index) => (
        <Card key={movement.id} className={movement.isCurrent ? "border-primary" : ""}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {movement.fromColumn
                  ? `${t("card-form-edit.movement.from")}: ${movement.fromColumnTitle} → ${t("card-form-edit.movement.to")}: ${movement.toColumnTitle}`
                  : `${t("card-form-edit.movement.created_in")}: ${movement.toColumnTitle}`}
              </CardTitle>
              {movement.isCurrent && (
                <Badge variant="default" className="text-xs">
                  {t("card-form-edit.movement.current")}
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>{t("card-form-edit.movement.movement_date")}:</span>
                <span>{dates.format(movement.movedAt)}</span>
              </div>

              {movement.duration && (
                <div className="text-muted-foreground flex items-center justify-between text-sm">
                  <span>{t("card-form-edit.movement.previous_column_duration")}:</span>
                  <span className="font-medium">{movement.duration}</span>
                </div>
              )}

              <div className="text-muted-foreground flex items-center justify-between text-sm">
                <span>{t("card-form-edit.movement.total_duration_since_creation")}:</span>
                <span className="font-medium">
                  {timeLabel({
                    date: movement.movedAt,
                    t: {
                      calendar: (key: string) => {
                        const translations: Record<string, string> = {
                          year: t("card-form-edit.movement.year"),
                          years: t("card-form-edit.movement.years"),
                          month: t("card-form-edit.movement.month"),
                          months: t("card-form-edit.movement.months"),
                          day: t("card-form-edit.movement.day"),
                          days: t("card-form-edit.movement.days"),
                          and: t("card-form-edit.movement.and"),
                          lessThanOneDay: t("card-form-edit.movement.less_than_one_day"),
                        };
                        return translations[key] || key;
                      },
                    },
                  })}
                </span>
              </div>
            </div>

            {index < movements.length - 1 && <Separator className="mt-3" />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
