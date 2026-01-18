/**
 * Chart Component Types
 *
 * @module presentation/primitives/chart/types
 */

import { ComponentProps, ComponentType, CSSProperties, ReactNode } from "react";
import * as RechartsPrimitive from "recharts";

/**
 * Theme configuration for charts.
 */
export const CHART_THEMES = { light: "", dark: ".dark" } as const;

/**
 * Chart configuration for data series.
 */
export type ChartConfig = {
  [k in string]: {
    label?: ReactNode;
    icon?: ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof CHART_THEMES, string> }
  );
};

/**
 * Chart context props.
 */
export type ChartContextProps = {
  config: ChartConfig;
};

/**
 * Chart container props.
 */
export type ChartContainerProps = ComponentProps<"div"> & {
  config: ChartConfig;
  children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
};

/**
 * Chart style props.
 */
export type ChartStyleProps = {
  id: string;
  config: ChartConfig;
};

/**
 * Chart tooltip content props.
 */
export type ChartTooltipContentProps = ComponentProps<typeof RechartsPrimitive.Tooltip> &
  ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  };

/**
 * Chart legend content props.
 */
export type ChartLegendContentProps = ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  };

/**
 * Indicator style props.
 */
export type IndicatorStyleProps = {
  "--color-bg": string;
  "--color-border": string;
} & CSSProperties;
