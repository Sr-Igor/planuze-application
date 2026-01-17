"use client";

import * as React from "react";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts";

import { useLang } from "@repo/language/hook";
import { ChartConfig, ChartContainer } from "@repo/ui";
import { AppTooltip } from "@repo/ui/app";

import { ICardsByWorkType } from "@repo/api/web/callers/project_kanban_report/types";

import { Container } from "../container";

export interface iWorkTypeProps {
  data: ICardsByWorkType[];
  config: ChartConfig;
  isLoading: boolean;
}

export const WorkType = ({ data, config, isLoading }: iWorkTypeProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const CustomTick = ({ x, y, payload }: any) => {
    const text = payload?.value || "";
    const isLong = text.length > 15;
    const displayText = isLong ? `${text.substring(0, 12)}...` : text;

    return (
      <AppTooltip text={isLong ? text : ""}>
        <text x={x} y={y} dy={16} textAnchor="middle" fill="currentColor" className="text-sm">
          {displayText}
        </text>
      </AppTooltip>
    );
  };

  return (
    <Container
      title={t("report.graphs.work_type.title")}
      description={t("report.graphs.work_type.description")}
      isLoading={isLoading}
      isEmpty={data.length === 0}
    >
      <ChartContainer config={config}>
        <BarChart
          accessibilityLayer
          data={data?.map((item) => ({
            ...item,
            workType: item.workType === "no_work_type" ? t("report.no_work_type") : item.workType,
          }))}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="workType"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tick={<CustomTick />}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background rounded-lg border p-3 shadow-lg">
                    <p className="font-medium">
                      {payload[0].payload.workType === "no_work_type"
                        ? t("report.no_work_type")
                        : payload[0].payload.workType}
                    </p>
                    <p className="text-sm">
                      {config.count.label}: {payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="var(--chart-2)" radius={8} />
        </BarChart>
      </ChartContainer>
    </Container>
  );
};
