"use client";

import { useState } from "react";

import { ScrollArea } from "@repo/ui";

import { placeholder } from "@/api/callers/dashboard/placeholder/project";
import { useIntlFormat } from "@/hooks/intl-format";

import { Filters } from "./components/filters";
import { Header } from "./components/header";
import { Metadata } from "./components/metadata";
import { TabList } from "./components/tab-list";
import { Analyses } from "./components/tabs/analyses";
import { Cost } from "./components/tabs/costs";
import { Projects } from "./components/tabs/project";
import { Summary } from "./components/tabs/summary";
import { IIndexProps } from "./types";

export default function ({
  filters,
  setFilters,
  resetFilters,
  handleExport,
  data = placeholder,
  isLoading,
  isExporting,
}: IIndexProps) {
  const activeTab = filters.project_tab || "summary";
  const [openFilters, setOpenFilters] = useState(false);

  const { money } = useIntlFormat();

  const countFilters = Object.keys(filters)?.filter(
    (key) => key !== "project_tab" && key !== "convert_currency"
  )?.length;

  const currencyToUse =
    filters.convert_currency || data?.currencyMetadata?.targetCurrency || money.currency;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-background border-b p-4">
        <Header
          onExport={handleExport}
          isExporting={isExporting}
          onOpenFilters={() => setOpenFilters(true)}
          countFilters={countFilters}
          selectedCurrency={currencyToUse}
          onCurrencyChange={(convert_currency) => setFilters({ convert_currency })}
        />

        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          resetFilters={resetFilters}
          open={openFilters}
          onOpenChange={setOpenFilters}
        />

        <div className="mt-4">
          <TabList activeTab={activeTab} onTabChange={(tab) => setFilters({ project_tab: tab })} />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100%-268px)] flex-1">
        <div className="p-6">
          {activeTab === "summary" && (
            <Summary summary={data?.summary} isLoading={isLoading} currencyCode={currencyToUse} />
          )}
          {activeTab === "projects" && (
            <Projects
              projects={data?.projects || []}
              isLoading={isLoading}
              currencyCode={currencyToUse}
            />
          )}
          {activeTab === "costs" && (
            <Cost data={data?.costBreakdown} isLoading={isLoading} currencyCode={currencyToUse} />
          )}
          {activeTab === "analyses" && (
            <Analyses
              employeeCosts={data?.employeeCosts || []}
              costCenters={data?.costCenters || []}
              workTypes={data?.workTypes || []}
              timeline={data?.timeline || []}
              profitability={data?.profitability}
              isLoading={isLoading}
              currencyCode={currencyToUse}
            />
          )}

          {/* Metadata */}
          {!isLoading && data?.metadata && (
            <Metadata metadata={data.metadata} currencyMetadata={data?.currencyMetadata} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
