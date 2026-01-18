"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";

import { useLang } from "@repo/language/hooks";
import { ChartConfig, ChartContainer } from "@repo/ui-new";
import { AppTooltip } from "@repo/ui-new";

import { ICardsByPriority } from "@repo/api/web/callers/project_kanban_report/types";

import { Container } from "../container";

export interface iPriorityProps {
  data: ICardsByPriority[];
  config: ChartConfig;
  isLoading: boolean;
}

export const Priority = ({ data, config, isLoading }: iPriorityProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  const CustomTick = ({ x, y, payload }: any) => {
    const text = payload?.value || "";
    const isLong = text.length > 20;
    const displayText = isLong ? `${text.substring(0, 17)}...` : text;

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
      title={t("report.graphs.priority.title")}
      description={t("report.graphs.priority.description")}
      isLoading={isLoading}
      isEmpty={data.length === 0}
    >
      <ChartContainer config={config}>
        <AreaChart
          accessibilityLayer
          data={data.map((item) => ({
            priority: `${t("report.priority")} ${item.priority}`,
            count: item.count,
          }))}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="priority"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={<CustomTick />}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background rounded-lg border p-3 shadow-lg">
                    <p className="font-medium">{payload[0].payload.priority}</p>
                    <p className="text-sm">
                      {config.count.label}: {payload[0].value}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area dataKey="count" fill="var(--chart-1)" fillOpacity={0.4} stroke="var(--chart-1)" />
        </AreaChart>
      </ChartContainer>
    </Container>
  );
};
