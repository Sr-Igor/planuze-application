"use client";

import * as React from "react";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis } from "recharts";

import { useLang } from "@repo/language/hook";
import { ChartConfig, ChartContainer } from "@repo/ui";

import { ITimeAnalysis } from "@repo/api/web/callers/project_kanban_report/types";

import { Container } from "../container";

export interface iTimelineProps {
  data: ITimeAnalysis["completedCardsTimeline"];
  config: ChartConfig;
  isLoading: boolean;
}

export const Timeline = ({ data, config, isLoading }: iTimelineProps) => {
  const lang = useLang();
  const t = lang.page.kanban;

  return (
    <Container
      title={t("report.graphs.timeline.title")}
      description={t("report.graphs.timeline.description")}
      isLoading={isLoading}
      isEmpty={data.length === 0}
    >
      <ChartContainer config={config} className="aspect-auto h-[300px] w-full">
        <LineChart
          accessibilityLayer
          data={data.map((item, index) => ({
            name: `Card #${item.publicId}`,
            leadTime: item.leadTime,
            index,
          }))}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background rounded-lg border p-3 shadow-lg">
                    <p className="font-medium">{payload[0].payload.name}</p>
                    <p className="text-sm">
                      {t("report.graphs.timeline.lead_time")}: {payload[0].value}{" "}
                      {t("report.graphs.timeline.days")}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            dataKey="leadTime"
            type="natural"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </Container>
  );
};
