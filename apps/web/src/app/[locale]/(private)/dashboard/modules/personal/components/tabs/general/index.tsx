"use client";

import * as React from "react";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { useLang } from "@repo/language/hooks";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@repo/ui";
import { MainCard } from "@repo/ui";

import { cn } from "@repo/ui";
import { formatCurrencySimple } from "@repo/utils/currency";

import { IFinancialEvolutionResponse, IFinancialInfo, IProfileInfo } from "../../../types";
import { CardItem } from "../../card";
import { Info } from "../../info";

export interface IGeneralProps {
  profile?: {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    userAvatar: string | null;
    level: string | null;
    companyName: string;
  };
  profileInfo?: IProfileInfo;
  financial?: IFinancialInfo;
  financialEvolution?: IFinancialEvolutionResponse;
  isLoading: boolean;
}

export const General = ({
  profile,
  profileInfo,
  financial,
  financialEvolution,
  isLoading,
}: IGeneralProps) => {
  const t = useLang();
  const page = t.page.dashboard;

  const formatDate = (date: string | Date | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getCurrency = (currency: string | null | undefined, fallback: string = "BRL") => {
    return currency || fallback;
  };

  const chartData =
    financialEvolution?.data?.map((point) => ({
      month: point.month,
      date: point.date,
      salary: point.totalSalary,
      bonuses: point.totalBonuses,
      compensation: point.totalCompensation,
    })) || [];

  const chartConfig: ChartConfig = {
    salary: {
      label: page("personal.general.evolution.salary"),
      color: "var(--chart-1)",
    },
    bonuses: {
      label: page("personal.general.evolution.bonuses"),
      color: "var(--chart-2)",
    },
    compensation: {
      label: page("personal.general.evolution.compensation"),
      color: "var(--chart-3)",
    },
  } satisfies ChartConfig;

  const timeInCompanyFormat = () => {
    const { years, months, days } = profileInfo?.timeInCompany || {};
    const parts: string[] = [];
    if (years) {
      parts.push(
        `${years} ${years === 1 ? page("personal.time.year") : page("personal.time.years")}`
      );
    }
    if (months) {
      parts.push(
        `${months} ${months === 1 ? page("personal.time.month") : page("personal.time.months")}`
      );
    }
    if (!!days && !!years) {
      parts.push(`${days} ${days === 1 ? page("personal.time.day") : page("personal.time.days")}`);
    }

    const formatted = parts.length > 0 ? parts.join(", ") : page("personal.time.less_than_1_day");
    return formatted;
  };

  return (
    <div className="space-y-6">
      {/* Profile Info Section */}
      {profile && profileInfo && (
        <MainCard
          title={page("personal.general.profile.title")}
          description={page("personal.general.profile.description")}
        >
          <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3")}>
            <CardItem
              className="col-span-1"
              icon="User"
              title={page("personal.general.profile.name")}
              value={profile.userName}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="Briefcase"
              title={page("personal.general.profile.level")}
              value={profile.level || "-"}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="Building"
              title={page("personal.general.profile.company")}
              value={profile.companyName}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="Calendar"
              title={page("personal.general.profile.company_entry_date")}
              value={formatDate(profileInfo.companyEntryDate)}
              isLoading={isLoading}
            />

            <CardItem
              className="col-span-1"
              icon="FileText"
              title={page("personal.general.profile.profile_created_at")}
              value={formatDate(profileInfo.profileCreatedAt)}
              isLoading={isLoading}
            />
            <CardItem
              className="col-span-1"
              icon="Clock"
              title={page("personal.general.profile.time_in_company")}
              value={timeInCompanyFormat() || "-"}
              isLoading={isLoading}
            />
          </div>
        </MainCard>
      )}

      {/* Financial Section */}
      {financial && (
        <>
          <MainCard
            title={page("personal.general.financial.title")}
            description={page("personal.general.financial.description")}
          >
            <div className={cn("space-y-6", isLoading && "opacity-0")}>
              {/* Valores Proporcionais */}
              <div>
                <h3 className="mb-4 text-sm font-semibold">
                  {page("personal.general.financial.proportional.title")}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <CardItem
                    className="col-span-1"
                    icon="DollarSign"
                    title={page("personal.general.financial.proportional.total_compensation")}
                    value={formatCurrencySimple(
                      financial.proportional.totalCompensation,
                      getCurrency(financial.currency)
                    )}
                    isLoading={isLoading}
                  />
                  <CardItem
                    className="col-span-1"
                    icon="Wallet"
                    title={page("personal.general.financial.proportional.base_salary")}
                    value={formatCurrencySimple(
                      financial.proportional.baseSalary,
                      getCurrency(financial.currency)
                    )}
                    isLoading={isLoading}
                  />
                  <CardItem
                    className="col-span-1"
                    icon="Gift"
                    title={page("personal.general.financial.proportional.total_bonuses")}
                    value={formatCurrencySimple(
                      financial.proportional.totalBonuses,
                      financial.currency
                    )}
                    isLoading={isLoading}
                  />
                </div>
              </div>

              {/* Valores Integrais */}
              <div>
                <h3 className="mb-4 text-sm font-semibold">
                  {page("personal.general.financial.integral.title")}
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <CardItem
                    className="col-span-1"
                    icon="DollarSign"
                    title={page("personal.general.financial.integral.total_compensation")}
                    value={formatCurrencySimple(
                      financial.integral.totalCompensation,
                      getCurrency(financial.currency)
                    )}
                    isLoading={isLoading}
                  />
                  <CardItem
                    className="col-span-1"
                    icon="Wallet"
                    title={page("personal.general.financial.integral.base_salary")}
                    value={formatCurrencySimple(
                      financial.integral.baseSalary,
                      getCurrency(financial.currency)
                    )}
                    isLoading={isLoading}
                  />
                  <CardItem
                    className="col-span-1"
                    icon="Gift"
                    title={page("personal.general.financial.integral.total_bonuses")}
                    value={formatCurrencySimple(
                      financial.integral.totalBonuses,
                      financial.currency
                    )}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </MainCard>

          <MainCard
            title={page("personal.general.financial.roles")}
            description={page("personal.general.financial.roles_description")}
            isEmpty={!financial.roles.length}
            isLoading={isLoading}
          >
            {/* Roles */}
            <div className={cn("space-y-3", isLoading && "opacity-0")}>
              {financial.roles.map((role) => (
                <div key={role.roleId} className="rounded-lg border p-3">
                  <div className="mb-3 grid grid-cols-2 gap-4">
                    <Info
                      title={page("personal.general.financial.role_name")}
                      value={role.roleName || "-"}
                    />
                    <Info
                      title={page("personal.general.financial.cost_center")}
                      value={role.costCenterName || "-"}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t pt-3">
                    <Info
                      title={page("personal.general.financial.salary_proportional")}
                      value={formatCurrencySimple(
                        role.salary_proportional,
                        getCurrency(role.currency, getCurrency(financial.currency))
                      )}
                    />
                    <Info
                      title={page("personal.general.financial.salary_integral")}
                      value={formatCurrencySimple(
                        role.salary_integral,
                        getCurrency(role.currency, getCurrency(financial.currency))
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MainCard>

          <MainCard
            title={page("personal.general.financial.bonuses")}
            description={page("personal.general.financial.bonuses_description")}
            isEmpty={!financial.bonuses.length}
            isLoading={isLoading}
          >
            {/* Bonuses */}
            <div className={cn("space-y-3", isLoading && "opacity-0")}>
              {financial.bonuses.map((bonus) => (
                <div key={bonus.bonusId} className="rounded-lg border p-3">
                  <div className="mb-3 grid grid-cols-2 gap-4">
                    <Info
                      title={page("personal.general.financial.bonus_name")}
                      value={bonus.bonusName || "-"}
                    />
                    <Info
                      title={page("personal.general.financial.cost_center")}
                      value={bonus.costCenterName || "-"}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t pt-3">
                    <Info
                      title={page("personal.general.financial.amount_proportional")}
                      value={formatCurrencySimple(
                        bonus.amount_proportional,
                        getCurrency(bonus.currency, getCurrency(financial.currency))
                      )}
                    />
                    <Info
                      title={page("personal.general.financial.amount_integral")}
                      value={formatCurrencySimple(
                        bonus.amount_integral,
                        getCurrency(bonus.currency, getCurrency(financial.currency))
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MainCard>
        </>
      )}

      <MainCard
        title={page("personal.general.evolution.title")}
        description={page("personal.general.evolution.description")}
        isLoading={isLoading}
        isEmpty={!chartData.length}
      >
        {!!chartData.length && (
          <div className={cn("space-y-6", isLoading && "opacity-0")}>
            <ChartContainer config={chartConfig} className="h-[400px] w-full">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                  bottom: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="salary"
                  type="monotone"
                  stroke="var(--color-salary)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="bonuses"
                  type="monotone"
                  stroke="var(--color-bonuses)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="compensation"
                  type="monotone"
                  stroke="var(--color-compensation)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </div>
        )}
      </MainCard>

      {financialEvolution && (
        <MainCard>
          {/* Evolution Stats */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            <Info
              title={page("personal.general.evolution.average_salary")}
              value={formatCurrencySimple(
                financialEvolution.averageSalary,
                financialEvolution.currency
              )}
            />
            <Info
              title={page("personal.general.evolution.average_bonuses")}
              value={formatCurrencySimple(
                financialEvolution.averageBonuses,
                financialEvolution.currency
              )}
            />
            <Info
              title={page("personal.general.evolution.average_compensation")}
              value={formatCurrencySimple(
                financialEvolution.averageCompensation,
                financialEvolution.currency
              )}
            />
            <Info
              title={page("personal.general.evolution.highest_compensation")}
              value={formatCurrencySimple(
                financialEvolution.highestCompensation,
                financialEvolution.currency
              )}
            />
            <Info
              title={page("personal.general.evolution.lowest_compensation")}
              value={formatCurrencySimple(
                financialEvolution.lowestCompensation,
                financialEvolution.currency
              )}
            />
            <Info
              title={page("personal.general.evolution.total_periods")}
              value={financialEvolution.totalPeriods}
            />
          </div>
        </MainCard>
      )}
    </div>
  );
};
