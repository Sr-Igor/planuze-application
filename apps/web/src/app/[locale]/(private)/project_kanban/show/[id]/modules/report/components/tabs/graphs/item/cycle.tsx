"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";

import { ICycleStats } from "@repo/api/types";
import { useLang } from "@repo/language/hooks";
import { AppTooltip, ChartConfig, ChartContainer } from "@repo/ui";

import { Container } from "../container";

export interface iCycleProps {
  data: ICycleStats[];
  config: ChartConfig;
  isLoading: boolean;
}

export const Cycle = ({ data, config, isLoading }: iCycleProps) => {
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
      title={t("report.graphs.cycle.title")}
      description={t("report.graphs.cycle.description")}
      isLoading={isLoading}
      isEmpty={data.length === 0}
    >
      <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="cycleTitle"
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
                    <p className="font-medium">{payload[0].payload.cycleTitle}</p>
                    <p className="text-sm">
                      {t("report.graphs.cycle.conclusion_rate")}: {payload[0].value}%
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            dataKey="completionRate"
            type="natural"
            fill="var(--chart-1)"
            fillOpacity={0.4}
            stroke="var(--chart-1)"
          />
        </AreaChart>
      </ChartContainer>
    </Container>
  );
};
